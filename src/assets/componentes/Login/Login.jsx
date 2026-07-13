import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("¡Inicio de sesión exitoso!");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error en el login:", error.code, error.message);
        alert("Error: " + error.message);
      });
  };

  return (
    <div className={styles.formStyle}>
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleLogin} className={styles.inputs_container}>
        <input
          type="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.btn_ingresar}>Ingresar</button>
      </form>
      
      <p className={styles.switch_text}>
        ¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;