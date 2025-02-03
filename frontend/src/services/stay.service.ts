import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";

const BASE_URL = "stay";

export const stayService = {
  // =============== Checked and in use ===============
  query,
  getById,
  getWishlistedStayIds,
  getEmptyFilterBy,
  getStayCategoryScores,
  getStayScore,
  calculateHowManyNights,
  getDate,
  // ==================================================
};

interface ApiWishlistFilterBy {
  isalluntilpage: boolean;
}

interface ApiFilterBy {
  where: string;
  from: "" | number;
  to: "" | number;
  capacity: number;
  label: string;
  page: number;
}

interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface EmptyFilterBy {
  where: string;
  from: null;
  to: null;
  capacity: number;
  guests: Guests;
  label: string;
}

interface ReviewScore {
  cleanliness?: number;
  communication?: number;
  "check-in"?: number;
  accuracy?: number;
  location?: number;
  value?: number;
}

interface Review {
  at: string;
  by: any;
  txt: "string";
  reviewInputs: ReviewScore;
}

// =============== Checked and in use ===============
export function query(
  filterBy: ApiFilterBy
): Promise<{ stays: any; isFinalPage: boolean }> {
  return httpService.get(BASE_URL, filterBy);
}

function getById(stayId: string): Promise<any> {
  return httpService.get(`${BASE_URL}/${stayId}`);
}

function getWishlistedStayIds(
  filter: ApiFilterBy,
  wishlistfilter: ApiWishlistFilterBy
): Promise<any> {
  return httpService.get(`${BASE_URL}/wishlist`, {
    ...filter,
    ...wishlistfilter,
  });
}

function getEmptyFilterBy(): EmptyFilterBy {
  return {
    where: "",
    from: null,
    to: null,
    capacity: 0,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
    label: "All",
  };
}

// TODO: scores object may grow with unexpected keys - decide one of the following:
// -----------------------------------------------------
//  A) scores object has fixed keys, and if fetched keys don't match EXACTLY, ignore them
//      pros:
//          * less error potential
//          * simpler typescript
//      cons:
//          * scaling requires work on both client and server
// -----------------------------------------------------
//  B) scores object has potentially dynamic keys, with potential to grow infinitely
//      pros:
//          * scaling is easier - backend work only
//      cons:
//          * backend scores object errors/typos might affect frontend unexpectedly
//          * possibly complex typescript
// -----------------------------------------------------
function getStayCategoryScores(stayReviews: Review[]): ReviewScore {
  const scores = stayReviews.reduce((acc: any, review: Review) => {
    Object.entries(review.reviewInputs).forEach(
      ([input, value]: [any, any]) => {
        acc[input] = utilService.floatify(
          acc[input] ? acc[input] + value : value
        );
      }
    );
    return acc;
  }, {});
  Object.entries(scores).forEach(([input, value]: [any, any]) => {
    const inputAverage = utilService.floatify(value / stayReviews.length);
    scores[input] = parseFloat(inputAverage.toFixed(1));
  });
  return scores;
}

function getStayScore(stayReviews: Review[]): number {
  const scores = getStayCategoryScores(stayReviews);
  const stayScoresSum: number = Object.values(scores).reduce(
    (acc: number, value: number) => utilService.floatify((acc += value))
  );
  const stayScore = utilService.floatify(
    stayScoresSum / Object.values(scores).length
  );
  return parseFloat(stayScore.toFixed(2));
}

function calculateHowManyNights(
  checkInDate: number,
  checkOutDate: number
): number {
  const firstDate = new Date(checkInDate);
  const secondDate = new Date(checkOutDate);
  const timeDiff = secondDate.getTime() - firstDate.getTime();
  const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return nightsCount;
}

function getDate(dateToFormat: Date | ""): string {
  if (!dateToFormat) return "";
  const date = new Date(dateToFormat);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedDate = formatter.format(date);
  return formattedDate.replace(/^0(\d)/, "$1");
}
// ==================================================
