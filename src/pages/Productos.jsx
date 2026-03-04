import { useEffect, useState } from "react";
import { api } from "../services/api";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: "", precio: "", stock: "", imagen_url: "" });

    const cargarProductos = () => {
        api.get("/api/productos")
            .then((data) => setProductos(data))
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Lista de Productos
            </h1>

            <form
                className="mb-6 flex gap-2 bg-white p-4 rounded-lg shadow-sm"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await api.post("/api/productos", {
                        nombre: form.nombre,
                        precio: parseFloat(form.precio),
                        stock: parseInt(form.stock),
                        imagen_url: form.imagen_url || null,
                        id_categoria: 1,
                    });
                    setForm({ nombre: "", precio: "", stock: "", imagen_url: "" });
                    cargarProductos();
                }}
            >
                <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ form, nombre: e.target.value })} required className="border rounded px-3 py-2 text-sm flex-1" />
                <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={(e) => setForm({ form, precio: e.target.value })} required min="0" step="0.01" className="border rounded px-3 py-2 text-sm w-28" />
                <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ form, stock: e.target.value })} required min="0" className="border rounded px-3 py-2 text-sm w-24" />
                <input name="imagen_url" type="text" placeholder="URL Imagen" value={form.imagen_url} onChange={(e) => setForm({ form, imagen_url: e.target.value })} className="border rounded px-3 py-2 text-sm w-48" />
                <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded">Agregar</button>
            </form>

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
