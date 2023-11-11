import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/united/bootstrap.min.css";

import "./Admin.css";

export default function Admin() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pais, setPais] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [tipo_cocina, setTipo_cocina] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [lunes, setLunes] = useState("");
  const [martes, setMartes] = useState("");
  const [miercoles, setMiercoles] = useState("");
  const [jueves, setJueves] = useState("");
  const [viernes, setViernes] = useState("");
  const [sabado, setSabado] = useState("");
  const [domingo, setDomingo] = useState("");
  const [nombre_comida, setNombre_comida] = useState("");
  const [descripcion_comida, setDescripcion_comida] = useState("");
  const [precio_comida, setPrecio_comida] = useState("");
  const [imagen_comida, setImagen_comida] = useState("");
  const [imagen, setImagen] = useState("");

  const [restaurante, setRestaurante] = useState("");
  const [id_restaurante, setId] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getRestaurantes();
  }, []);
  
  const add = () => {
    // Obtén el nombre del país, estado y ciudad utilizando los IDs seleccionados
    const selectedCountryObj = countries.find(
      (country) => country.geonameId === parseInt(selectedCountry, 10)
    );
    const selectedStateObj = states.find(
      (state) => state.geonameId === parseInt(selectedState, 10)
    );
    const selectedCityObj = cities.find(
      (city) => city.geonameId === parseInt(municipio, 10)
    );
  
    // Realiza la solicitud POST con los nombres en lugar de IDs
    axios
      .post("http://localhost:3002/item", {
        name: nombre,
        description: descripcion,
        location: {
          country: selectedCountryObj ? selectedCountryObj.countryName : "",
          state: selectedStateObj ? selectedStateObj.stateName : "",
          city: selectedCityObj ? selectedCityObj.cityName : "",
        },
        cuisine: tipo_cocina,
        coordinates: {
          latitude: latitud,
          longitude: longitud,
        },
        hoursOfOperation: {
          monday: lunes,
          tuesday: martes,
          wednesday: miercoles,
          thursday: jueves,
          friday: viernes,
          saturday: sabado,
          sunday: domingo,
        },
        menu: [
          {
            name: nombre_comida,
            description: descripcion_comida,
            price: precio_comida,
            image: imagen_comida,
          },
        ],
        image: imagen,
      })
      .then(() => {
        alert("Tu restaurante ha sido ingresado con éxito");
      })
      .catch((error) => {
        console.error("Error al insertar en la base de datos:", error);
      });
  };

