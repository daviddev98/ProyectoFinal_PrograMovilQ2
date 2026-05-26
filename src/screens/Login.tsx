import React, { useState } from 'react';
// @ts-ignore
import './Login.css';
const DOMINIOS_VALIDOS = ['@gmail.com', '@unitec.edu', '@hotmail.com', '@outlook.com'];

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.length > password.length) {
      const nuevos = valor.slice(password.length).replace(/\*/g, '');
      setPassword(password + nuevos);
    } else {
      setPassword(password.slice(0, valor.length));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const dominioValido = DOMINIOS_VALIDOS.some((d) => usuario.endsWith(d));
    if (!dominioValido) {
      setError('El correo debe ser @gmail.com, @unitec.edu, @hotmail.com o @outlook.com.');
      return;
    }

    if (password.length <= 8) {
      setError('La contraseña debe tener más de 8 caracteres.');
      return;
    }

    alert('Inicio de sesión exitoso');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label className="login-title">Iniciar sesión</label>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="login-input"
          autoComplete="username"
        />

        <input
          type="text"
          placeholder="Contraseña"
          value={'*'.repeat(password.length)}
          onChange={handlePasswordChange}
          className="login-input"
          autoComplete="off"
        />

        {error && <span className="login-error">{error}</span>}

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
