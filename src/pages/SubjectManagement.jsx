// SubjectManagement.jsx
import { useState } from 'react';
import './SubjectManagement.css'; // Create this CSS file

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([{ name: 'Maths' }]); // Initial subject data
  const [newSubject, setNewSubject] = useState(''); // State for new subject input

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      setSubjects([...subjects, { name: newSubject }]); // Add new subject
      setNewSubject(''); // Clear input field after adding
    }
  };

  const handleDeleteSubject = (subjectToDelete) => {
    setSubjects(subjects.filter((subject) => subject.name !== subjectToDelete)); // Delete selected subject
  };

  return (
    <div className="admin-dashboard">
    <header className="dashboard-header">
    <h1>Online Exam System</h1>
    <nav className="nav-menu">
      <a href="/dashboard">Dashboard</a>
      <a href="/logout">Logout</a>
    </nav>
  </header>

  
    <div className="subject-management">
      <h2>Subject List</h2>
      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDeleteSubject(subject.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-subject-form">
        <label>Enter Subject</label>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter Subject Name"
        />
        <div className="form-buttons">
          <button className="add-btn" onClick={handleAddSubject}>
            Add
          </button>
          <button className="close-btn" onClick={() => setNewSubject('')}>
            Close
          </button>
          <button className="go-back-btn" onClick={() => window.history.back()}>
          Go back
        </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubjectManagement;
