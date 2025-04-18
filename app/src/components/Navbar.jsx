import React, { useState, useEffect } from "react";

const handelhistory = () => { 
      window.location.href = '/history';
  };

const handelAppliances = () => { 
      window.location.href = '/appliances';
  };

  const handleHome = () => { 
    window.location.href = '/';
};


  const handleDashboard = () => { 
    window.location.href = '/dashboard';
};

const initializeLocalStorage = () => {
  if (!localStorage.getItem('wholevend_users')) {
    localStorage.setItem('wholevend_users', JSON.stringify([]));
  }
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem('wholevend_users')) || [];
};

const createUser = (userData) => {
  const users = getUsers();
  users.push(userData);
  localStorage.setItem('wholevend_users', JSON.stringify(users));
  return userData;
};

const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Initialize localStorage and check auth state
  useEffect(() => {
    initializeLocalStorage();
    const loggedInUser = JSON.parse(localStorage.getItem('wholevend_current_user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = () => {
    setIsLoading(true);
    try {
      const existingUser = getUserByEmail(formData.email);
      if (existingUser) {
        alert('User with this email already exists');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      createUser(newUser);
      localStorage.setItem('wholevend_current_user', JSON.stringify(newUser));
      setUser(newUser);
      setShowAuthModal(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error("Error signing up: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    try {
      const foundUser = getUserByEmail(formData.email);
      
      if (!foundUser) {
        alert('User not found');
        return;
      }

      if (foundUser.password !== formData.password) {
        alert('Incorrect password');
        return;
      }

      localStorage.setItem('wholevend_current_user', JSON.stringify(foundUser));
      setUser(foundUser);
      setShowAuthModal(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('wholevend_current_user');
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold text-green-600"><button onClick={handleHome}>MyLogo</button></div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {authMode === 'signup' ? 'Sign Up' : 'Login'}
            </h2>
            
            {authMode === 'signup' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={authMode === 'signup' ? handleSignUp : handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
              >
                {isLoading ? 'Processing...' : authMode === 'signup' ? 'Sign Up' : 'Login'}
              </button>
              
              <button
                onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                className="w-full text-blue-600 hover:text-blue-800 py-2 px-4 rounded transition"
              >
                {authMode === 'signup' ? 'Already have an account? Login' : 'Need an account? Sign Up'}
              </button>
            </div>
            
            <button
              onClick={() => setShowAuthModal(false)}
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-4 items-center">
      <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={handleHome}>
          Home
        </button>

        <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={handleDashboard}>
          Dashboard
        </button>
        <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={handelhistory}>
          History
        </button>
        <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={handelAppliances}>
          Appliances
        </button>
        
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
            }}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;