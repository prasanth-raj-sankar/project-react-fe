import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI} from "../apis"; // Assuming you have an admin login API

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await adminLoginAPI({ email, password });
  //     alert(response.msg);
  //     localStorage.setItem("admin", JSON.stringify(response.token));
  //     navigate("/admin-dashboard"); // Redirect after successful login
  //   } catch (e) {
  //     console.error(e);
  //     alert(e.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLoginAPI({ email, password });

      // Check if token is present
      if (response.token) {
        alert(response.msg);
        localStorage.setItem("admin", JSON.stringify(response.token)); // Store the token
        navigate("/admin-dashboard"); // Redirect after successful login
      } else {
        alert("Login failed. No token received.");
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card-box p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
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
            Email:admin@example.com
            password:Admin@123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;












// // import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Assume successful login
//     navigate('/admin-dashboard');
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default AdminLogin;


// import React from 'react';

// const Admin = () => {
//   return (
//     <div className="card">
//       <img src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png" alt="Admin" />
//       <h2>Admin</h2>
//     </div>
//   );
// };

// export default Admin;
