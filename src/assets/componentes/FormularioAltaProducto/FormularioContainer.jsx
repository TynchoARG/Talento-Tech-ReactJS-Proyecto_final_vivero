// Componente contenedor del formulario de alta de producto

import { useState } from "react";
import FormularioProducto from "./FormularioProducto";

function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
    });

    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        // Se valida que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        // Lógica para subir la imagen a Imgbb 
        const apiKey = 'e172916cc927adc90ee7abf0373f4a8c';
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                
                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                 
                // Se agrega la URL obtenida
                    urlImagen: datosImgbb.data.url
                };
                console.log('Enviando los siguientes datos COMPLETOS a la API:',
                    productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
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
    )
}

export default FormularioContainer;