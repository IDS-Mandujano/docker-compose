import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchUserData } from './services/apiService';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData()
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div className="status">Cargando datos desde la API... ⏳</div>;
  }

  if (error) {
    return <div className="status error">Error: {error} ❌</div>;
  }

  return (
    <div className="card">
      <h1>Proyecto de Microservicios</h1>
      {userData ? (
        <div>
          <h2>Datos Obtenidos de la API:</h2>
          <p><strong>Nombre Completo:</strong> {userData.nombreCompleto}</p>
          <p><strong>Mensaje del Servidor:</strong> {userData.mensaje}</p>
        </div>
      ) : (
        <p>No se encontraron datos.</p>
      )}
    </div>
  );
}

export default App;