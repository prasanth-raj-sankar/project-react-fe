// import React from 'react';
import './AdminDashboard.css'; // Make sure to create this CSS file for styling

const AdminDashboard = () => {
//   const summaryData = [
//     { id: 1, text: 'We have total 1 exam', color: '#4a90e2', link: '/exam-details' },
//     { id: 2, text: 'We have total 5 questions', color: '#f5a623', link: '/questions-details' },
//     { id: 3, text: 'We have total 3 users', color: '#4a90e2', link: '/users-details' },
//   ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Online Exam System</h1>
        <nav className="nav-menu">
          <a href="/dashboard">Dashboard</a>
          <a href="/admin-login">Logout</a>
        </nav>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" 
            alt="Admin" 
            className="admin-icon" 
          />
          <ul>
            {/* <li><a href="/subjects">Subject</a></li> */}
            {/* <li><a href="/admin-dashboard/subjects">Subject</a></li> */}
            <li><a href="/admin-dashboard/exams">Add Questions</a></li>
            {/* <li><a href="/questions">Question</a></li>
            <li><a href="/results">Result</a></li>
            <li><a href="/student-list">Student List</a></li> */}
          </ul>
        </aside>
        <main className="main-dashboard">
          <h2>Dashboard</h2>
          {/* <div className="summary-cards">
            {summaryData.map((item) => (
              <div 
                key={item.id} 
                className="card" 
                style={{ backgroundColor: item.color }}
                onClick={() => window.location.href = item.link}
              >
                <p>{item.text}</p>
                <button>View Details</button>
              </div>
            ))}
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


