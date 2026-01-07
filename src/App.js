import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailsPage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [selectedProperty, setSelectedProperty] = useState(null);


  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setCurrentView('search');
    }
  }, []);

  const handleLogin = (credentials) => {

    if (credentials.email === 'demo@property.com' && credentials.password === 'Demo@123') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setCurrentView('search');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setCurrentView('login');
    setSelectedProperty(null);
  };

  const viewPropertyDetail = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
  };

  const backToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          {currentView === 'search' ? (
            <SearchPage onViewDetail={viewPropertyDetail} onLogout={handleLogout} />
          ) : (
            <DetailPage property={selectedProperty} onBack={backToSearch} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
};

export default App;