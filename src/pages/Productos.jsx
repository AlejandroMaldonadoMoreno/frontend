import { useEffect, useState } from "react";
import { api } from "../services/api";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: "", precio: "", stock: "", imagen_url: "", youtube_id: "" });

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
                className="mb-6 bg-white p-4 sm:p-5 rounded-lg shadow-sm border"
                onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        await api.post("/api/productos", {
                            nombre: form.nombre,
                            precio: parseFloat(form.precio) || 0,
                            stock: parseInt(form.stock) || 0,
                            imagen_url: form.imagen_url || null,
                            id_categoria: 1,
                            youtube_id: form.youtube_id || null
                        });

                        setForm({ nombre: "", precio: "", stock: "", imagen_url: "", youtube_id: "" });
                        cargarProductos();

                    } catch (error) {
                        console.error("Error al crear el producto:", error);
                        alert("Error al enviar. Revisa la consola (F12) para más detalles.");
                    }
                }}
            >

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
                    <div className="lg:col-span-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                        <input
                            name="nombre"
                            type="text"
                            placeholder="Ej. Mochila"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            required
                            className="border rounded-md px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Precio</label>
                        <input
                            name="precio"
                            type="number"
                            placeholder="0.00"
                            value={form.precio}
                            onChange={(e) => setForm({ ...form, precio: e.target.value })}
                            required
                            min="0"
                            step="0.01"
                            className="border rounded-md px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            placeholder="0"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            required
                            min="0"
                            className="border rounded-md px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Imagen (URL)</label>
                        <input
                            name="imagen_url"
                            type="text"
                            placeholder="https://..."
                            value={form.imagen_url}
                            onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
                            className="border rounded-md px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">YouTube ID</label>
                        <input
                            name="youtube_id"
                            type="text"
                            placeholder="ID"
                            value={form.youtube_id}
                            onChange={(e) => setForm({ ...form, youtube_id: e.target.value })}
                            className="border rounded-md px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="lg:col-span-12 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {productos.map((producto) => (
                    <div
                        key={producto.id_producto || producto.id}
                        className="bg-white shadow-sm border rounded-lg overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="bg-gray-50">
                                {producto.youtube_id ? (
                                    <div className="aspect-video w-full">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${producto.youtube_id}`}
                                            title={`YouTube video ${producto.youtube_id}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : producto.imagen_url ? (
                                    <img
                                        className="w-full h-56 md:h-full object-cover"
                                        src={producto.imagen_url}
                                        alt={producto.nombre}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="h-56 md:h-full flex items-center justify-center text-sm text-gray-400">
                                        Sin media
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {producto.nombre}
                                </h3>
                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-700">Precio:</span> ${producto.precio}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Stock:</span> {producto.stock}
                                    </p>
                                </div>

                                {(producto.imagen_url || producto.youtube_id) ? (
                                    <div className="mt-3 text-xs text-gray-400 break-all">
                                        {producto.youtube_id ? `youtube_id: ${producto.youtube_id}` : `imagen_url: ${producto.imagen_url}`}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;
