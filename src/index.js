import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './Login';
import Album from './Album';
import Register from './Register';
import Booked from './booked';
import Checkout from './checkout';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <Routes>
        <Route path="/" element={ <App/> } /> 
        <Route path="/login" element={ <Login/> } /> 
        <Route path="/Album" element={ <Album/> } /> 
        <Route path="/Register" element={ <Register/> } /> 
        <Route path="/booked" element={ <Booked/> } /> 
        <Route path="/checkout" element={ <Checkout/> } /> 
      </Routes>
  </BrowserRouter>
);

reportWebVitals();
