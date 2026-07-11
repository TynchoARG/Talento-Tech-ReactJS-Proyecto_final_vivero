import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  /*
    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id]);
    */

  useEffect(() => {
    if (!id) return; // Si no existe, no hace nada

    const queryId = query(
      collection(db, "productos-vivero"),
      where("id", "==", Number(id)),
    );

    getDocs(queryId)
      .then((resp) => {
        if (resp.empty) {
          console.log("No se encontró el producto");
          return;
        }

        setProducto(resp.docs[0].data());
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
      });
  }, [id]);

  if (!producto) {
    return <h2>Cargando detalle del producto ...</h2>;
  }

  if (!producto.id) {
    return <h2>Producto no encontrado.</h2>;
  }

  return (
    <div>
      <h2>Detalle del Producto: {producto.nombre}</h2>
      <p>
        Mostrando información del producto con ID: <strong>{id}</strong>
      </p>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        width="200"
        height="200"
      />
      <h3>${producto.precio}</h3>
      <p>{producto.detalle}</p>
      <Link to={"/productos"}>Volver al catalogo</Link>
    </div>
  );
};

export default ProductoDetalle;
