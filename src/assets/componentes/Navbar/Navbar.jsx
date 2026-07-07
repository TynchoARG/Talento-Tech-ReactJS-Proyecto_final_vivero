// Componente Navbar contiene las paginas de navegación del sitio
// Usa <Link> de react-router-dom para navegación sin recargas

import { Link } from 'react-router-dom';
import Styles from './Navbar.module.css';

function Navbar () {
    return(
        <nav className={Styles.Navbar}>
            <ul className={Styles.ul}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;