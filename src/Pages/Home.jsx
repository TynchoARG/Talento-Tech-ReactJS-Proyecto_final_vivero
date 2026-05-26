// Pagina de inicio

import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home () {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroCard}>
                    
                    {/* Bloque Izquierdo: Textos y Botón */}
                    <div className={styles.textContainer}>
                        <p className={styles.pretitle}>Tu vivero online</p>
                        <h1 className={styles.title}>Tu jardín empieza acá</h1>
                        <p className={styles.description}>
                            Plantas de interior y exterior, macetas artesanales e insumos de jardinería. Todo lo que necesitás para darle vida a tu espacio.
                        </p>
                        <Link className={styles.ctaButton} to="/productos">
                            ver Catálogo completo
                        </Link>
                    </div>

                    {/* Bloque Derecho: Imagen */}
                    <div className={styles.imageContainer}>
                        <img 
                            src="/images/Jardin.jpg" 
                            alt="Jardín hermoso con variedad de plantas" 
                            className={styles.heroImage} 
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;