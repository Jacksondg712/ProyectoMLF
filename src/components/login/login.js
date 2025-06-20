import React, { useState } from 'react';
import { User, Shield, Lock, Mail } from 'lucide-react';

// CSS en línea como objeto para mantener todo en un archivo
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#666',
    marginBottom: '40px',
    fontSize: '1.1rem'
  },
  userTypeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px'
  },
  userTypeButton: {
    padding: '20px',
    border: '2px solid #e0e0e0',
    borderRadius: '15px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  userTypeButtonActive: {
    borderColor: '#667eea',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
  },
  formGroup: {
    textAlign: 'left',
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#667eea',
    outline: 'none'
  },
  loginButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    marginTop: '10px'
  },
  loginButtonHover: {
    transform: 'translateY(-2px)'
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '10px',
    textAlign: 'center'
  }
};

const Login = ({ onNavigate }) => {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!selectedUserType) {
      setError('Por favor selecciona un tipo de usuario');
      return;
    }

    if (!credentials.email || !credentials.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, solo validamos que los campos estén completos

    if (selectedUserType === 'trabajador') {
      // Guardar información del usuario en localStorage
      localStorage.setItem('userType', 'trabajador');
      localStorage.setItem('userEmail', credentials.email);
      
      // Redirigir al formulario (componente 2)
      if (onNavigate) {
        onNavigate('formulario');
      }
    } else if (selectedUserType === 'administrador') {
      // Guardar información del usuario en localStorage
      localStorage.setItem('userType', 'administrador');
      localStorage.setItem('userEmail', credentials.email);
      
      // Redirigir al dashboard (componente 3)
      if (onNavigate) {
        onNavigate('dashboard');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Bienvenido</h1>
        <p style={styles.subtitle}>Selecciona tu tipo de usuario</p>
        
        <div style={styles.userTypeContainer}>
          <div
            style={{
              ...styles.userTypeButton,
              ...(selectedUserType === 'trabajador' ? styles.userTypeButtonActive : {})
            }}
            onClick={() => handleUserTypeSelect('trabajador')}
          >
            <User size={24} />
            <span>Trabajador</span>
          </div>
          
          <div
            style={{
              ...styles.userTypeButton,
              ...(selectedUserType === 'administrador' ? styles.userTypeButtonActive : {})
            }}
            onClick={() => handleUserTypeSelect('administrador')}
          >
            <Shield size={24} />
            <span>Administrador</span>
          </div>
        </div>

        <div>
          <div style={styles.formGroup}>
            <div style={styles.label}>
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Correo Electrónico
            </div>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {})
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.label}>
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Contraseña
            </div>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              style={{
                ...styles.input,
                ...(focusedInput === 'password' ? styles.inputFocus : {})
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Iniciar Sesión
          </button>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;