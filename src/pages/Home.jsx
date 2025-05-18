// import React from 'react';
import Student from '../components/Student';
// import Admin from '../components/Admin';
import '../styles/Home.css'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <h1 style={{color:"#fff"}}>Blogs</h1>
      </header>
      <div className="container">
        <Student />
      </div>
    </div>
  );
};

export default Home;








// import React from 'react';
// import Student from './StudentLogin';
// import Admin from './AdminLogin';
// import './Home.css'; // Create this CSS file for styling

// const Home = () => {
//   return (
//     <div className="home">
//       <header className="header">
//         <h1>Online Exam System</h1>
//       </header>
//       <div className="container">
//         <Student />
//         <Admin />
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div>
//         <h1>Welcome to the Home Page!</h1>
//         <div className="mt-3">
//           <Link to="/shorten-url" className="btn btn-success m-2">
//             URL Shortener
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;