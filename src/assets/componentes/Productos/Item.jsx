// Es el componente del tercer nivel
// Es el componente presentacional 
// Recibe los nombres

import { useState } from "react";
import { useCart } from "../../../Context/CartContext";
import styles from './Productos.module.css';
import { Link } from "react-router-dom";

function Item ({id, nombre, imagen, precio, stock}) {

    const producto = {id, nombre, imagen, precio, stock};

    const [cantidad, setCantidad] = useState(0);

    const [esFavorito, setEsFavorito] = useState(false)


    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad((prev) => prev + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad((prev) => prev - 1);
        }
    };
    
    const AgregarClick = () => {
        alert(`¡Agregaste ${nombre} al carrito`);
    };

    const MarcarComoFavorito = () => {
            setEsFavorito(!esFavorito)
    };

//Lógica del carrito
    const { addToCart, getCantidadActual} = useCart();

    const CantidadActual = getCantidadActual(producto.id);

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
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
            <p className={styles.price}>Stock disponible: {stock}</p>
            <p className={styles.price}>Cantidad Actual: {CantidadActual}</p>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'10px 0' }}>
                <button onClick={decrementar}>-</button>
                <p style={{margin:'0 10px', fontWeight:'bold'}}>{cantidad}</p>
                <button onClick={incrementar}>+</button>
            </div>
            <div className={styles.actions}>
                <Link to={`/producto/${id}`} className={styles.btn_detalles}>Detalles </Link>

                <button className={styles.btn_agregar} onClick={handleAddToCart}>Agregar {cantidad} unidades al carrito</button>
            </div>
        </div>
    )
}
// ♡  ❤️
// ☆  ⭐
export default Item;