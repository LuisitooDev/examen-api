import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/united/bootstrap.min.css";
import "./Home.css";

export default function Home({ searchTerm }) {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    getRestaurantes();
  }, [searchTerm]);

  const getRestaurantes = () => {
    let url = "http://localhost:3002/item";
    
    // Agregar lógica para la búsqueda si hay un término de búsqueda
    if (searchTerm) {
      url = `http://localhost:3002/item/location/${searchTerm}`;
    }

    axios
      .get(url)
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los restaurantes:", error);
      });
  };

  return (
    <>
      <div className="container home" style={{ marginTop: "20px" }}>
        <div className="row">
          {restaurantes.map((restaurante) => (
            <div className="col-sm-3" key={restaurante.id}>
              <div
                className="card h-100 text-white bg-primary mb-3"
                style={{ maxWidth: "20rem" }}
              >
                <div className="card-header">{restaurante.cuisine}</div>
                <div className="card-body">
                  <img
                    src={restaurante.image}
                    alt={`Imagen de ${restaurante.name}`}
                    className="card-img-top"
                  />
                  <h4 className="card-title">{restaurante.name}</h4>
                  <p className="card-text">{restaurante.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

