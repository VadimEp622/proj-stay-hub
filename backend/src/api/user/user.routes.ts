import express from "express";
import {
  requireAuth,
  requireAdmin,
} from "../../middleware/requireAuth.middleware.js";
import { getUser, deleteUser, addUserTrip } from "./user.controller.ts";
import { addUserTripValidator, getUserValidator } from "./user.validator.ts";

const router = express.Router();

// ====================== Confirmed Being Used ======================
router.get("/:id", getUserValidator, getUser);
router.post("/:id/trip", requireAuth, addUserTripValidator, addUserTrip);
// TODO: 1) "/:id/trip" should be PUT, not POST
//       2) check if possible to use something like "updateUser" for all cases
// ==================================================================
// =================== Confirmed works but unused ===================
router.delete("/:id", requireAuth, requireAdmin, deleteUser);
// ==================================================================

export const userRoutes = router;
