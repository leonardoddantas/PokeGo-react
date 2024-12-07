
import { Link } from "react-router-dom";
import "./style.css";

function Home() {
    const userName = localStorage.getItem("user_name");
    return (
        <>
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokedex">Pokémons</Link></li>
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

           <main>
                <section className="sobre">
                  <div>
                     <h1>O que é o PokeGo?</h1>
                      <p>
                          PokeGo é um jogo interativo onde a sala de aula se transforma em uma aventura Pokémon! 
                          Aqui, os professores não são mais apenas instrutores — eles se tornam Pokémons que você pode capturar. 
                          O campus vira o seu mapa, com vários pontos de interesse e desafios para enfrentar.
                          Complete missões e conquiste pontos enquanto aprende sobre matérias, habilidades e conhecimentos diretamente de seus professores!
                      </p>
                  </div>
                    <img src="/images/pikachu-header.png" alt="" />
                </section>
                <section className="cirol">
                     <h1>Como Jogar</h1>
                    <p>
                        Para começar a jogar, tudo o que você precisa fazer é se cadastrar e fazer login na plataforma. 
                        Após o login, você será transportado para o mapa do jogo, que é uma versão do campus onde os professores se tornam Pokémons.
                        Durante o jogo, você pode explorar o campus, localizar Pokémons (que são seus professores) e capturá-los ao completar missões educativas. 
                        A cada missão concluída, você ganha pontos e desbloqueia novas habilidades. O objetivo é capturar o maior número possível de Pokémons e conquistar o topo do ranking!
                    </p>
                    <img src="" alt="" />
                </section>
           </main>

            <footer>
              <p>&copy; 2024 PokeGo - Todos os direitos reservados</p>
           </footer>
        </>
    );
}

export default Home;