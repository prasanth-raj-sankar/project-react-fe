import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  // Fetch subjects from the backend
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:4500/exams/get-exams");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch subjects on component load
  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleExamClick = (subject) => {
    navigate(`/exam/${subject.subjectName}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear(); // Clear all user data
      navigate("/student-login");
    }
  };
  
  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Online Exam System</h1>
        <nav className="nav-menu">
          <a href="/student-dashboard">Subject</a>
          <a href="/my-results">My Result</a>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      <div className="subject-selection">
        <h2>Choose Subjects</h2>
        <div className="subject-container">
          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <div key={index} className="subject-card">
                <h3>{subject.subjectName}</h3>
                <button onClick={() => handleExamClick(subject)}>Go to Exam</button>
              </div>
            ))
          ) : (
            <p>No subjects available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
