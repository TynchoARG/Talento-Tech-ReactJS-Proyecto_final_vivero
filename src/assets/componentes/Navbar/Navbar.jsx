// Componente Navbar unificado
import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useCart } from "../../../Context/CartContext";
import { useAuth } from "../../../Context/AuthContext";

function Navbar() {
  const { getCartQuantity } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getCartQuantity();

  const isAdmin = user && (user.rol === "admin" || user.email?.toLowerCase() === "admin@gmail.com");

  return (
    // Si es admin, le agregamos una clase extra (.NavbarAdmin) para activar las dos líneas
    <nav className={`${Styles.Navbar} ${isAdmin ? Styles.NavbarAdmin : ""}`}>
      
      {/* GRUPO 1: Todos los links de navegación juntos (Público + Admin si corresponde) */}
      <ul className={Styles.nav_links}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/carrito">Carrito 🛒 {totalItems} </Link>
        </li>
        
        {/* Si es admin, sus links de gestión se suman acá al lado de los comunes */}
        {isAdmin && (
          <>
            <li>
              <Link to="/cupones">Gestión de Cupones</Link>
            </li>
            <li>
              <Link to="/gestion">Gestión de Productos</Link>
            </li>
          </>
        )}

        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      {/* GRUPO 2: Información de Sesión (Siempre alineado al final) */}
      {user && (
        <div className={Styles.user_session}>
          <span className={Styles.user_saludo}>¡Hola, {user.email}!</span>
          <button className={Styles.logout_btn} onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;