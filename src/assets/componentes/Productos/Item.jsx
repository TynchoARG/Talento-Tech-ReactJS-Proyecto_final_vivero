// Es el componente del tercer nivel
// Es el componente presentacional 
// Recibe los nombres

import { useState } from "react";
import styles from './Productos.module.css';

function Item ({nombre, imagen, precio}) {

    const [esFavorito, setEsFavorito] = useState(false)

    const AgregarClick = () => {
        alert(`¡Agregaste ${nombre} al carrito`);
    };

    const MarcarComoFavorito = () => {
            setEsFavorito(!esFavorito)
    };

    return (
        <div className={styles.item_card}>
            <div className={styles.header}>
                <h2>{nombre}</h2>
                <span className={styles.fav} onClick={MarcarComoFavorito}>
                    {esFavorito ? "❤️" : "♡"}
                </span>
            </div>
            <div className={styles.imageWrapper}>
                <img src={imagen} alt={nombre} />
            </div>
            <p className={styles.price}>Precio: ${precio}</p>
            <div className={styles.actions}>
                <button className={styles.btn_detalles}>Detalles</button>
                <button className={styles.btn_agregar} onClick={AgregarClick}>Agregar al carrito</button>
            </div>
        </div>
    )
}
// ♡  ❤️
// ☆  ⭐
export default Item;