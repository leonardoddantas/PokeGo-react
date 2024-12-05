import React from 'react';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você já está deslogado.");
      return;
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        alert("Logout realizado com sucesso!");
        navigate("/login");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Settings</h2>
      <form className="profile-form">
        <label>
          Name:
          <input type="text" placeholder="Enter your name" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Enter new password" autoComplete="new-password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" placeholder="Confirm new password" autoComplete="new-password" />
        </label>
        <button type="submit">Update Profile</button>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
}
