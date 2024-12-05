import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import api from "../../services/api";
import bulbasaur from "/images/bulbasaur.png";
import "./style.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/register", formData)
      .then((response) => {
        console.log("Cadastro realizado com sucesso:", response.data);
        localStorage.setItem("token", response.data.access_token); 
        localStorage.setItem("user_name", response.data.user.name);
        localStorage.setItem("user_id", response.data.user.id);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error.response.data);
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
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
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
          <button type="submit">Cadastrar</button>
        </form>
        <p>
          Já tem uma conta?{" "}
          <Link to="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
