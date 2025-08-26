import express from "express";
import authenticate from "../common/middleware/authenticate";
import { asyncWrapper } from "../utils";
import { CouponController } from "./couponController";
import { canAccess } from "../common/middleware/canAccess";
import { Roles } from "../common/constants";

const router = express.Router();
const couponController = new CouponController();
router.post(
  "/",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  asyncWrapper(couponController.create),
);

router.post("/verify", authenticate, asyncWrapper(couponController.verify));

export default router;
