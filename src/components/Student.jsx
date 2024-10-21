// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/student-login');
  };

  return (
    <div className="card-one" onClick={handleStudentClick} style={{ cursor: 'pointer' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/201/201818.png" alt="Student" />
      <h2>Student</h2>
    </div>
  );
};

export default Student;
