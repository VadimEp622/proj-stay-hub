import { Response } from "express";
import { logger } from "../../service/logger.service.js";
import { wishlistStayService } from "./wishlist-stay.service.ts";
import { RequestCustom } from "../../types/custom-extend.types.ts";

export async function queryWishlistStays(req: RequestCustom, res: Response) {
  try {
    const userId = req.loggedinUser?._id;
    if (!userId) throw new Error("logged in userId is not valid");

    const filterBy = { userId };
    const wishlistStays = await wishlistStayService.query(filterBy);
    res.send(wishlistStays);
  } catch (err) {
    logger.error("Failed querying wishlist stays", err);
    res.status(400).send({ err: "Failed querying wishlist stays" });
  }
}

export async function toggleWishlistStay(req: RequestCustom, res: Response) {
  try {
    const userId = req.loggedinUser?._id;
    if (!userId) throw new Error("logged in userId is not valid");

    const { stayId } = req.body;
    const wishlistStay = { userId, stayId };
    const foundWishlistStay = await wishlistStayService.findOne(wishlistStay);
    logger.debug("foundWishlistStay", foundWishlistStay);

    if (!foundWishlistStay) {
      const createdWishlistStay = await wishlistStayService.create(
        wishlistStay
      );
      logger.debug("createdWishlistStay", createdWishlistStay);
      res.send({
        actionType: "create",
        msg: "Created wishlist stay successfully",
      });
    } else {
      const deletedCount = await wishlistStayService.remove(wishlistStay);
      logger.debug("deletedCount", deletedCount);
      res.send({
        actionType: "delete",
        msg: "Deleted wishlist stay successfully",
      });
    }
  } catch (err) {
    logger.error("Failed toggling wishlist stay", err);
    res.status(400).send({ msg: "Failed toggling wishlist stay" });
  }
}

export async function checkIsWishlistStayByStayId(
  req: RequestCustom,
  res: Response
) {
  try {
    const userId = req.loggedinUser?._id;
    if (!userId || userId.length < 8)
      throw new Error("logged in userId is not valid");
    // TODO: improve userId verification

    const { stayid: stayId } = req.params;
    if (!stayId || stayId.length < 8) throw new Error("stayId is not valid");
    // TODO: improve stayId verification

    const filterBy = { stayId, userId };
    const wishlistStay = await wishlistStayService.findOne(filterBy);

    if (!wishlistStay) res.send({ isWishlist: false });
    else res.send({ isWishlist: true });
  } catch (err) {
    logger.error("Failed checking if stay is wishlisted", err);
    res.status(400).send({ msg: "Failed checking if stay is wishlisted" });
  }
}
