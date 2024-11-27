import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'font-awesome/css/font-awesome.min.css';
import Map from './containers/map/index.jsx';
import Header from './containers/header/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
  </StrictMode>,
)
