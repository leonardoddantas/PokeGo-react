import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./style.css";

function Pokedex() {
    const cards = [
        { id: 1, colorClass: "green" },
        { id: 2, colorClass: "green" },
        { id: 3, colorClass: "green" },
        { id: 4, colorClass: "brown" },
        { id: 5, colorClass: "brown" },
        { id: 6, colorClass: "brown" },
        { id: 7, colorClass: "blue" },
        { id: 8, colorClass: "blue" },
        { id: 9, colorClass: "blue" },
    ];
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
                {cards.map((card) => (
                <div key={card.id} className={`card ${card.colorClass}`}>
                    <div className="image-placeholder"></div>
                    <h3 className="name">NOME</h3>
                    <div className="power-level">#haspowerlevel<br />EGRTHKUETUYI</div>
                </div>
                ))}
            </div>
      </main>
    </>
  );
}

export default Pokedex;
