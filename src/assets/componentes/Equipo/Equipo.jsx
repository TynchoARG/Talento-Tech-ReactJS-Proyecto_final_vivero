// Componente que contiene los integrantes del equipo de trabajo

import { useState, useEffect } from 'react';
import styles from './Equipo.module.css';
import TarjetaContacto from './TarjetaContacto';
function Equipo () {
    
    const [integrantes, setIntegrantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/equipo.json')
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar");
            return res.json();
        })
        .then(data => {
            setIntegrantes(data);
            setCargando(false);
        })
        .catch(err =>{
            setError(err.message);
            setCargando(false);
        });
    }, []);

    if (cargando) return <p>Cargando equipo de trabajo ...</p>;

    if (error) return <p>Error: {error}</p>


    return(
       <section className={styles.equipo}>
            <h3>Nuestro Equipo</h3>
            {integrantes.map(user => (
                <TarjetaContacto key={user.id} {...user} />
            ))}
       </section>
    );
}

export default Equipo;