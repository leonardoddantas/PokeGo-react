import { createBrowserRouter} from "react-router"
import 'font-awesome/css/font-awesome.min.css';
import Map from './containers/map/index.jsx';
import Header from './containers/header/index.jsx';
import Login from './containers/login/index.jsx';
import Register from './containers/register/index.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />
  },
  {
    path: "/jogar",
    element: <Map />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);