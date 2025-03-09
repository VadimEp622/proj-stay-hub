import {
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../../types/custom-extend.types.ts";
import { userService } from "./user.service.js";

// ====================== Confirmed Being Used ======================
export async function getUser(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

export async function addUserTrip(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.params.id;
    const orderId = req.body.orderId;
    const updatedUser = await userService.addTrip(userId, orderId);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
}
// ==================================================================
// =================== Confirmed works but unused ===================
export async function deleteUser(
  req: RequestCustom,
  res: ResponseCustom,
  next: NextFunctionCustom
) {
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    res.send({ msg: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}
// ==================================================================
