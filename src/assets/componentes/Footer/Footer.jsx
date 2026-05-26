// Componente Footer
// Contiene información de la empresa y 
// la tarjeta de contacto de los integrantes

import Equipo from '../Equipo/Equipo';
import styles from './Footer.module.css'

function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                
                {/*información de la empresa*/}
                <div className={styles.footer_empresa}>
                    <h3>Vivero Siempre Verde</h3>
                    <p>
                        Tu destino para plantas, macetas e insumos de jardinería en Buenos Aires.
                        Enviamos a todo el país.
                    </p>
                </div>
                <div className={styles.footer_contacto}>
                    <p>Avenida Siempre Viva 1234, CABA</p>
                    <p>(011) 4657-8900</p>
                    <a href="mailto:info@viverosiempreverde.com.ar">info@viverosiempreverde.com.ar</a>
                </div>
            </div>
            <div className={styles.footer_equipo}>
                <Equipo />
            </div>

        </footer>
    )
}

export default Footer;
