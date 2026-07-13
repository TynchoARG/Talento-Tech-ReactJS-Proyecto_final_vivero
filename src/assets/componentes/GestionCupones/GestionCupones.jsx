import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styles from "./GestionCupones.module.css"; 

const estadoInicial = {
    codigo: "",
    descuento: ""
};

function GestionCupones () {
    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    const obtenerCupones = async () => {
        try {
            const respuesta = await getDocs(collection(db, "cupones-vivero"));
            const lista = respuesta.docs.map ((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCupones(lista); 
        }
        catch (error) {
            console.error("Error al obtener los cupones: ", error);
            alert("Ocurrió un error al cargar los cupones.");
        }
    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    const manejarCambio = (e) => {
        setDatosForm ({
            ...datosForm,
            [e.target.name]: e.target.value
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos.");
            return;
        }

        try {
            if (cuponAEditar) { 
                await updateDoc(
                    doc(db, "cupones-vivero", cuponAEditar.id),
                    {
                        codigo: datosForm.codigo,
                        descuento: Number(datosForm.descuento)
                    }
                );
                alert("Cupón actualizado con éxito.");
            } else {
                await addDoc(
                    collection(db, "cupones-vivero"),
                    {
                        codigo: datosForm.codigo,
                        descuento: Number(datosForm.descuento)
                    }
                );
                alert("Cupón creado con éxito.");
            }

            setDatosForm(estadoInicial);
            setCuponAEditar(null);
            obtenerCupones();
        } catch (error) {
            console.error("Error al guardar el cupón: ", error);
            alert("Hubo un error al procesar el cupón.");
        }
    };

    const editarCupon = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento
        });
    };

    const eliminarCupon = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este cupón?");
        if (!confirmacion) return;

        await deleteDoc(doc(db, "cupones-vivero", id));
    
        if (cuponAEditar?.id === id) {
            setCuponAEditar(null);
            setDatosForm(estadoInicial);
        }
        obtenerCupones();
        alert("Cupón eliminado.");
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div className={styles.gestion_container}>
            <h2 className={styles.main_title}>Administración de Cupones de Descuento</h2>
            
            {/* Formulario en tarjeta compacta */}
            <form className={styles.formStyle} onSubmit={manejarEnvio}>
                <h3>{cuponAEditar ? "Editar Cupón Activo" : "Crear Nuevo Cupón"}</h3>
                
                <div className={styles.grid_campos}>
                    <div className={styles.campo_grupo}>
                        <label>Código del Cupón</label>
                        <input 
                            type="text"
                            name="codigo"
                            placeholder="Ej: REGALOSORPRESA"
                            required
                            value={datosForm.codigo}
                            onChange={manejarCambio} 
                        />
                    </div>

                    <div className={styles.campo_grupo}>
                        <label>Descuento (%)</label>
                        <input 
                            type="number"
                            name="descuento"
                            placeholder="Ej: 15"
                            required
                            min="1"
                            max="100"
                            value={datosForm.descuento}
                            onChange={manejarCambio}
                        />
                    </div>
                </div>

                <div className={styles.form_acciones}>
                    <button type="submit" className={styles.btn_guardar}>
                        {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                    </button>

                    {cuponAEditar && (
                        <button type="button" className={styles.btn_cancelar} onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Listado consistente con filas espaciadas */}
            <div className={styles.lista_section}>
                <h3 className={styles.lista_title}>Listado de Cupones Activos</h3>

                <div className={styles.cupones_tabla}>
                    {cupones.map((cupon) => (
                        <div key={cupon.id} className={styles.cupon_fila}>
                            <div className={styles.cupon_info}>
                                <span className={styles.cupon_code}>
                                    Código: <strong>{cupon.codigo}</strong>
                                </span>
                                <span className={styles.cupon_discount}>
                                    Descuento: <strong>{cupon.descuento}%</strong>
                                </span>
                            </div>
                            <div className={styles.cupon_acciones}>
                                <button onClick={() => editarCupon(cupon)} className={styles.btn_editar}>
                                    Editar
                                </button>
                                <button onClick={() => eliminarCupon(cupon.id)} className={styles.btn_eliminar}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GestionCupones;