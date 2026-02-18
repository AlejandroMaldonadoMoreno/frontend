import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await api.get('/productos');
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>

    </div>
  );
};

export default Productos;