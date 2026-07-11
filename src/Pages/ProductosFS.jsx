// Pagina con el catalogo de productos desde Firebase
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "../assets/componentes/Productos/Productos.module.css";

const ProductosFS = () => {
  //Estado para guardar los productos traidos de Firestore
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosDB = collection(db, "productos-vivero");

    getDocs(productosDB).then((resp) => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    });
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.title}>Catálogo de Productos desde Firebase</h1>
        <p className={styles.subtitle}>
          Descubre nuestras plantas, macetas y accesorios para el hogar con un
          diseño fresco y elegante.
        </p>
      </section>

      <section className={styles.ItemList}>
        {productos.map((prod) => (
          <div key={prod.id} className={styles.item_card}>
            <h2>{prod.nombre}</h2>
            <img className={styles.imageWrapper}
              src={prod.imagen}
              alt={prod.nombre}
            />
            <p className={styles.price}>Categoría: {prod.categoria}</p>
            <p className={styles.price}>Precio: ${prod.precio}</p>
            <p className={styles.price}>Stock: {prod.stock} unidades</p>
           </div>
        ))}
      </section>
    </main>
  );
};

export default ProductosFS;
