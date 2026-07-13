// Componente Navbar contiene las paginas de navegación del sitio
// Usa <Link> de react-router-dom para navegación sin recargas

// Componente Navbar actualizado
import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useCart } from "../../../Context/CartContext";
import { useAuth } from "../../../Context/AuthContext";

function Navbar() {
  const { getCartQuantity } = useCart();
  const { user, logout } = useAuth();

  const totalItems = getCartQuantity();

  return (
    <nav className={Styles.Navbar}>
      {/* GRUPO 1: Secciones para usuarios comunes */}
      <ul className={Styles.ul_comun}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/carrito">Carrito 🛒 {totalItems} </Link>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      {/* GRUPO 2: Bloque exclusivo de Admin */}
      {user && (
        <ul className={Styles.ul_admin}>
          {(user.rol === "admin" ||
            user.email?.toLowerCase() === "admin@gmail.com") && (
            <>
              <li>
                <Link to="/cupones">Gestión de Cupones</Link>
              </li>
              <li>
                <Link to="/gestion">Gestión de Productos</Link>
              </li>
            </>
          )}
          <li className={Styles.user_saludo}>
            <span>¡Hola, {user.email}!</span>
          </li>
          <li>
            <button className={Styles.logout_btn} onClick={logout}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;