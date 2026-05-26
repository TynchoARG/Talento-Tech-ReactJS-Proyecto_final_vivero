// Componente encargado de renderizar la tarjeta de
// Contacto de cada integrante.

import styles from './TarjetaContacto.module.css';

function TarjetaContacto ({nombre, puesto, descripcion, imagen}) {
    return (
        <div className={styles.cardContainer}>
            <img
                className={styles.cardImage} 
                src={imagen}
                alt={nombre}
            />
            <div className={styles.cardText}>
                <h6>{nombre}</h6>
                <p>{puesto}</p>
                <small>{descripcion}</small>
            </div>
        </div>
    );
}

export default TarjetaContacto;