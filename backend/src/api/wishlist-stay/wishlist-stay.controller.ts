import { Request, Response } from "express";
import { logger } from "../../service/logger.service.js";
import { wishlistStayService } from "./wishlist-stay.service.ts";

export async function queryWishlistStays(req: Request, res: Response) {
  try {
    const { stayid: stayId, userid: userId } = req.query;
    const filterBy = { stayId, userId };
    const wishlistStays = await wishlistStayService.query(filterBy);
    res.send(wishlistStays);
  } catch (err) {
    logger.error("Failed querying wishlist stays", err);
    res.status(400).send({ err: "Failed querying wishlist stays" });
  }
}

export async function toggleWishlistStay(req: Request, res: Response) {
  try {
    const { id: userId } = req.params;
    const { stayId } = req.body;
    const wishlistStay = { userId, stayId };
    const foundWishlistStay = await wishlistStayService.findOne(wishlistStay);
    logger.debug("foundWishlistStay", foundWishlistStay);

    if (!foundWishlistStay) {
      const createdWishlistStay = await wishlistStayService.create(
        wishlistStay
      );
      logger.debug("createdWishlistStay", createdWishlistStay);
      res.send({ msg: "Created wishlist stay successfully" });
    } else {
      const deletedCount = await wishlistStayService.remove(wishlistStay);
      logger.debug("deletedCount", deletedCount);
      res.send({ msg: "Deleted wishlist stay successfully" });
    }
  } catch (err) {
    logger.error("Failed toggling wishlist stay", err);
    res.status(400).send({ err: "Failed toggling wishlist stay" });
  }
}
