import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoutes from './AdminRoute';
import UserRoutes from './UserRoute';
import Header from './component/Common/Header'; // Shared Header

function App() {
  //const userRole = localStorage.getItem('role'); // Replace with your role detection logic

  return (
    <Router>
      <div className="App">
        <Header />
        <AdminRoutes/>
        <UserRoutes/>
        {/* Conditional Rendering of Routes */}
        
      </div>
    </Router>
  );
}

export default App;
