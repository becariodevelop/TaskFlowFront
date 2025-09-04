import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.tsx';
import Inicio from './components/inicio.tsx';
import Colaboradores from './components/colaboradores.tsx';
import Clientes from './components/clientes.tsx';
import Actividades from './components/actividades.tsx';
import Bitacora from './components/bitacora.tsx';
import ChartComponent from './components/chartComponent.tsx';



function App() {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/act-catalogo" element={<Actividades />} />
          <Route path="/bitacora" element={<Bitacora />} />
          <Route path="/indicadores" element={<ChartComponent />} />

          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>      
  )
}

export default App
