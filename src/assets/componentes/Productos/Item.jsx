// Es el componente del tercer nivel
// Es el componente presentacional 
// Recibe los nombres

import { useState } from "react";
import { useCart } from "../../../Context/CartContext";
import styles from './Productos.module.css';
import { Link } from "react-router-dom";

function Item ({id, nombre, imagen, precio}) {

    const producto = {id, nombre, imagen, precio};

    const [cantidad, setCantidad] = useState(0);

    const [esFavorito, setEsFavorito] = useState(false)

    const AgregarClick = () => {
        alert(`¡Agregaste ${nombre} al carrito`);
    };

    const MarcarComoFavorito = () => {
            setEsFavorito(!esFavorito)
    };

//Lógica del carrito
    const { addToCart } = useCart(); //Esta es la función del contexto

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        alert('Agregaste ${cantidad} unidades de ${nombre} al carrito.');
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
                <Link to={`/producto/${id}`} className={styles.btn_detalles}>Detalles </Link>

                <button className={styles.btn_agregar} onClick={handleAddToCart}>Agregar {cantidad} al carrito</button>
            </div>
        </div>
    )
}
// ♡  ❤️
// ☆  ⭐
export default Item;