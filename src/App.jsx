// import React from 'react';
import AppRoutes from './Routes';

const App = () => {
  return <AppRoutes />;
};

export default App;


























// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import PropTypes from "prop-types";
// import Home from "./pages/Home";




// const PrivateRoute = ({ component }) => {
//   const isAuthenticated = Boolean(localStorage.getItem("user"));

//   if (isAuthenticated) {
//     return component;
//   }

//   return <Navigate to="/login" />;
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.node,
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Private Routes */}
//         <Route
//           path="/posts"
//           element={<PrivateRoute component={<h1>Welcome To Post Page</h1>} />}
//         />
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
       


//         {/* URL Shortener Routes */}
//         <Route path="/shorten-url" element={<UrlShortener />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
