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

// TODO: I decided on a uniform file name convention -> all file-names should henceforth only be in "kebab-case"

// ####################################################################################################################
// ####################################################################################################################

// TODO: (misc)
// * ✔ Change in entire app, so that "loggedinUser" variable/state will always be named like that, and not "loggedInUser". (for consistency)
// * In frontend, user object sometimes looks for "joined" field. probably because of large stay demo data, which has fake user object with "joined" field.
// Think what to do about it.
// * In frontend, checkout out store's systemSlice, review it's flow and structure, and improve it if needed.
// * Research more robust error handling structure for the app (carefully finish reading: "https://www.toptal.com/nodejs/node-js-error-handling")
// * In frontend, research "redux-persist" for handling session persistence with redux.
//      OR, update sessionStorage after unwrapping login/signup/logout dispatch actions (also consider only storing safe data in sessionStorage - boolean isLoggedin + cookie auth).
//      OR, ditch persistent storage entirely, and use cookies only.

// TODO: (Bugs)
// * in frontend, sometimes in console appears: "Cookie “__cf_bm” has been rejected because there is an existing “secure” cookie."
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
