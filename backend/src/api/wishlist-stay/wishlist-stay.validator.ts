import { isValidObjectId } from "mongoose";
import {
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../../types/custom-extend.types.ts";
import { BadRequestException } from "../../shared/exeptions/http.exceptions.ts";

export function queryWishlistStaysValidator(
  req: RequestCustom,
  _res: ResponseCustom,
  next: NextFunctionCustom
) {
  if (!isValidObjectId(req.loggedinUser?._id))
    throw new BadRequestException("Invalid loggedin userId");

  next();
}

export function checkIsWishlistStayByStayIdValidator(
  req: RequestCustom,
  _res: ResponseCustom,
  next: NextFunctionCustom
) {
  if (!isValidObjectId(req.loggedinUser?._id))
    throw new BadRequestException("Invalid loggedin userId");

  if (!isValidObjectId(req.params?.stayid))
    throw new BadRequestException("Invalid stayId");

  next();
}
