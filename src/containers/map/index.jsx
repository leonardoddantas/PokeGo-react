import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.css";

const personagemIcon = L.icon({
  iconUrl: "../../../public/images/personagem.png",
  iconSize: [100, 100],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const pokemonIcon = L.icon({
  iconUrl: "../../../public/images/pokemon.png", 
  iconSize: [80, 80],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function Map() {
  const [position, setPosition] = useState([-6.466185, -36.937022]); 
  const [visiblePokemons, setVisiblePokemons] = useState([]); 
  const [userPokemons, setUserPokemons] = useState([]);

 useEffect(() => {
    api
        .get(`/pokemons/nearby/${position[0]}/${position[1]}`)
        .then((response) => {
            const pokemons = response.data;
            const capturedPokemons = pokemons.filter((pokemon) => 
                !pokemon.captured || !userPokemons.includes(pokemon.id)
            );
            setVisiblePokemons(capturedPokemons);
        })
        .catch((err) => console.error("Erro ao carregar pokémons próximos: " + err));
}, [position, userPokemons]);

const capturePokemon = (pokemonId) => {
  const token = localStorage.getItem("token");
  const userId = 2
  
  if (!token || !userId) {
    alert("Usuário não autenticado ou ID do usuário não encontrado.");
    return;
  }

  api
    .post(`/pokemons/capture/${pokemonId}`, { user_id: userId }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Passa o token no cabeçalho
      },
    })
    .then((response) => {
      console.log(response.data);
      alert(response.data.message);
      setVisiblePokemons((prevPokemons) =>
        prevPokemons.filter((pokemon) => pokemon.id !== pokemonId)
      );
    })
    .catch((err) => {
      console.error("Erro ao capturar o Pokémon: " + (err.response ? err.response.data.message : err.message));
      alert("Erro ao capturar o Pokémon: " + (err.response ? err.response.data.message : err.message));
    });
};

  return (
    <div>
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcador do personagem */}
        <Marker position={position} icon={personagemIcon}>
          <Popup>
            <p>Este é o personagem!</p>
          </Popup>
        </Marker>

        {/* Marcadores de pokémons visíveis */}
        {visiblePokemons.map((pokemon) => (
          <Marker
            key={pokemon.id}
            position={[pokemon.latitude, pokemon.longitude]}
            icon={pokemonIcon}
          >
            <Popup>
              <p><strong>Nome:</strong> {pokemon.name}</p>
              <p><strong>Tipo:</strong> {pokemon.type}</p>
              <button
                onClick={() => capturePokemon(pokemon.id)}
                className="capture-button"
              >
                Capturar
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="button-container">
        <button onClick={() => setPosition([position[0] + 0.0010, position[1]])} className="map-button">
          <i className="fa fa-arrow-up"></i>
        </button>
        <button onClick={() => setPosition([position[0] - 0.0010, position[1]])} className="map-button">
          <i className="fa fa-arrow-down"></i>
        </button>
        <button onClick={() => setPosition([position[0], position[1] - 0.0010])} className="map-button">
          <i className="fa fa-arrow-left"></i>
        </button>
        <button onClick={() => setPosition([position[0], position[1] + 0.0010])} className="map-button">
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Map;
