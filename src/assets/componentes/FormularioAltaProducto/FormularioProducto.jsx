// Componente formulario alta de producto presentacional

import styles from "./FormularioAltaProducto.module.css";

function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarCambioImagen,
  manejarEnvio,
}) {
  console.log(datosForm);

  return (
    <form className={styles.formStyle} onSubmit={manejarEnvio}>
      <h3>Alta Nuevo Producto</h3>
      <div>
        <label>Id del producto</label> <br />
        <input
          type="number"
          placeholder="08"
          name="id" // Atributo clave
          value={datosForm.id}
          onChange={manejarCambio}
        />{" "}
        <br />
        <label>Nombre del Producto</label> <br />
        <input
          type="text"
          placeholder="Ejemplo: planta..."
          name="nombre" // Atributo para identificar el input
          value={datosForm.nombre}
          onChange={manejarCambio}
        />{" "}
        <br />
        <label>Categoría</label> <br />
        <select
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        >
          <option value="">-- Seleccioná una categoría --</option>
          <option value="plantas">Plantas</option>
          <option value="macetas">Macetas</option>
          <option value="insumos">Insumos</option>
        </select>{" "}
        <br />
        <label>Precio ($)</label> <br />
        <input
          type="number"
          placeholder="Ejemplo: 1.500"
          name="precio" // Atributo clave
          value={datosForm.precio}
          onChange={manejarCambio}
        />{" "}
        <br />
        <label>Stock</label> <br />
        <input
          type="number"
          placeholder="Ejemplo: 15"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />{" "}
        <br />
        <label>Destacado</label> <br />
        <select
          name="destacado"
          value={datosForm.destacado}
          onChange={manejarCambio}
        >
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>{" "}
        <br />
        
        <label>Detalle</label> <br />
        <textarea
          placeholder="Descripción breve del producto"
          name="detalle"
          value={datosForm.detalle}
          onChange={manejarCambio}
          rows="4" // Esto define la altura inicial en líneas de texto
          style={{ resize: "vertical" }} // Opcional: permite estirarlo solo para abajo y no romper el diseño
        />
      </div>
      <div>
        <label>Imagen</label>
        <br />
        <input
          type="file"
          placeholder="Ejemplo: https://..."
          onChange={manejarCambioImagen}
        />
      </div>
      <button type="submit" className={styles.btn_guardarProd}>
        Guardar Producto
      </button>
    </form>
  );
}

export default FormularioProducto;
