import express from "express";
import {
  checkIsWishlistStayByStayId,
  queryWishlistStays,
  toggleWishlistStay,
} from "./wishlist-stay.controller.ts";
import { requireAuth } from "../../middleware/requireAuth.middleware.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", queryWishlistStays);
router.get("/:stayid", checkIsWishlistStayByStayId);
router.post("/", toggleWishlistStay);

export const wishlistStayRoutes = router;
