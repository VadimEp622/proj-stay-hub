import { isValidObjectId } from "mongoose";
import {
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../../types/custom-extend.types.ts";
import { BadRequestException } from "../../shared/exeptions/http.exceptions.ts";

export function getUserValidator(
  req: RequestCustom,
  _res: ResponseCustom,
  next: NextFunctionCustom
) {
  if (!isValidObjectId(req.params?.id))
    throw new BadRequestException("Invalid userId");

  next();
}

export function addUserTripValidator(
  req: RequestCustom,
  _res: ResponseCustom,
  next: NextFunctionCustom
) {
  if (!isValidObjectId(req.params?.id))
    throw new BadRequestException("Invalid userId");
  if (!isValidObjectId(req.body?.orderId))
    throw new BadRequestException("Invalid orderId");

  next();
}
