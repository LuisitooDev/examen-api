export interface Restaurant {
  name: string;         // Nombre del restaurante
  description: string;  // Descripción del restaurante
  location: {
    country: string;    // País del restaurante
    state: string;      // Estado del restaurante
    city: string;       // Municipio del restaurante
  };
  cuisine: string;      // Tipo de cocina
  coordinates: {        // Ubicación (Latitud y Longitud)
    latitude: number;
    longitude: number;
  };
  hoursOfOperation: {    // Horario de operación
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string;
  };
  menu: {
    name: string;       // Nombre del plato
    description: string; // Descripción del plato
    price: number;      // Precio del plato
    image: string;      // URL de la imagen del plato
  }[];
  ratings: {
    user: string;       // Nombre del usuario que calificó
    rating: number;     // Calificación del restaurante
    review: string;     // Comentario o reseña
  }[];
  image: string;         // URL de la imagen del restaurante
}

