import { Restaurant } from "../interfaces/restaurant.interface";
import ItemModel from "../models/item";

const insertCar = async (item: Restaurant) => {
  const responseInsert = await ItemModel.create(item);
  return responseInsert;
};

const getCars = async () => {
  const responseItem = await ItemModel.find({});
  return responseItem;
};

const getCar = async (id: string) => {
  const responseItem = await ItemModel.findOne({ _id: id });
  return responseItem;
};

const updateCar = async (id: string, data: Restaurant) => {
  const responseItem = await ItemModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const deleteCar = async (id: string) => {
  const responseItem = await ItemModel.deleteOne({ _id: id });
  return responseItem;
};

const getLocation = async (searchText: string) => {
  const responseItems = await ItemModel.find({
    $or: [
      { 'location.country': { $regex: searchText, $options: 'i' } },
      { 'location.state': { $regex: searchText, $options: 'i' } },
      { 'location.city': { $regex: searchText, $options: 'i' } },
    ],
  });
  return responseItems;
};


export { insertCar, getCars, getCar, updateCar, deleteCar, getLocation };