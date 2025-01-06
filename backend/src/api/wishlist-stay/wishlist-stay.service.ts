import { StayModel } from "../../model/stay.ts";
import { wishlistStayModel } from "../../model/wishlist-stay.ts";
import { logger } from "../../service/logger.service.js";

export const wishlistStayService = {
  query,
  findOne,
  create,
  remove,
};

async function query(filterBy: any) {
  try {
    const filterCriteria = _buildFilterCriteria(filterBy);
    const foundWishlistStayIds = await wishlistStayModel
      .find(filterCriteria)
      .distinct("stayId");

    const foundWishlistStays = await StayModel.find({
      _id: { $in: foundWishlistStayIds },
    });

    return foundWishlistStays;
  } catch (err) {
    logger.error("cannot find wishlistStay", err);
    throw err;
  }
}

async function findOne(filterBy: any) {
  try {
    const filterCriteria = _buildFilterCriteria(filterBy);
    const foundWishlistStay = await wishlistStayModel.findOne(filterCriteria);
    return foundWishlistStay;
  } catch (err) {
    logger.error("cannot find wishlistStay", err);
    throw err;
  }
}

async function create(wishlistStay: any) {
  try {
    const createdWishlistStay = await wishlistStayModel.create(wishlistStay);
    return createdWishlistStay;
  } catch (err) {
    logger.error("cannot create wishlistStay", err);
    throw err;
  }
}

async function remove(filterBy: any) {
  try {
    const filterCriteria = _buildFilterCriteria(filterBy);
    const { deletedCount } = await wishlistStayModel.deleteOne(filterCriteria);
    return deletedCount;
  } catch (err) {
    logger.error("cannot delete wishlistStay", err);
    throw err;
  }
}

// =================== Private Functions ===================

function _buildFilterCriteria(filterBy: any) {
  let criteria: any = {};
  if (filterBy.orderId) criteria._id = filterBy.wishlistId;
  if (filterBy.userId) criteria.userId = filterBy.userId;
  if (filterBy.stayId) criteria.stayId = filterBy.stayId;
  return criteria;
}
