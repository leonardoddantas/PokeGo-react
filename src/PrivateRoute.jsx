import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("access_token"); // Verifica se há um token no localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redireciona para o login caso não esteja autenticado
  }

  return children; // Caso esteja autenticado, renderiza o conteúdo da rota
}

export default PrivateRoute;
