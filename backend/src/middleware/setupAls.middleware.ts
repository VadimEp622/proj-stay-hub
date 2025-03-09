import { authService } from "../api/auth/auth.service.js";
import { asyncLocalStorage } from "../service/als.service.js";
import { logger } from "../service/logger.service.js";
import {
  NextFunctionCustom,
  RequestCustom,
  ResponseCustom,
} from "../types/custom-extend.types.ts";

interface ILoggedinUser {
  _id: string;
  fullname: string;
  isAdmin?: boolean;
}

// NOTE: als, used for remembering a state throughout a request
export async function setupAsyncLocalStorage(
  req: RequestCustom,
  _res: ResponseCustom,
  next: NextFunctionCustom
) {
  const storage = {};
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies || Object.keys(req.cookies).length === 0) return next();

    const loggedinUser: null | ILoggedinUser = authService.validateToken(
      req.cookies.loginToken
    );
    // logger.debug(`setupAsyncLocalStorage -> loggedinUser - ${JSON.stringify(loggedinUser)}`)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore();
      alsStore.loggedinUser = loggedinUser;
    }
    next();
  });
}
