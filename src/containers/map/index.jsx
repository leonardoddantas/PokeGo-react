import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.css";

const personagemIcon = L.icon({
  iconUrl: "../../../public/images/personagem.png",
  iconSize: [200, 200],
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
        if (Array.isArray(pokemons)) {
          const capturedPokemons = pokemons.filter(
            (pokemon) =>
              !pokemon.captured || !userPokemons.includes(pokemon.id)
          );
          setVisiblePokemons(capturedPokemons);
        } else {
          console.error("Formato de resposta inválido", pokemons);
        }
      })
      .catch((err) =>
        console.error("Erro ao carregar pokémons próximos: " + err)
      );
  }, [position, userPokemons]);

  const capturePokemon = (pokemonId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      alert("Usuário não autenticado ou ID do usuário não encontrado.");
      return;
    }

    const mapContainer = document.querySelector(".map-container");
    if (!mapContainer) {
      console.error("Elemento do mapa não encontrado!");
      return;
    }

    const captureEffect = document.createElement("div");
    captureEffect.className = "capture-effect";

    captureEffect.style.top = `${window.innerHeight / 2}px`;
    captureEffect.style.left = `${window.innerWidth / 2}px`;

    mapContainer.appendChild(captureEffect);
    console.log("Efeito de captura adicionado!");

    setTimeout(() => {
      mapContainer.removeChild(captureEffect);
      console.log("Efeito de captura removido!");
    }, 1000);

    api
      .post(`/pokemons/capture/${pokemonId}`, { user_id: userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
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
        console.error(
          "Erro ao capturar o Pokémon: " +
            (err.response ? err.response.data.message : err.message)
        );
        alert(
          "Erro ao capturar o Pokémon: " +
            (err.response ? err.response.data.message : err.message)
        );
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
        {visiblePokemons.map((pokemon) => {
          // Dinamicamente cria o ícone com base no nome do Pokémon
          const pokemonIcon = L.icon({
            iconUrl: `../../../public/images/${pokemon.name}.png`, // Nome do Pokémon para a imagem
            iconSize: [80, 80],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          return (
            <Marker
              key={pokemon.id}
              position={[pokemon.latitude, pokemon.longitude]}
              icon={pokemonIcon}
            >
              <Popup>
                <p><strong>Nome:</strong> {pokemon.name}</p>
                <p><strong>Tipo:</strong> {pokemon.type}</p>
                {/* Renderiza o botão apenas se o Pokémon ainda não foi capturado */}
                {!userPokemons.includes(pokemon.id) && (
                  <button
                    onClick={() => capturePokemon(pokemon.id)}
                    className="capture-button"
                  >
                    Capturar
                  </button>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="button-container">
        <button
          onClick={() => setPosition([position[0] + 0.0010, position[1]])}
          className="map-button"
        >
          <i className="fa fa-arrow-up"></i>
        </button>
        <button
          onClick={() => setPosition([position[0] - 0.0010, position[1]])}
          className="map-button"
        >
          <i className="fa fa-arrow-down"></i>
        </button>
        <button
          onClick={() => setPosition([position[0], position[1] - 0.0010])}
          className="map-button"
        >
          <i className="fa fa-arrow-left"></i>
        </button>
        <button
          onClick={() => setPosition([position[0], position[1] + 0.0010])}
          className="map-button"
        >
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Map;
