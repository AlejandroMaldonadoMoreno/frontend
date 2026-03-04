const API_URL = "http://localhost:4000"; // Importante colocar la url de tu api

export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en GET:", error);
      throw error;
    }
  },

  post: async (endpoint, body) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en POST:", error);
      throw error;
    }
  }
};