// Componente Navbar contiene las paginas de navegación del sitio
// Usa <Link> de react-router-dom para navegación sin recargas

import { Link } from 'react-router-dom';
import Styles from './Navbar.module.css';
import { useCart } from '../../../Context/CartContext';

function Navbar () {
// Usamos el hook personalizado para acceder a la función.
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return(
        <nav className={Styles.Navbar}>
            <ul className={Styles.ul}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/carrito">Carrito 🛒 {totalItems} </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;