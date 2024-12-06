import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import Map from './containers/map/index.jsx'; 
import Home from "./containers/home/index.jsx";
import Login from './containers/login/index.jsx';
import Register from './containers/register/index.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Profile from "./containers/profile/index.jsx";
import Pokedex from "./containers/pokedex/index.jsx";
import PokedexCapturado from "./containers/pokedexCapturado/index.jsx";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jogar",
    element: (
      <PrivateRoute>
        <Map />  // Protege a página de "Jogar" com a PrivateRoute
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: < Profile/>,
  },
  {
    path: "/pokedex",
    element: < Pokedex/>,
  },
  {
    path: "/pokedexcapturado",
    element: < PokedexCapturado/>,
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {router.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
