import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "./style.css";
import api from "../../services/api";
import bulbasaur from "/images/bulbasaur.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_name", response.data.user.name);
        localStorage.setItem("user_id", response.data.user.id);
        navigate("/jogar");
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Ocorreu um erro ao tentar fazer login.");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="pokemon-section">
        <img src={bulbasaur} alt="Bulbasaur" />
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
        </form>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        <p>
          Não tem uma conta?{" "}
          <Link to="/register">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
