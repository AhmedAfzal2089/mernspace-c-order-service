import { ToppingMessage } from "../types";
import toppingCacheModel from "./toppingCacheModel";

export const handleToppingUpdate = async (value: string) => {
  const topping: ToppingMessage = JSON.parse(value);
  return await toppingCacheModel.updateOne(
    {
      toppingId: topping.id,
    },
    {
      $set: {
        price: topping.price,
        tenantId: topping.tenantId,
      },
    },
    // upsert is added beacuse we dont have the information of that the product is updated or created
    //this will update if the product is available if not then it will create a new one
    {
      upsert: true,
    },
  );
};
