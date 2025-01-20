import { httpService } from "./http.service";

const BASE_URL = "wishlist-stay";

export const wishlistStayService = {
  queryWishlistStays,
  checkIsWishlistStayByStayId,
  toggleWishlistStay,
};

function queryWishlistStays(): Promise<any> {
  return httpService.get(`${BASE_URL}`);
}

function checkIsWishlistStayByStayId(stayId: string): Promise<any> {
  return httpService.get(`${BASE_URL}/${stayId}`);
}

function toggleWishlistStay(stayId: string): Promise<any> {
  return httpService.post(`${BASE_URL}`, { stayId });
}
