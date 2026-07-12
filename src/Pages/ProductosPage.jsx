// Pagina con el catalogo de productos

import ItemListContainer from "../assets/componentes/Productos/ItemListContainer";
import FormularioContainer from "../assets/componentes/FormularioAltaProducto/FormularioContainer";
import styles from "./ProductosPage.module.css";

function ProductosPage ({ Mensaje }) {
    return (
        <main className={styles.page}>
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>Catálogo de Productos</h1>
                <p className={styles.subtitle}>
                    Descubre nuestras plantas, macetas y accesorios para el hogar con un diseño fresco y elegante.
                </p>
            </section>

            <section className={styles.productosContainer}>
                <ItemListContainer Mensaje={Mensaje} />
            </section>
{/*
            <section className={styles.formAltaProdContainaer}>
                <FormularioContainer/>
            </section>*/}
        </main>
    )
}

export default ProductosPage;