import { Restaurant } from "../interfaces/restaurant.interface";
import ItemModel from "../models/item";

const getOrders = async () => {
  const responseItem = await ItemModel.find({});
  return responseItem;
};

export { getOrders };