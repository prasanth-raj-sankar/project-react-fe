// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div className="card-one" onClick={handleAdminClick} style={{ cursor: 'pointer' }}>
      <img src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png" alt="Admin" />
      <h2>Admin</h2>
    </div>
  );
};

export default Admin;
