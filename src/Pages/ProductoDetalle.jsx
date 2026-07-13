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
import styles from "./ProductoDetalle.module.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) {
      setCargando(false);
      return;
    }

    const cargarProducto = async () => {
      try {
        const docRef = doc(db, "productos-vivero", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const datos = docSnap.data();
          setProducto({ ...datos, id: datos.id ?? docSnap.id });
          setCargando(false);
          return;
        }

        const queryId = query(
          collection(db, "productos-vivero"),
          where("id", "==", Number(id)),
        );

        const resp = await getDocs(queryId);

        if (!resp.empty) {
          const productoEncontrado = resp.docs[0];
          const datos = productoEncontrado.data();
          setProducto({ ...datos, id: datos.id ?? productoEncontrado.id });
        } else {
          console.log("No se encontró el producto");
          setProducto(null);
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  // Mensajes de carga/error consistentes con tus tarjetas
  if (cargando) {
    return <h2 className={styles.mensaje_estado}>Cargando detalle del producto...</h2>;
  }

  if (!producto) {
    return <h2 className={styles.mensaje_estado}>Producto no encontrado.</h2>;
  }

  return (
    <div className={styles.detalle_container}>
      <div className={styles.detalle_card}>
        
        {/* Contenedor izquierdo: Imagen elástica */}
        <div className={styles.imagen_wrapper}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
          />
        </div>
        
        {/* Contenedor derecho: Información del Producto */}
        <div className={styles.info_wrapper}>
          <span className={styles.categoria_tag}>{producto.categoria}</span>
          <h2>{producto.nombre}</h2>
          <h3 className={styles.precio_tag}>${producto.precio}</h3>
          
          <div className={styles.descripcion_bloque}>
            <h4>Descripción</h4>
            <p>{producto.detalle || "Este producto no cuenta con una descripción detallada todavía."}</p>
          </div>
          
          <div className={styles.acciones_wrapper}>
            <Link to="/productos" className={styles.btn_volver}>
              Volver al catálogo
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductoDetalle;