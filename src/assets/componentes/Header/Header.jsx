//Componente Header
// Contiene el logo y el titulo de la página

import Navbar from '../Navbar/Navbar';
import styles from './Header.module.css'

function Header () {
    return (
        <header className={styles.header}>
            <div className={styles.header_brand}>
                <div className={styles.header_logo}>
                    <img src="/images/LogoClaro.png" alt="Logo Vivero Siempre Verde" />
                </div>
                <div className={styles.header_text_container}>
                    <h1 className={styles.header_title}>Vivero Siempre Verde</h1>
                    <p className={styles.header_subtitle}>Plantas · Macetas · Insumos</p>
                </div>
            </div>
            <Navbar/>
        </header>
    )
}

export default Header;