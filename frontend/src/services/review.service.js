import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove,
  getAverageReview,
  formatDateString
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

// function getAverageReview(stay) {
//   let count = 0
//   const totalRate = stay.reviews.reduce((acc, review) => {
//     acc += review.rate
//     count++
//     return acc
//   }, 0)
//   const averageRate = totalRate / count

//   const formattedRate = averageRate % 1 === 0 ? averageRate.toFixed(1) : averageRate.toFixed(2)

//   return formattedRate
// }

function getAverageReview(stay) {
  if (!stay.reviews || stay.reviews.length === 0) {
    return 0;
  }

  let totalRate = 0;
  let count = 0;

  stay.reviews.forEach((review) => {
    if (review.reviewInputs && typeof review.reviewInputs === "object") {
      Object.values(review.reviewInputs).forEach((rate) => {
        if (typeof rate === "number") {
          totalRate += rate;
          count++;
        }
      });
    }
  });

  const averageRate = totalRate / count;
  const formattedRate = averageRate % 1 === 0 ? Math.round(averageRate) : averageRate.toFixed(2);
  stay.reviews.rate = formattedRate;
  return formattedRate;
}

function formatDateString(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
