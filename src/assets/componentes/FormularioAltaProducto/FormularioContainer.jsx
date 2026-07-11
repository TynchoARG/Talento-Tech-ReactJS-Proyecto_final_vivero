// Componente contenedor del formulario de alta de producto

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

    // Convertimos el valor según el tipo de campo
    let valorFinal = value;

    if (name === 'precio' || name === 'stock' || name === 'id') {
        valorFinal = Number(value); // Asegura que Firebase guarde números
    } else if (name === 'destacado') {
        valorFinal = value === 'true'; // Convierte el string "true" en el booleano true
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

    // Se valida que el usuario haya seleccionado una imagen
    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    // Lógica para subir la imagen a Imgbb
    const apiKey = "e172916cc927adc90ee7abf0373f4a8c";
    const formData = new FormData();
    formData.append("image", imagenFile);
    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const datosImgbb = await respuestaImgbb.json();
      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

        // Unimos la URL de la imagen con el resto de los datos del formulario
        const productoCompleto = {
          ...datosForm,

          // Se agrega la URL obtenida
          imagen: datosImgbb.data.url,
        };
        console.log(
          "Enviando los siguientes datos COMPLETOS a Firebase:",
          productoCompleto,
        );

        // Obtenemos la instancia de la base de datos
        const db = getFirestore();

        // Apuntamos a la colección "productos-vivero" (si no existe, se crea)
        const productosCollection = collection(db, "productos-vivero");

        // Agregamos el nuevo documento a la colección
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
