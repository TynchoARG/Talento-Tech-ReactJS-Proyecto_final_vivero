// Componente "cerebro" que maneja el estado y carga los datos.
// Usa UseState para guardar los productos y UseEffect + fetch para traerlos de JSON

import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./Productos.module.css";

function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  /*
  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);
  */

  // Usamos la base de datos de Firestore para cargar los productos.
  // Ya no usamos el JSON

  useEffect(() => {
    const productosDB = collection(db, "productos-vivero");

    getDocs(productosDB)
      .then((resp) => {
        setProductos(
          resp.docs.map((doc) => {
            return { ...doc.data() };
          })
        );  // ← Esto cierra setProductos
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);  // ← Esto cierra useEffect

  if (cargando) return <p>Cargando Productos ... </p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{Mensaje}</h2>
      <div>
        <ItemList productos={productos} />
      </div>
    </div>
  );
}

export default ItemListContainer;