//FUNCION GET
  const getRestaurantes = () => {
    axios.get("http://localhost:3002/item")
      .then((response) => {
        setRestaurante(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los restaurantes:", error)
      });
  }

//FUNCION EDIT
const update = (id) => {
  // Obtén el nombre del país, estado y ciudad utilizando los IDs seleccionados
  const selectedCountryObj = countries.find(
    (country) => country.geonameId === parseInt(selectedCountry, 10)
  );
  const selectedStateObj = states.find(
    (state) => state.geonameId === parseInt(selectedState, 10)
  );
  const selectedCityObj = cities.find(
    (city) => city.geonameId === parseInt(municipio, 10)
  );

  axios
    .put(`http://localhost:3002/item/${id}`, {
      name: nombre,
      description: descripcion,
      location: {
        country: selectedCountryObj ? selectedCountryObj.countryName : "",
        state: selectedStateObj ? selectedStateObj.stateName : "",
        city: selectedCityObj ? selectedCityObj.cityName : "",
      },
      cuisine: tipo_cocina,
      coordinates: {
        latitude: latitud,
        longitude: longitud,
      },
      hoursOfOperation: {
        monday: lunes,
        tuesday: martes,
        wednesday: miercoles,
        thursday: jueves,
        friday: viernes,
        saturday: sabado,
        sunday: domingo,
      },
      menu: [
        {
          name: nombre_comida,
          description: descripcion_comida,
          price: precio_comida,
          image: imagen_comida,
        },
      ],
      image: imagen,
    })
    .then(() => {
      alert("Restaurante actualizado con éxito");
      limpiarCampos();
      setEditar(false);
      getRestaurantes();
    })
    .catch((error) => {
      console.error("Error al actualizar restaurante:", error);
    });
};


const deleteRestaurante = (val) => {
  axios
    .delete(`http://localhost:3002/item/${val}`)
    .then(() => {
      console.log("Restaurante eliminado con éxito");
      getRestaurantes();
    })
    .catch((error) => {
      console.error("Error al eliminar restaurante:", error);
    });
};

const limpiarCampos = () => {
  setNombre("");
  setDescripcion("");
  setSelectedCountry("");
  setSelectedState("");
  setMunicipio("");
  setTipo_cocina("");
  setLatitud("");
  setLongitud("");
  setLunes("");
  setMartes("");
  setMiercoles("");
  setJueves("");
  setViernes("");
  setSabado("");
  setDomingo("");
  setNombre_comida("");
  setDescripcion_comida("");
  setPrecio_comida("");
  setImagen_comida("");
  setImagen("");
  setEditar(false);
};

const editarRestaurante = (val) => {
  setId(val._id);
  setNombre(val.name);
  setDescripcion(val.description);
  setSelectedCountry(val.location.country.geonameId); // Establecer el ID en lugar del nombre
  setSelectedState(val.location.state.geonameId); // Establecer el ID en lugar del nombre
  setMunicipio(val.location.city.geonameId); // Establecer el ID en lugar del nombre
  setTipo_cocina(val.cuisine);
  setLatitud(val.coordinates.latitude);
  setLongitud(val.coordinates.longitude);
  setLunes(val.hoursOfOperation.monday);
  setMartes(val.hoursOfOperation.tuesday);
  setMiercoles(val.hoursOfOperation.wednesday);
  setJueves(val.hoursOfOperation.thursday);
  setViernes(val.hoursOfOperation.friday);
  setSabado(val.hoursOfOperation.saturday);
  setDomingo(val.hoursOfOperation.sunday === "0" ? "Closed" : val.hoursOfOperation.sunday);

  // Ajusta el resto de los valores según la estructura de tus datos
  setNombre_comida(val.menu[0].name);
  setDescripcion_comida(val.menu[0].description);
  setPrecio_comida(val.menu[0].price);
  setImagen_comida(val.menu[0].image);
  setImagen(val.image);
  setEditar(true);
};


  //PAISES
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Obtener nombres de países
  useEffect(() => {
    axios
      .get("http://api.geonames.org/countryInfoJSON?username=LuisitoCriticas")
      .then((response) => {
        // Mapear la respuesta para incluir el nombre del país
        const countriesWithNames = response.data.geonames.map((country) => ({
          ...country,
          countryName: country.countryName,
        }));
        setCountries(countriesWithNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);
  
  // Obtener nombres de estados
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `http://api.geonames.org/childrenJSON?geonameId=${selectedCountry}&username=LuisitoCriticas`
        )
        .then((response) => {
          // Mapear la respuesta para incluir el nombre del estado
          const statesWithNames = response.data.geonames.map((state) => ({
            ...state,
            stateName: state.name,
          }));
          setStates(statesWithNames);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry]);
  
  // Obtener nombres de municipios
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `http://api.geonames.org/childrenJSON?geonameId=${selectedState}&username=LuisitoCriticas`
        )
        .then((response) => {
          // Mapear la respuesta para incluir el nombre del municipio
          const citiesWithNames = response.data.geonames.map((city) => ({
            ...city,
            cityName: city.name,
          }));
          setCities(citiesWithNames);
          console.log(citiesWithNames)
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedState]);
  

  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-sm-6">
          <legend>GRID de restaurantes registrados</legend>
          <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre Restaurante</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Cocina</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {restaurante && restaurante.length > 0 && restaurante.map((val, key) => (
              <tr key={val._id}>
              <th>{val.name}</th>
              <td>{val.description}</td>
              <td>{val.cuisine}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => editarRestaurante(val)} className="btn btn-warning">Editar</button>
                  <button type="button" onClick={() => deleteRestaurante(val._id)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>

          <div className="col-sm-6">
            <form>
              <fieldset>
                <legend>Ingrese aquí los datos de su restaurante</legend>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setNombre(event.target.value)}
                    className="form-control"
                    value={nombre}
                    placeholder="Ingrese el nombre del restaurante"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Descripcion:
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setDescripcion(event.target.value)}
                    className="form-control"
                    value={descripcion}
                    placeholder="Ingrese una breve descripcion del restaurante"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="countrySelect" className="form-label mt-4">
                    Selecciona el país del restaurante
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    value={selectedCountry}
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map((country) => (
                      <option key={country.geonameId} value={country.geonameId}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stateSelect" className="form-label mt-4">
                    Selecciona el estado del restaurante
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setSelectedState(e.target.value)}
                    value={selectedState}
                  >
                    <option value="">Seleccione un estado</option>
                    {states.map((state) => (
                      <option key={state.geonameId} value={state.geonameId}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="citySelect" className="form-label mt-4">
                    Selecciona el municipio del restaurante
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setMunicipio(e.target.value)}
                    value={municipio}
                  >
                    <option value="">Seleccione un municipio</option>
                    {cities.map((city) => (
                      <option key={city.geonameId} value={city.geonameId}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Tipo de comida:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => setTipo_cocina(event.target.value)}
                    value={tipo_cocina}
                    placeholder="Ingrese el tipo de comida del restaurante"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Latitud
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setLatitud(event.target.value)}
                    className="form-control"
                    value={latitud}
                    placeholder="Ingrese la latitud del lugar"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Longitud
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setLongitud(event.target.value)}
                    className="form-control"
                    value={longitud}
                    placeholder="Ingrese la longitud del lugar"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Horario:
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setLunes(event.target.value)}
                    className="form-control"
                    value={lunes}
                    placeholder="Lunes"
                  />

                  <input
                    type="text"
                    onChange={(event) => setMartes(event.target.value)}
                    className="form-control"
                    value={martes}
                    placeholder="Martes"
                  />

                  <input
                    type="text"
                    onChange={(event) => setMiercoles(event.target.value)}
                    className="form-control"
                    value={miercoles}
                    placeholder="Miercoles"
                  />

                  <input
                    type="text"
                    onChange={(event) => setJueves(event.target.value)}
                    className="form-control"
                    value={jueves}
                    placeholder="Jueves"
                  />

                  <input
                    type="text"
                    onChange={(event) => setViernes(event.target.value)}
                    className="form-control"
                    value={viernes}
                    placeholder="Viernes"
                  />

                  <input
                    type="text"
                    onChange={(event) => setSabado(event.target.value)}
                    className="form-control"
                    value={sabado}
                    placeholder="Sabado"
                  />

                  <input
                    type="text"
                    onChange={(event) => setDomingo(event.target.value)}
                    className="form-control"
                    value={domingo}
                    placeholder="Domingo"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Menu:
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setNombre_comida(event.target.value)}
                    className="form-control"
                    value={nombre_comida}
                    placeholder="Nombre"
                  />

                  <input
                    type="text"
                    onChange={(event) =>
                      setDescripcion_comida(event.target.value)
                    }
                    className="form-control"
                    value={descripcion_comida}
                    placeholder="Descripcion"
                  />

                  <input
                    type="text"
                    onChange={(event) => setPrecio_comida(event.target.value)}
                    className="form-control"
                    value={precio_comida}
                    placeholder="Precio"
                  />

                  <input
                    type="text"
                    onChange={(event) => setImagen_comida(event.target.value)}
                    className="form-control"
                    value={imagen_comida}
                    placeholder="Ingresar la imagen del alimento"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Imagen:
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setImagen(event.target.value)}
                    className="form-control"
                    value={imagen}
                    placeholder="Imagen"
                  />
                </div>

                
                {editar ? (
  <div>
    <button className='btn btn-warning m-2' onClick={() => update(id_restaurante)}>Actualizar</button>
    <button className='btn btn-info m-2' onClick={() => { limpiarCampos(); setEditar(false); }}>Cancelar</button>
  </div>
) : (
  <button className='btn btn-success' onClick={add}>Registrar</button>
)}

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
