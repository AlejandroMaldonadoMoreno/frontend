import { useEffect, useState } from "react";
import { api } from "../services/api";

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        api.get("/api/productos")
            .then((data) => {
                setProductos(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Lista de Productos
            </h1>

            <div className="space-y-4">
                {productos.map((producto) => (
                    <div
                        key={producto.id_producto || producto.id}
                        className="bg-white shadow-sm border rounded-lg p-4"
                    >
                        <h3 className="text-lg font-semibold text-gray-700">
                            {producto.nombre}
                        </h3>
                        <p className="text-gray-600">
                            Precio: ${producto.precio}
                        </p>
                        <p className="text-gray-600">
                            Stock: {producto.stock}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;
