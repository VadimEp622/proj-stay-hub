import { logger } from "../service/logger.service.js";
import {
  IHTTPError,
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../types/custom-extend.types.ts";

export const errorHandler = (
  error: IHTTPError,
  _req: RequestCustom,
  res: ResponseCustom,
  _next: NextFunctionCustom
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong!";
  logger.error(error);
  res.status(statusCode).send({ statusCode, message });
};
