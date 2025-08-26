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
    if ((req as AuthRequest).auth.role !== Roles.ADMIN) {
      const tenant = (req as AuthRequest).auth.tenant;
      if (req.body.tenantId !== String(tenant)) {
        return next(
          createHttpError(403, "You are not allowed to access this product "),
        );
      }
    }
    // todo: add logging
    const coupon = await couponModel.create({
      title,
      code,
      discount,
      validUpto,
      tenantId,
    });

    return res.json(coupon);
  };

  // todo: Complete CRUD assignment. This will be used in dashboard.
}
