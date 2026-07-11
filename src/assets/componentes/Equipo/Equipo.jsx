// Componente que contiene los integrantes del equipo de trabajo

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/config';
import styles from './Equipo.module.css';
import TarjetaContacto from './TarjetaContacto';

function Equipo () {
    
    const [integrantes, setIntegrantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    /*
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
    */

    // Usamos la base de datos de Firestore para cargar el equipo de trabajo.
    // Ya no usamos el JSON

    useEffect(() => {
        const equipoDB = collection(db, "equipo-vivero");
    
        getDocs(equipoDB)
          .then((resp) => {
            setIntegrantes(
              resp.docs.map((doc) => {
                return { ...doc.data() };
              })
            );  // ← Esto cierra setIntegrantes
            setCargando(false);
          })
          .catch((error) => {
            setError(error.message);
            setCargando(false);
          })
          .finally(() => {
            setCargando(false);
          });
      }, []);  // ← Esto cierra useEffect

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