import { ProductMessage } from "../types";
import productCacheModel from "./productCacheModel";

export const handleProductUpdate = async (value: string) => {
  //todo: wrap this parsing in try catch

  const product: ProductMessage = JSON.parse(value);
  return await productCacheModel.updateOne(
    {
      productId: product.id,
    },
    {
      $set: {
        priceConfiguration: product.priceConfiguration,
      },
    },
    // upsert is added beacuse we dont have the information of that the product is updated or created
    //this will update if the product is available if not then it will create a new one
    { upsert: true },
  );
};
