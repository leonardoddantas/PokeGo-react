import { Link } from "react-router-dom";
import "./style.css";

function Header() {
  const userName = localStorage.getItem("user_name");

  return (
    <header>
      <div className="info">
        <h2>POKEGO</h2>
        <h1>PIKACHU</h1>
        <p>
          No PokeGo, os professores se tornam Pokémons e o campus vira o mapa da sua aventura. Complete missões, descubra novas habilidades e capture personagens únicos enquanto aprende de forma interativa e descontraída. Transforme o cotidiano escolar em uma experiência inesquecível!
        </p>
        <img src="/images/pikachu-header.png" alt="Pikachu" className="pokemon-img" />
        <span className="pokemon-name">PIKACHU</span>
      </div>
      <div className="menu">
        <nav>
          <ul>
            <li><Link to="/login">Home</Link></li>
            <li><Link to="/register">Pokémons</Link></li>
            <li><Link to="/jogar">Jogar</Link></li>
            {userName ? (
              <li><Link to="/profile">{userName}</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
