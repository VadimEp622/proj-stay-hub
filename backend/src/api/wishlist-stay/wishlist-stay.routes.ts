import express from "express";
import {
  checkIsWishlistStayByStayId,
  queryWishlistStays,
  toggleWishlistStay,
} from "./wishlist-stay.controller.ts";
import { requireAuth } from "../../middleware/requireAuth.middleware.js";
import {
  checkIsWishlistStayByStayIdValidator,
  queryWishlistStaysValidator,
} from "./wishlist-stay.validator.ts";

const router = express.Router();
router.use(requireAuth);

router.get("/", queryWishlistStaysValidator, queryWishlistStays);
router.get(
  "/:stayid",
  checkIsWishlistStayByStayIdValidator,
  checkIsWishlistStayByStayId
);
router.post("/", toggleWishlistStay);

export const wishlistStayRoutes = router;
