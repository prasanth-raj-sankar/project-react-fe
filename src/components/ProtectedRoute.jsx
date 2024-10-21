import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user'); // Check if the user is authenticated

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/student-login" />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
