import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./style.css";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
   
    api
      .get("/pokemons")
      .then((response) => {
        setPokemons(response.data); 
      })
      .catch((error) => {
        setErrorMessage("Erro ao carregar os pokémons");
      });
  }, []);

  return (
    <>
      <header className="header_pokedex">
        <div className="logo">
          <img src="/images/PokeGo-logo.png" alt="Logo do projeto, escrito: PokeGo" />
        </div>
        <div className="card_pokedex">
          <div className="info_pokedex">
            <h1>Pokedex</h1>
            <p>A Pokédex é uma página interativa onde os usuários podem explorar e descobrir informações sobre diferentes Pokémon.</p>
            <button><a href="/">Home</a></button>
          </div>
          <div>
            <img src="/images/bulbasaur-pokedex.png" alt="Imagem do pokemom bulbasaur" />
          </div>
        </div>
      </header>
       <main className="main_pokedex">
        <div className="card-grid">
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            pokemons.slice(0, 9).map((pokemon, index) => (
              <div key={pokemon.id || index} className={`card ${index < 3 ? "green" : index < 6 ? "brown" : "blue"}`}>
                  <img className="image-placeholder" src={`/images/${pokemon.name}.png`} alt={pokemon.name} />
                <h3 className="name">{pokemon.name}</h3>
                <div className="power-level">
                  Tipo: {pokemon.type}<br />
                  {pokemon.description}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default Pokedex;
