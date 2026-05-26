// Componente formulario alta de producto presentacional

import styles from './FormularioAltaProducto.module.css';

function FormularioProducto({ datosForm, manejarCambio, manejarCambioImagen, manejarEnvio }) {
    console.log(datosForm);

    return (

        <form className={styles.formStyle} onSubmit={manejarEnvio}>

            <h3>Alta Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <br/>
                <input
                    type="text"
                    placeholder="Ejemplo: planta..."
                    name="nombre" // Atributo para identificar el input
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio ($)</label>
                <br/>
                <input
                    type="number"
                    placeholder="Ejemplo: 1.500"
                    name="precio" // Atributo clave
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock</label>
                <br/>
                <input
                    type="number"
                    placeholder="Ejemplo: 15"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen</label>
                <br/>
                <input
                    type="file"
                    placeholder="Ejemplo: https://..."
                    onChange={manejarCambioImagen}
                />
            </div>
            <button type="submit" className={styles.btn_guardarProd} >Guardar Producto</button>
        </form>
    );
}

export default FormularioProducto;