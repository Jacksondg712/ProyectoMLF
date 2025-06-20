import React, { useState, useEffect } from 'react';
import { User, MapPin, Mail, Phone, Calendar, LogOut, Users, Search, Trash2, Edit, Plus } from 'lucide-react';

// CSS en línea como objeto para mantener todo en un archivo
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#666'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logoutButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'transform 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  content: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '25px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '10px'
  },
  statLabel: {
    color: '#666',
    fontSize: '1.1rem'
  },
  searchSection: {
    marginBottom: '30px'
  },
  searchContainer: {
    position: 'relative',
    maxWidth: '400px'
  },
  searchInput: {
    width: '100%',
    padding: '15px 15px 15px 45px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#666'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  cardActions: {
    display: 'flex',
    gap: '10px'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#666'
  },
  editButton: {
    background: 'rgba(52, 152, 219, 0.1)',
    color: '#3498db'
  },
  deleteButton: {
    background: 'rgba(231, 76, 60, 0.1)',
    color: '#e74c3c'
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    background: 'rgba(102, 126, 234, 0.05)',
    borderRadius: '10px',
    transition: 'background 0.3s ease'
  },
  infoIcon: {
    color: '#667eea',
    flexShrink: 0
  },
  infoText: {
    color: '#555',
    fontSize: '1rem',
    wordBreak: 'break-word'
  },
  infoLabel: {
    fontWeight: '500',
    color: '#333',
    minWidth: '80px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'white'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.7
  },
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  emptyText: {
    fontSize: '1.2rem',
    opacity: 0.8,
    marginBottom: '30px'
  },
  addButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '15px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  },
  modalText: {
    color: '#666',
    marginBottom: '25px',
    lineHeight: '1.5'
  },
  modalButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  modalButton: {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  confirmButton: {
    background: '#e74c3c',
    color: 'white'
  },
  cancelButton: {
    background: '#f8f9fa',
    color: '#666',
    border: '2px solid #e0e0e0'
  }
};

const Dashboard = ({ onNavigate }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, trabajadorId: null });

  useEffect(() => {
    // Cargar datos del localStorage
    const storedData = JSON.parse(localStorage.getItem('trabajadoresData') || '[]');
    const storedUserType = localStorage.getItem('userType') || '';
    const storedUserEmail = localStorage.getItem('userEmail') || '';
    
    setTrabajadores(storedData);
    setUserType(storedUserType);
    setUserEmail(storedUserEmail);
  }, []);

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentTrabajador');
    
    // Redirigir al login
    if (onNavigate) {
      onNavigate('login');
    }
  };

  const handleAddNew = () => {
    if (onNavigate) {
      onNavigate('formulario');
    }
  };

  const handleDelete = (id) => {
    setDeleteModal({ show: true, trabajadorId: id });
  };

  const confirmDelete = () => {
    const updatedTrabajadores = trabajadores.filter(t => t.id !== deleteModal.trabajadorId);
    setTrabajadores(updatedTrabajadores);
    localStorage.setItem('trabajadoresData', JSON.stringify(updatedTrabajadores));
    setDeleteModal({ show: false, trabajadorId: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, trabajadorId: null });
  };

  // Filtrar trabajadores basado en el término de búsqueda
  const filteredTrabajadores = trabajadores.filter(trabajador =>
    trabajador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.celular.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>📊 Dashboard</div>
          <div style={styles.userInfo}>
            <User size={16} />
            <span>{userType === 'administrador' ? 'Administrador' : 'Trabajador'}</span>
            <span>•</span>
            <span>{userEmail}</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Statistics */}
        <div style={styles.statsSection}>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={styles.statNumber}>{trabajadores.length}</div>
            <div style={styles.statLabel}>
              <Users size={18} style={{ display: 'inline', marginRight: '5px' }} />
              Total Trabajadores
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={styles.statNumber}>{filteredTrabajadores.length}</div>
            <div style={styles.statLabel}>
              <Search size={18} style={{ display: 'inline', marginRight: '5px' }} />
              Resultados Filtrados
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por nombre, correo, dirección o celular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Cards Grid */}
        {filteredTrabajadores.length > 0 ? (
          <div style={styles.cardsGrid}>
            {filteredTrabajadores.map((trabajador) => (
              <div
                key={trabajador.id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === trabajador.id ? styles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(trabajador.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.cardTitle}>
                    <User size={20} />
                    {trabajador.nombre}
                  </div>
                  {userType === 'administrador' && (
                    <div style={styles.cardActions}>
                      <button
                        style={{...styles.actionButton, ...styles.editButton}}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.deleteButton}}
                        onClick={() => handleDelete(trabajador.id)}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div style={styles.cardInfo}>
                  <div style={styles.infoItem}>
                    <Mail size={18} style={styles.infoIcon} />
                    <div>
                      <div style={styles.infoLabel}>Email:</div>
                      <div style={styles.infoText}>{trabajador.correo}</div>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <MapPin size={18} style={styles.infoIcon} />
                    <div>
                      <div style={styles.infoLabel}>Dirección:</div>
                      <div style={styles.infoText}>{trabajador.direccion}</div>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <Phone size={18} style={styles.infoIcon} />
                    <div>
                      <div style={styles.infoLabel}>Celular:</div>
                      <div style={styles.infoText}>{trabajador.celular}</div>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <Calendar size={18} style={styles.infoIcon} />
                    <div>
                      <div style={styles.infoLabel}>Registro:</div>
                      <div style={styles.infoText}>{formatDate(trabajador.fechaRegistro)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👥</div>
            <div style={styles.emptyTitle}>
              {searchTerm ? 'No se encontraron resultados' : 'No hay trabajadores registrados'}
            </div>
            <div style={styles.emptyText}>
              {searchTerm 
                ? `No se encontraron trabajadores que coincidan con "${searchTerm}"`
                : 'Comienza agregando el primer trabajador al sistema'
              }
            </div>
            {!searchTerm && (
              <button
                style={styles.addButton}
                onClick={handleAddNew}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Plus size={20} />
                Agregar Trabajador
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalTitle}>⚠️ Confirmar Eliminación</div>
            <div style={styles.modalText}>
              ¿Estás seguro de que deseas eliminar este trabajador? Esta acción no se puede deshacer.
            </div>
            <div style={styles.modalButtons}>
              <button
                style={{...styles.modalButton, ...styles.cancelButton}}
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                style={{...styles.modalButton, ...styles.confirmButton}}
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;