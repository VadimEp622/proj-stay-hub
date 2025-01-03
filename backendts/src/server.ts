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
// TODO: 1) go over front+back API connections
//       2) imporve API's services (filterCriteriaBuilders + updateMethodBuilders)
//       3) deploy typescript backend to render

// TODO: (after deploying TS backend)
// * make a new DB collection "wishlist-stay". It will have "_id", "userId" and "stayId".

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
import { setupSocketAPI } from "./service/socket.service.js";
import { userRoutes } from "./api/user/user.routes.js";
import { healthcheckRoutes } from "./api/healthcheck/healthcheck.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";
import { orderRoutes } from "./api/order/order.routes.js";
import { secretRoutes } from "./api/secret/secret.routes.js";
import { stayRoutes } from "./api/stay/stay.routes.js";

app.all("*", setupAsyncLocalStorage);
app.use("/api/user", userRoutes);
app.use("/api/healthcheck", healthcheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/secret", secretRoutes);
app.use("/api/stay", stayRoutes);

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
