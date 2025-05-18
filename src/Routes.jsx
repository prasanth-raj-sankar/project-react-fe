// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import BlogsHome from './pages/Blogshome';
import AddBlog from './pages/AddBlog';
import BlogRegister from './pages/BlogRegister'




const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/register-student" element={<BlogRegister />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/Blogs-Home" element={<BlogsHome />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
