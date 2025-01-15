import { httpService } from "./http.service";

const BASE_URL = "wishlist-stay";

export const wishlistStayService = {
  queryWishlistStays,
  toggleWishlistStay,
};

function queryWishlistStays(): Promise<any> {
  return httpService.get(`${BASE_URL}`);
}

function toggleWishlistStay(stayId: string): Promise<any> {
  return httpService.post(`${BASE_URL}`, { stayId });
}
