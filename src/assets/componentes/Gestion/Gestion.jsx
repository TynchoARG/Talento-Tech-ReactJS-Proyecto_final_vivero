import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import FormularioProducto from "../FormularioAltaProducto/FormularioProducto";
import styles from "./Gestion.module.css";

const estadoInicialForm = {
  id: 0,
  nombre: "",
  precio: "",
  imagen: "",
  stock: 0,
  categoria: "",
  destacado: false,
  detalle: "",
};

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [imagenFile, setImagenFile] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    let valorFinal = value;

    if (name === "precio" || name === "stock" || name === "id") {
      valorFinal = Number(value);
    } else if (name === "destacado") {
      valorFinal = value === "true";
    }

    setDatosForm({
      ...datosForm,
      [name]: valorFinal,
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicialForm);
    }
  }, [productoAEditar]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "productos-vivero");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProductos();
  }, []);

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
  };

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar el producto?"
    );

    if (confirmacion) {
      const docRef = doc(db, "productos-vivero", id);
      await deleteDoc(docRef);
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("Producto eliminado");
    }
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (datosForm.nombre.trim() === "" || datosForm.precio <=0 || datosForm.stock <=0) {
      alert ("Por favor, complete todos los datos y verifique que el precio y el stock sea mayor a cero.");
      return;
    }

    try {
      let urlImagen = productoAEditar?.imagen || "";

      if (imagenFile) {
        const apiKey = "e172916cc927adc90ee7abf0373f4a8c";
        const formData = new FormData();
        formData.append("image", imagenFile);

        const respuestaImgbb = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const datosImgbb = await respuestaImgbb.json();

        if (!datosImgbb.success) {
          throw new Error("La subida de la imagen a Imgbb falló.");
        }

        urlImagen = datosImgbb.data.url;
      } else if (!productoAEditar) {
        alert("Por favor, selecciona una imagen para el producto.");
        return;
      }

      const productoFinal = {
        ...datosForm,
        imagen: urlImagen,
      };

      if (productoAEditar) {
        const docRef = doc(db, "productos-vivero", productoAEditar.id);
        await updateDoc(docRef, productoFinal);
        alert("Producto actualizado con éxito.");
      } else {
        await addDoc(collection(db, "productos-vivero"), productoFinal);
        alert("Producto guardado con éxito.");
      }

      setDatosForm(estadoInicialForm);
      setImagenFile(null);
      setProductoAEditar(null);

      const productosRef = collection(db, "productos-vivero");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al guardar el producto. Por favor, intentá de nuevo.");
    }
  };

  return (
    <div className={styles.gestion_container}>
      <h2 style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'Playfair Display, serif', color: 'var(--texto)' }}>
        Gestión de Productos
      </h2>
      
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarCambioImagen={manejarCambioImagen}
        manejarEnvio={manejarEnvio}
      />
      
      {/* Modificados los className para usar el objeto styles */}
      <div className={styles.lista_section}>
        <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif', color: 'var(--texto)' }}>
          Lista de Productos Activos
        </h3>
        
        <div className={styles.productos_tabla}>
          {productos.map((prod) => (
            <div key={prod.id} className={styles.producto_fila}>
              <div className={styles.prod_info}>
                <span className={styles.prod_name}>{prod.nombre}</span>
                <span className={styles.prod_meta}>Precio: <strong>${prod.precio}</strong></span>
                <span className={styles.prod_meta}>Stock: <strong>{prod.stock} u.</strong></span>
              </div>
              <div className={styles.prod_acciones}>
                <button onClick={() => handleEditClick(prod)} className={styles.btn_editar}>Editar</button>
                <button onClick={() => handleDelete(prod.id)} className={styles.btn_eliminar}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionProductos;