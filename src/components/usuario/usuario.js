import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, Save, AlertCircle,
  Plus, FileText, Users, BarChart3, Settings, LogOut, Menu, X, Search
} from 'lucide-react';
import './usuario.css';

// Componentes del formulario
const FormInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error, 
  icon: Icon,
  className = ""
}) => {
  return (
    <div className={`form-input-container ${className}`}>
      <label htmlFor={name} className="form-label">
        {Icon && <Icon className="form-icon" />}
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
      />
      {error && (
        <p className="error-message">
          <AlertCircle className="error-icon" />
          {error}
        </p>
      )}
    </div>
  );
};

const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  error,
  className = ""
}) => {
  return (
    <div className={`form-textarea-container ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`form-textarea ${error ? 'error' : ''}`}
        placeholder={placeholder}
      />
      {error && (
        <p className="error-message">
          <AlertCircle className="error-icon" />
          {error}
        </p>
      )}
    </div>
  );
};

// Secciones del formulario
const PersonalInfoSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Información Personal</h3>
      <div className="form-grid">
        <FormInput
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          placeholder="Tu nombre"
          required
          error={errors.nombre}
          icon={User}
        />
        <FormInput
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={onChange}
          placeholder="Tu apellido"
          required
          error={errors.apellido}
          icon={User}
        />
      </div>
      <FormInput
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={onChange}
        icon={Calendar}
      />
    </div>
  );
};

const ContactInfoSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Información de Contacto</h3>
      <div className="form-grid">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="tu@email.com"
          required
          error={errors.email}
          icon={Mail}
        />
        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={onChange}
          placeholder="+57 123 456 7890"
          required
          error={errors.telefono}
          icon={Phone}
        />
      </div>
    </div>
  );
};

const AddressInfoSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Dirección</h3>
      <div className="form-grid">
        <FormInput
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={onChange}
          placeholder="Calle 123 # 45-67"
          icon={MapPin}
        />
        <FormInput
          label="Ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={onChange}
          placeholder="Bogotá"
          icon={MapPin}
        />
      </div>
    </div>
  );
};

const ProfessionalInfoSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Información Profesional</h3>
      <div className="form-grid">
        <FormInput
          label="Profesión"
          name="profesion"
          value={formData.profesion}
          onChange={onChange}
          placeholder="Desarrollador, Diseñador, etc."
          icon={Briefcase}
        />
        <FormInput
          label="Empresa"
          name="empresa"
          value={formData.empresa}
          onChange={onChange}
          placeholder="Nombre de la empresa"
          icon={Briefcase}
        />
      </div>
    </div>
  );
};

const CommentsSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Información Adicional</h3>
      <FormTextarea
        label="Comentarios"
        name="comentarios"
        value={formData.comentarios}
        onChange={onChange}
        placeholder="Cualquier información adicional que quieras compartir..."
        rows={4}
      />
    </div>
  );
};

// Hook personalizado para el formulario
const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      console.log('Datos del formulario:', formData);
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return {
    formData,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    resetForm
  };
};

// Componente del formulario modal
const FormModal = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: '',
    ciudad: '',
    profesion: '',
    empresa: '',
    comentarios: ''
  };

  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm(initialValues);

  const handleFormSubmit = () => {
    if (handleSubmit()) {
      onSubmit(formData);
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Agregar Nuevo Formulario</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X className="close-icon" />
          </button>
        </div>
        
        <div className="modal-content">
          <PersonalInfoSection 
            formData={formData} 
            onChange={handleChange} 
            errors={errors} 
          />
          
          <ContactInfoSection 
            formData={formData} 
            onChange={handleChange} 
            errors={errors} 
          />
          
          <AddressInfoSection 
            formData={formData} 
            onChange={handleChange} 
            errors={errors} 
          />
          
          <ProfessionalInfoSection 
            formData={formData} 
            onChange={handleChange} 
            errors={errors} 
          />
          
          <CommentsSection 
            formData={formData} 
            onChange={handleChange} 
            errors={errors} 
          />
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={handleFormSubmit} className="btn-primary">
            <Save className="btn-icon" />
            Guardar Formulario
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal del dashboard
export default function WelcomeDashboard() {
  const [currentUser] = useState({ name: 'Juan Pérez', email: 'juan@email.com' });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [savedForms, setSavedForms] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFormSubmit = (formData) => {
    const newForm = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString()
    };
    setSavedForms(prev => [...prev, newForm]);
  };

  const stats = [
    { name: 'Formularios Creados', value: savedForms.length, icon: FileText, color: 'bg-blue' },
    { name: 'Usuarios Registrados', value: '24', icon: Users, color: 'bg-green' },
    { name: 'Completados Hoy', value: '8', icon: BarChart3, color: 'bg-purple' },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mobile-menu-btn"
              >
                <Menu className="menu-icon" />
              </button>
              <h1 className="header-title">Dashboard</h1>
            </div>
            
            <div className="header-right">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="search-input"
                />
              </div>
              
              <div className="user-info">
                <div className="user-avatar">
                  <span className="avatar-text">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="user-details">
                  <p className="user-name">{currentUser.name}</p>
                  <p className="user-email">{currentUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">
            ¡Bienvenido, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="welcome-subtitle">
            Gestiona tus formularios y mantén toda tu información organizada en un solo lugar.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-left">
                  <div className={`stat-icon ${stat.color}`}>
                    <stat.icon className="icon" />
                  </div>
                </div>
                <div className="stat-right">
                  <dt className="stat-label">{stat.name}</dt>
                  <dd className="stat-value">{stat.value}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="main-grid">
          {/* Add Form Card */}
          <div className="add-form-card">
            <div className="card">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon">
                    <Plus className="icon" />
                  </div>
                  <h3 className="card-title">Agregar Formulario</h3>
                </div>
                <p className="card-description">
                  Crea un nuevo formulario con información personal, contacto y datos profesionales.
                </p>
                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="btn-primary full-width"
                >
                  <Plus className="btn-icon" />
                  Crear Formulario
                </button>
              </div>
            </div>
          </div>

          {/* Recent Forms */}
          <div className="recent-forms-card">
            <div className="card">
              <div className="card-header-section">
                <h3 className="card-title">Formularios Recientes</h3>
              </div>
              <div className="card-content">
                {savedForms.length === 0 ? (
                  <div className="empty-state">
                    <FileText className="empty-icon" />
                    <p className="empty-text">No hay formularios creados aún.</p>
                    <p className="empty-subtext">
                      Haz clic en "Crear Formulario" para empezar.
                    </p>
                  </div>
                ) : (
                  <div className="forms-list">
                    {savedForms.slice(-5).reverse().map((form) => (
                      <div key={form.id} className="form-item">
                        <div className="form-left">
                          <div className="form-avatar">
                            <User className="icon" />
                          </div>
                          <div className="form-info">
                            <p className="form-name">
                              {form.nombre} {form.apellido}
                            </p>
                            <p className="form-email">{form.email}</p>
                          </div>
                        </div>
                        <div className="form-right">
                          <p className="form-date-label">Creado el</p>
                          <p className="form-date">{form.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-grid">
          <button className="quick-action-btn">
            <Settings className="quick-action-icon" />
            <span className="quick-action-text">Configuración</span>
          </button>
          
          <button className="quick-action-btn">
            <BarChart3 className="quick-action-icon" />
            <span className="quick-action-text">Reportes</span>
          </button>
          
          <button className="quick-action-btn">
            <Users className="quick-action-icon" />
            <span className="quick-action-text">Usuarios</span>
          </button>
          
          <button className="quick-action-btn logout">
            <LogOut className="quick-action-icon" />
            <span className="quick-action-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}