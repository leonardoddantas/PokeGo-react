import "./style.css";

function Header() 
{
    return (
        <>
            <header>

                <div className="info">
                    <h2>POKEGO</h2>
                    <h1>PIKACHU</h1>
                    <p>No PokeGo, os professores se tornam Pokémons e o campus vira o mapa da sua aventura. Complete missões, descubra novas habilidades e capture personagens únicos enquanto aprende de forma interativa e descontraída. Transforme o cotidiano escolar em uma experiência inesquecível!</p>
                    {/* <img src="../../../public/images/pikachu-header.png" alt="" /> */}
                    <span>PIKACHU</span>
                </div>

                <div className="menu">
                    <nav>
                        <ul>
                            <li><a href="http://">Home</a></li>
                            <li><a href="http://">Pókemons</a></li>
                            <li><a href="http://">Jogar</a></li>
                            <li><a href="http://">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;