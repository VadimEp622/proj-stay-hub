import { httpService } from "./http.service";

const BASE_URL = "wishlist-stay";

export const wishlistStayService = {
  getStaysByUserId,
  updateWishlistStay,
};

function getStaysByUserId(userId: string): Promise<any> {
  return httpService.get(`${BASE_URL}/${userId}`);
}

function updateWishlistStay(userId: string, stayId: string): Promise<any> {
  return httpService.post(`${BASE_URL}/${userId}`, { stayId });
}
