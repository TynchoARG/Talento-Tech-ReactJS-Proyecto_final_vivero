// Componente Navbar contiene las paginas de navegación del sitio
// Usa <Link> de react-router-dom para navegación sin recargas

import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useCart } from "../../../Context/CartContext";
import { useAuth } from "../../../Context/AuthContext";

function Navbar() {
  // Usamos el hook personalizado para acceder a la función.
  const { getCartQuantity } = useCart();
  const { user, logout } = useAuth(); //agregamos los datos de autenticación

  const totalItems = getCartQuantity();

  return (
    <nav className={Styles.Navbar}>
      <ul className={Styles.ul}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/carrito">Carrito 🛒 {totalItems} </Link>
        </li>
        {user ? (
          <>
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
            <span>¡Hola, {user.email}!</span>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
