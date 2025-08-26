/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express";
import couponModel from "./couponModel";
import { Request } from "express-jwt";
import { Roles } from "../common/constants";
import createHttpError from "http-errors";
import { AuthRequest } from "../types";

export class CouponController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    const { title, code, validUpto, discount, tenantId } = req.body;

    // todo: add request validation.
    // todo: check if creator is admin or a manger of that restaurant.
    if ((req as AuthRequest).auth.role === Roles.ADMIN) {
      const coupon = await couponModel.create({
        title,
        code,
        discount,
        validUpto,
        tenantId,
      });
      return res.json(coupon);
    }
    if ((req as AuthRequest).auth.role === Roles.MANAGER) {
      const tenant = req.auth.tenant;
      if (tenantId == tenant) {
        const coupon = await couponModel.create({
          title,
          code,
          discount,
          validUpto,
          tenantId,
        });

        return res.json(coupon);
      } else {
        return next(
          createHttpError(401, "You are not the manager of the restaurnat "),
        );
      }
    }
  };
  verify = async (req: Request, res: Response, next: NextFunction) => {
    const { code, tenantId } = req.body;
    // validate the data
    const coupon = await couponModel.findOne({ code, tenantId });
    if (!coupon) {
      const error = createHttpError(400, "Coupon does not exist");
      return next(error);
    }
    // validate expiry;
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);
    if (currentDate <= couponDate) {
      return res.json({ valid: true, discount: coupon.discount });
    }

    return res.json({ valid: false, discount: 0 });
  };
  // todo: Complete CRUD assignment. This will be used in dashboard.
}
