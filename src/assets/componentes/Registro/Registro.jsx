import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Registro.module.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );
        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };

  return (
    <div className={styles.auth_container}>
      <h2>Crear una nueva cuenta</h2>
      
      <form onSubmit={handleSubmit} className={styles.form_body}>
        <div className={styles.form_group}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        
        <div className={styles.form_group}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        
        {error && <p className={styles.error_message}>{error}</p>}
        
        <button type="submit" className={styles.btn_registrarse}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;