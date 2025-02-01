import { NextFunction, Response } from "express";
import { RequestCustom } from "../types/custom-extend.types.ts";
import { cacheUrl } from "../service/cache.service.ts";
import { logger } from "../service/logger.service.js";

export function cache(req: RequestCustom, res: Response, next: NextFunction) {
  try {
    if (req.method === "GET" && cacheUrl.has(req.originalUrl)) {
      logger.info(`Cache hit - ${req.originalUrl}`);
      return res.send(cacheUrl.get(req.originalUrl));
    }
    logger.info(`Cache miss - ${req.originalUrl}`);
    return next();
  } catch (err) {
    logger.error("error in cache", err);
  }
}
