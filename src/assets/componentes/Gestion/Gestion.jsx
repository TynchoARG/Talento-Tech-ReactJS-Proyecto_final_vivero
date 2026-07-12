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

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (datosForm.nombre.trim() === "" || datosForm.precio <=0 || datosForm.stock <=0) {
      alert ("Por favor, complete todos los datos y verifique que el precio y el stock sea mayor a cero.");
      return; // Detiene la ejecución de la función
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
    <div>
      <h2 style={{textAlign:'center'}}>Gestión de Productos</h2>
      <hr />
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarCambioImagen={manejarCambioImagen}
        manejarEnvio={manejarEnvio}
      />
      <hr />
      <h3 style={{textAlign:'center'}}>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id} style={{marginLeft:'10px'}}>
            {prod.nombre} | ${prod.precio} | Stock: {prod.stock}
            <button onClick={() => handleEditClick(prod)} style={{margin:'10px'}} >Editar</button>
            <button onClick={() => handleDelete(prod.id)} style={{marginBottom:'3px'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionProductos;
