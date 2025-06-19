import React, { useState } from 'react';
import './login.css';

// Componente de Dashboard para Trabajadores
const WorkerDashboard = ({ user, onLogout }) => (
  <div className="dashboard-container worker-dashboard">
    <div className="dashboard-content">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Panel de Trabajador</h1>
          <button
            onClick={onLogout}
            className="logout-button"
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="welcome-section worker-welcome">
          <h2 className="welcome-title">
            Bienvenido, {user.username}
          </h2>
          <p className="welcome-description">
            Acceso de trabajador - Funcionalidades limitadas disponibles
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Componente de Dashboard para Administradores
const AdminDashboard = ({ user, onLogout }) => (
  <div className="dashboard-container admin-dashboard">
    <div className="dashboard-content">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Panel de Administrador</h1>
          <button
            onClick={onLogout}
            className="logout-button"
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="welcome-section admin-welcome">
          <h2 className="welcome-title">
            Bienvenido, {user.username}
          </h2>
          <p className="welcome-description">
            Acceso de administrador - Todas las funcionalidades disponibles
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal de Login
const LoginComponent = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'worker'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usuarios predefinidos
  const users = {
    worker: {
      username: 'trabajador01',
      password: 'worker123',
      type: 'worker'
    },
    admin: {
      username: 'admin01',
      password: 'admin456',
      type: 'admin'
    }
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const targetUser = users[formData.userType];
      
      if (formData.username === targetUser.username && 
          formData.password === targetUser.password) {
        // Login exitoso
        onLogin({
          username: targetUser.username,
          type: targetUser.type
        });
      } else {
        // Login fallido
        setErrors({
          general: 'Credenciales incorrectas. Verifica tu usuario y contraseña.'
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  // Manejar Enter en los campos
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Accede a tu cuenta</p>
        </div>

        {/* Información de usuarios de prueba */}
        <div className="test-users-info">
          <p className="test-users-title">Usuarios de prueba:</p>
          <p><strong>Trabajador:</strong> trabajador01 / worker123</p>
          <p><strong>Admin:</strong> admin01 / admin456</p>
        </div>

        <div className="login-form">
          {/* Selector de tipo de usuario */}
          <div className="form-group">
            <label className="form-label">
              Tipo de Usuario
            </label>
            <div className="user-type-selector">
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="worker"
                  checked={formData.userType === 'worker'}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <span className="radio-label">Trabajador</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={formData.userType === 'admin'}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <span className="radio-label">Administrador</span>
              </label>
            </div>
          </div>

          {/* Campo de usuario */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Ingresa tu usuario"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {/* Error general */}
          {errors.general && (
            <div className="general-error">
              {errors.general}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal que maneja el estado de autenticación
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Renderizar componente según el estado de autenticación
  if (!user) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  // Redireccionar según el tipo de usuario
  if (user.type === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  } else {
    return <WorkerDashboard user={user} onLogout={handleLogout} />;
  }
};

export default App;