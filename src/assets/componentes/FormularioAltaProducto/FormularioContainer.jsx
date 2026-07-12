import { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    id: 0,
    nombre: "",
    precio: "",
    stock: 0,
    categoria: "",
    destacado: false,
    detalle: "",
  });

  const [imagenFile, setImagenFile] = useState(null);

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

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (datosForm.nombre.trim() === "" || datosForm.precio <=0 || datosForm.stock <=0) {
      alert ("Por favor, complete todos los datos y verifique que el precio y el stock sea mayor a cero.");
      return; // Detiene la ejecución de la función
    }

    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    const apiKey = "e172916cc927adc90ee7abf0373f4a8c";
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        const productoCompleto = {
          ...datosForm,
          imagen: datosImgbb.data.url,
        };

        const db = getFirestore();
        const productosCollection = collection(db, "productos-vivero");
        await addDoc(productosCollection, productoCompleto);
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
    />
  );
}

export default FormularioContainer;