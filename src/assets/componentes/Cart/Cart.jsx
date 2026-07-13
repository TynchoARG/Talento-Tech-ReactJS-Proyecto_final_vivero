import { useCart } from "../../../Context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css"; // 👈 Importación modular conectada

const Cart = () => {
  const { cart, cleanCart, getCartTotal, removeItem } = useCart();

  // Vista cuando el carrito está completamente vacío
  if (cart.length === 0) {
    return (
      <div className={styles.carrito_vacio}>
        <h2>El carrito está vacío 🛒</h2>
        <p>Agregá hermosas plantas o insumos para continuar con la compra.</p>
        <Link to="/productos" className={styles.btn_volver}>
          Ver Productos
        </Link>
      </div>
    );
  }

  // Vista cuando hay productos en el carrito
  return (
    <div className={styles.cart_container}>
      <h1 className={styles.cart_title}>Carrito de Compras</h1>
      
      {/* Contenedor principal de los productos agregados */}
      <div className={styles.cart_list}>
        {cart.map((item) => (
          <div key={item.id} className={styles.cart_item}>
            <div className={styles.item_details}>
              <h4 className={styles.item_name}>{item.nombre}</h4>
              <div className={styles.item_meta_grid}>
                <span className={styles.item_meta}>Cant: <strong>{item.quantity}</strong></span>
                <span className={styles.item_meta}>Precio: <strong>${item.precio}</strong></span>
                <span className={styles.item_subtotal}>Subtotal: <strong>${item.precio * item.quantity}</strong></span>
              </div>
            </div>
            
            <button onClick={() => removeItem(item.id)} className={styles.btn_eliminar}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Bloque resumen del total y acciones de compra */}
      <div className={styles.cart_summary}>
        <h3 className={styles.total_text}>
          Total a pagar: <span>${getCartTotal()}</span>
        </h3>
        
        <div className={styles.summary_actions}>
          <button onClick={cleanCart} className={styles.btn_vaciar}>
            Vaciar Carrito
          </button>
          
          <Link to="/" onClick={() => alert(`Gracias por comprar`)} className={styles.btn_finalizar}>
            Finalizar Compra      
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;