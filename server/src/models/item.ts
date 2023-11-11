import { Schema, Types, model, Model } from "mongoose";
import { Restaurant } from "../interfaces/restaurant.interface";

const restaurantSchema = new Schema<Restaurant>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    cuisine: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    hoursOfOperation: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String,
    },
    menu: [
      {
        name: String,         // Nombre del plato
        description: String,  // Descripción del plato
        price: Number,        // Precio del plato
        image: String,        // URL de la imagen del plato
      }
    ],
    ratings: [
      {
        user: String,         // Nombre del usuario que calificó
        rating: Number,       // Calificación del restaurante
        review: String        // Comentario o reseña
      }
    ],
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ItemModel = model("items", restaurantSchema);
export default ItemModel;