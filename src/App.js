import React, { useState } from 'react';
import Login from './components/Login/Login.js';
import Formulario from './components/Formulario/Formulario';
import Dashboard from './components/Dashboard/Dashboard.js';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const handleNavigate = (route) => {
    setCurrentView(route);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'formulario':
        return <Formulario onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      default:
        return <Login onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;