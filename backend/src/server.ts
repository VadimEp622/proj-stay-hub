import "dotenv/config";
import http from "http";
import path from "path";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { logger } from "./service/logger.service.js";
import { appConfig } from "./config/app.config.ts";
import { connectDB } from "./service/db.service.ts";

// INFO: replaced mongodb with mongoose (for the current used API's), and checked that all used methods actually WORK
// TODO: 1) ✔ go over front+back API connections
//       2) imporve API's services (filterCriteriaBuilders + updateMethodBuilders)
//       3) ✔ deploy typescript backend to render

// TODO: (after deploying TS backend)
// * ✔ make a new DB collection "wishlistStay". It will have "_id", "userId" and "stayId".
// * ✔ make functional API for "wishlistStay" that toggles wishlist item, and fetches wishlisted stay objects
// * ✔ connect "wishlistStay" to frontend

// TODO: I decided on a uniform file name convention -> all file-names should henceforth only be in "kebab-case"

// TODO: I realised, that it's better to query in stay API for a "mini-stay" object, that is aggregated with only the useful stay-preview data, + isWishlist boolean.
//      this will allow for proper functionality of infinite scrolling for wishlist stays, with the new "wishlistStay" DB collection API.
//      need to think about cases when there is no logged in user as well.

// ####################################################################################################################
// ####################################################################################################################

// TODO: new startegy -
//    1) first, have a cacheable API for fetching mini stays by query (no user-specific data!!!)
//    2) after first API request was completed, on the frontend, checks if loggedin, and if yes, fires a second different API request,
//   with the same query parameters, but for user-specific data this time (which stays from the query are wishlisted by the user).

//   ** NOTE: At this stage, we have cacheable API for stays, which is non user-personalized. (not logged-in user can get blazing fast data)
//        and another API request to supplement the cacheable API with user-specific data.

//    3) since we have infinite scrolling for our stays, we have to account for user logging-in mid pagination journey, so we get user-specific wishlist data,
//     for all currently displayed stays.
//     I imagine that we will also need to add current page of stays to the second API request, to get user-specific wishlist data for ALL currently displayed stays.

// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇

// -> SO, let's review what we need to do step by step:
//   1) ✔ make GET "api/stay" query API, which will fetch mini stays, and have it cacheable. (make sure it WORKS)
//   2) ✔ make GET "api/stay/wishlist" query API, which will fetch array of user sepcifc wishlisted stayIds. will fetch stayIds of all currently displayed stays in 1 request.
//    make sure there is a destinction for the API between fetching wishlist for ALL current rendered stays, and fetching wishlist for next small paged batch of stays ONLY.
//    (like from page 1 to 9, and from page 9 to 10, etc...). (make sure it WORKS)
//   3) ✔ frontend, in redux stay slice, we will have an array of wishlisted stayIds. they are always coupled with the actual stays array in redux stay slice.
//   4) ✔ frontend, in wishlist page, we will have a paginated list of wishlisted stays (maybe with infinite scrolling). those are stays that will be in the redux user slice.

//   5) make frontend work with "mini-stay" object, for listing large previews of stays.
//   6) add caching to querying of "mini-stays"
//   7) remove users doc's "wishlist" field (since it's now redundant), from ALL app flow. (db/cookies/request.loggedinUser/asyncLocalStorage/etc...)

// ####################################################################################################################
// ####################################################################################################################

// TODO: (Bugs)
//  * in frontend, sometimes in console appears: "Cookie “__cf_bm” has been rejected because there is an existing “secure” cookie."
//  investigate and fix!

// ***************** Express App Config *****************
const app = express();
const server = http.createServer(app);
connectDB();

app.use(cookieParser());
app.use(express.json());

if (appConfig.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3030",
      "http://127.0.0.1:3030",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// ***************** Routes *****************
import { setupAsyncLocalStorage } from "./middleware/setupAls.middleware.js";
import { log } from "./middleware/logger.middleware.js";
import { setupSocketAPI } from "./service/socket.service.js";
import { userRoutes } from "./api/user/user.routes.js";
import { healthcheckRoutes } from "./api/healthcheck/healthcheck.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";
import { orderRoutes } from "./api/order/order.routes.js";
import { secretRoutes } from "./api/secret/secret.routes.js";
import { stayRoutes } from "./api/stay/stay.routes.js";
import { wishlistStayRoutes } from "./api/wishlist-stay/wishlist-stay.routes.ts";

app.all("*", setupAsyncLocalStorage, log);
app.use("/api/user", userRoutes);
app.use("/api/healthcheck", healthcheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/secret", secretRoutes);
app.use("/api/stay", stayRoutes);
app.use("/api/wishlist-stay", wishlistStayRoutes);

setupSocketAPI(server);

// ***************** Graceful shutdown *****************
const shutdown = async () => {
  logger.warn("Shutdown initiated...");
  try {
    server.close(() => logger.info("HTTP server closed."));
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// ***************** Get static React app *****************
if (appConfig.NODE_ENV === "production") {
  app.get("/**", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });
}

// ***************** Run Server *****************
const port = appConfig.PORT ?? 3030;
server.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
