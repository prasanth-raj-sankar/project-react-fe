import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { studentLoginAPI } from "../apis"; // Assuming you have a student login API
import './StudentDashboard.css';

const StudentLogin = () => {
  const isAuthenticated = Boolean(localStorage.getItem("student"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await studentLoginAPI({ email, password });
      alert(response.msg);
      localStorage.setItem("student", JSON.stringify(response.student));
      navigate("/student-dashboard"); // Redirect to student dashboard after login
    } catch (e) {
      console.log("error", e);
      alert(e.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/student-dashboard" />; // Redirect if already logged in
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card-box p-4" style={{ width: "400px"}}>
        <h2 className="text-center mb-4">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Don&apos;t have an account? <Link to="/register-student">Register</Link>
          </p>
          <p>
            <Link to="/forget-password-student">Forgot Password?</Link> {/* Student-specific link */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;




// // import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const StudentLogin = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Assume successful login
//     navigate('/student-dashboard');
//   };

//   return (
//     <div>
//       <h2>Student Login</h2>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default StudentLogin;



// import React from 'react';

// const Student = () => {
//   return (
//     <div className="card">
//       <img src="https://cdn-icons-png.flaticon.com/512/201/201818.png" alt="Student" />
//       <h2>Student</h2>
//     </div>
//   );
// };

// export default Student;
