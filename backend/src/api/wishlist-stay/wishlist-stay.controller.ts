import { isValidObjectId } from "mongoose";
import { logger } from "../../service/logger.service.js";
import { wishlistStayService } from "./wishlist-stay.service.ts";
import {
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../../types/custom-extend.types.ts";
import { BadRequestException } from "../../shared/exeptions/http.exceptions.ts";

export async function queryWishlistStays(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.loggedinUser._id;
    const filterBy = { userId };
    const wishlistStays = await wishlistStayService.query(filterBy);
    res.status(200).send(wishlistStays);
  } catch (err) {
    next(err);
  }
}

export async function toggleWishlistStay(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.loggedinUser?._id;
    if (!isValidObjectId(userId))
      throw new BadRequestException("Invalid loggedin userId");

    const { stayId } = req.body;
    const wishlistStay = { userId, stayId };
    const foundWishlistStay = await wishlistStayService.findOne(wishlistStay);
    logger.debug("foundWishlistStay", foundWishlistStay);

    if (!foundWishlistStay) {
      const createdWishlistStay = await wishlistStayService.create(
        wishlistStay
      );
      logger.debug("createdWishlistStay", createdWishlistStay);
      res.status(200).send({
        actionType: "create",
        msg: "Created wishlist stay successfully",
      });
    } else {
      const deletedCount = await wishlistStayService.remove(wishlistStay);
      logger.debug("deletedCount", deletedCount);
      res.status(200).send({
        actionType: "delete",
        msg: "Deleted wishlist stay successfully",
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function checkIsWishlistStayByStayId(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.loggedinUser._id;
    const { stayid: stayId } = req.params;

    const filterBy = { stayId, userId };
    const wishlistStay = await wishlistStayService.findOne(filterBy);

    if (!wishlistStay) res.send({ isWishlist: false });
    else res.status(200).send({ isWishlist: true });
  } catch (err) {
    next(err);
  }
}
