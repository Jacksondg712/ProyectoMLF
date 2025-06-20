import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Save, ArrowLeft, CheckCircle } from 'lucide-react';

// CSS en línea como objeto para mantener todo en un archivo
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem'
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    color: '#666'
  },
  backButtonHover: {
    background: 'rgba(79, 172, 254, 0.1)',
    color: '#4facfe'
  },
  formGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500',
    fontSize: '1rem'
  },
  labelIcon: {
    marginRight: '8px'
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    background: 'white'
  },
  inputFocus: {
    borderColor: '#4facfe',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.1)'
  },
  inputError: {
    borderColor: '#e74c3c',
    boxShadow: '0 0 0 3px rgba(231, 76, 60, 0.1)'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px'
  },
  button: {
    flex: 1,
    padding: '15px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  saveButton: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white'
  },
  clearButton: {
    background: 'white',
    color: '#666',
    border: '2px solid #e0e0e0'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  successMessage: {
    background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
    color: 'white',
    padding: '15px',
    borderRadius: '12px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideIn 0.5s ease'
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: '#e0e0e0',
    borderRadius: '2px',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  }
};

const Formulario = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    correo: '',
    celular: ''
  });
  
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  const [hoveringButton, setHoveringButton] = useState('');

  // Calcular progreso del formulario
  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    return (filledFields / totalFields) * 100;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe ser más específica';
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    // Validar celular
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.celular.trim()) {
      newErrors.celular = 'El celular es requerido';
    } else if (!phoneRegex.test(formData.celular.replace(/\s/g, ''))) {
      newErrors.celular = 'Ingresa un celular válido (10 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Guardar en localStorage
      const trabajadorData = {
        ...formData,
        fechaRegistro: new Date().toISOString(),
        id: Date.now() // ID simple basado en timestamp
      };

      // Obtener datos existentes o inicializar array vacío
      const existingData = JSON.parse(localStorage.getItem('trabajadoresData') || '[]');
      
      // Agregar nuevo trabajador
      existingData.push(trabajadorData);
      
      // Guardar de vuelta en localStorage
      localStorage.setItem('trabajadoresData', JSON.stringify(existingData));
      localStorage.setItem('currentTrabajador', JSON.stringify(trabajadorData));

      // Mostrar mensaje de éxito
      setShowSuccess(true);

      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('dashboard');
        }
      }, 2000);
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      direccion: '',
      correo: '',
      celular: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedInput === fieldName ? styles.inputFocus : {}),
    ...(errors[fieldName] ? styles.inputError : {})
  });

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <button
          style={{
            ...styles.backButton,
            ...(isHoveringBack ? styles.backButtonHover : {})
          }}
          onClick={handleBack}
          onMouseEnter={() => setIsHoveringBack(true)}
          onMouseLeave={() => setIsHoveringBack(false)}
        >
          <ArrowLeft size={20} />
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>Registro de Trabajador</h1>
          <p style={styles.subtitle}>Completa tu información personal</p>
        </div>

        {/* Barra de progreso */}
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${calculateProgress()}%`
            }}
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>
            <User size={18} style={styles.labelIcon} />
            Nombre Completo
          </div>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            onFocus={() => setFocusedInput('nombre')}
            onBlur={() => setFocusedInput('')}
            style={getInputStyle('nombre')}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.nombre && (
            <div style={styles.errorMessage}>
              {errors.nombre}
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>
            <MapPin size={18} style={styles.labelIcon} />
            Dirección
          </div>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            onFocus={() => setFocusedInput('direccion')}
            onBlur={() => setFocusedInput('')}
            style={getInputStyle('direccion')}
            placeholder="Ingresa tu dirección completa"
          />
          {errors.direccion && (
            <div style={styles.errorMessage}>
              {errors.direccion}
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>
            <Mail size={18} style={styles.labelIcon} />
            Correo Electrónico
          </div>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            onFocus={() => setFocusedInput('correo')}
            onBlur={() => setFocusedInput('')}
            style={getInputStyle('correo')}
            placeholder="tu@email.com"
          />
          {errors.correo && (
            <div style={styles.errorMessage}>
              {errors.correo}
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>
            <Phone size={18} style={styles.labelIcon} />
            Número de Celular
          </div>
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            onFocus={() => setFocusedInput('celular')}
            onBlur={() => setFocusedInput('')}
            style={getInputStyle('celular')}
            placeholder="3001234567"
          />
          {errors.celular && (
            <div style={styles.errorMessage}>
              {errors.celular}
            </div>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.button,
              ...styles.clearButton,
              ...(hoveringButton === 'clear' ? styles.buttonHover : {})
            }}
            onClick={handleClear}
            onMouseEnter={() => setHoveringButton('clear')}
            onMouseLeave={() => setHoveringButton('')}
          >
            Limpiar
          </button>
          
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              ...(hoveringButton === 'save' ? styles.buttonHover : {})
            }}
            onClick={handleSave}
            onMouseEnter={() => setHoveringButton('save')}
            onMouseLeave={() => setHoveringButton('')}
          >
            <Save size={18} />
            Guardar
          </button>
        </div>

        {showSuccess && (
          <div style={styles.successMessage}>
            <CheckCircle size={20} />
            ¡Información guardada exitosamente! Redirigiendo al dashboard...
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;