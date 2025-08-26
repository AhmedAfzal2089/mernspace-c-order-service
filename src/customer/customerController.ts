import { Response } from "express";
import { Request } from "express-jwt";
import customerModel from "./customerModel";

export class CustomerController {
  getCustomer = async (req: Request, res: Response) => {
    // add these fields to jwt in auth service
    const { sub: userId, firstName, lastName, email } = req.auth;
    const customer = await customerModel.findOne({ userId });
    if (!customer) {
      const newCustomer = await customerModel.create({
        userId,
        firstName,
        lastName,
        email,
        addresses: [],
      });
      return res.json(newCustomer);
    }
    res.json(customer);
  };
  addAddress = async (req: Request, res: Response) => {
    const { sub: userId } = req.auth;
    const customer = await customerModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId,
      },
      {
        $push: {
          addresses: {
            text: req.body.address,
            // todo: implement isdeafut in future
            isDefault: false,
          },
        },
      },
      {
        new: true,
      },
    );
    return res.json(customer);
  };
}
