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

  if (cargando) {
    return <h2>Cargando detalle del producto ...</h2>;
  }

  if (!producto) {
    return <h2>Producto no encontrado.</h2>;
  }

  return (
    <div
      style={{ display: "column", padding: "20px"}}
    >
      <div style={{backgroundColor:"#cbc6c6", width:'500px'}}>
        <h2>Detalle del Producto: {producto.nombre}</h2>
        <p>
          Mostrando información del producto con ID: <strong>{id}</strong>
        </p>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          width="200"
          height="200"
          style={{ borderRadius: "10px", alignContent:'center'}}
        />
        <h3>${producto.precio}</h3>
        <p>{producto.detalle}</p>
        <Link to={"/productos"}>Volver al catalogo</Link>
      </div>
    </div>
  );
};

export default ProductoDetalle;
