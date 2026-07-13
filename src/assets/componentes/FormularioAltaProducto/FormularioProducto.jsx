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
    
    <div className={styles.grid_campos}>
      <div className={styles.campo_grupo}>
        <label>Id del producto</label>
        <input type="number" placeholder="08" required name="id" value={datosForm.id} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Nombre del Producto</label>
        <input type="text" placeholder="Ejemplo: planta..." required name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Categoría</label>
        <select name="categoria" value={datosForm.categoria} onChange={manejarCambio}>
          <option value="">-- Seleccioná una categoría --</option>
          <option value="plantas">Plantas</option>
          <option value="macetas">Macetas</option>
          <option value="insumos">Insumos</option>
        </select>
      </div>

      <div className={styles.campo_grupo}>
        <label>Precio ($)</label>
        <input type="number" placeholder="Ejemplo: 1500" name="precio" value={datosForm.precio} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Stock</label>
        <input type="number" placeholder="Ejemplo: 15" name="stock" value={datosForm.stock} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Destacado</label>
        <select name="destacado" value={datosForm.destacado} onChange={manejarCambio}>
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>
      </div>

      {/* Estos dos van abajo ocupando todo el ancho */}
      <div className={styles.campo_ancho_completo}>
        <label>Detalle</label>
        <textarea placeholder="Descripción breve del producto" name="detalle" value={datosForm.detalle} onChange={manejarCambio} rows="3" style={{ resize: "vertical" }} />
      </div>

      <div className={styles.campo_ancho_completo}>
        <label>Imagen</label>
        <input type="file" onChange={manejarCambioImagen} />
      </div>
    </div>

    <button type="submit" className={styles.btn_guardarProd}>
      Guardar Producto
    </button>
  </form>
);return (
  <form className={styles.formStyle} onSubmit={manejarEnvio}>
    <h3>Alta Nuevo Producto</h3>
    
    <div className={styles.grid_campos}>
      <div className={styles.campo_grupo}>
        <label>Id del producto</label>
        <input type="number" placeholder="08" required name="id" value={datosForm.id} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Nombre del Producto</label>
        <input type="text" placeholder="Ejemplo: planta..." required name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Categoría</label>
        <select name="categoria" value={datosForm.categoria} onChange={manejarCambio}>
          <option value="">-- Seleccioná una categoría --</option>
          <option value="plantas">Plantas</option>
          <option value="macetas">Macetas</option>
          <option value="insumos">Insumos</option>
        </select>
      </div>

      <div className={styles.campo_grupo}>
        <label>Precio ($)</label>
        <input type="number" placeholder="Ejemplo: 1500" name="precio" value={datosForm.precio} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Stock</label>
        <input type="number" placeholder="Ejemplo: 15" name="stock" value={datosForm.stock} onChange={manejarCambio} />
      </div>

      <div className={styles.campo_grupo}>
        <label>Destacado</label>
        <select name="destacado" value={datosForm.destacado} onChange={manejarCambio}>
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>
      </div>

      {/* Estos dos van abajo ocupando todo el ancho */}
      <div className={styles.campo_ancho_completo}>
        <label>Detalle</label>
        <textarea placeholder="Descripción breve del producto" name="detalle" value={datosForm.detalle} onChange={manejarCambio} rows="3" style={{ resize: "vertical" }} />
      </div>

      <div className={styles.campo_ancho_completo}>
        <label>Imagen</label>
        <input type="file" onChange={manejarCambioImagen} />
      </div>
    </div>

    <button type="submit" className={styles.btn_guardarProd}>
      Guardar Producto
    </button>
  </form>
);
}

export default FormularioProducto;
