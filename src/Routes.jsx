// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
// import StudentRegister from './pages/Studentregister.jsx';
import StudentRegister from './pages/StudentRegister'
import SubjectManagement from './pages/SubjectManagement';
import ExamManagement from './pages/ExamManagement';
import AddQuestion from './pages/AddQuestion';
// import QuestionList from './pages/QuestionList.jsx';
import QuestionList from './pages/QuestionList';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/register-student" element={<StudentRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/subjects" element={<SubjectManagement />} />
        <Route path="/admin-dashboard/exams" element={<ExamManagement />} />
        <Route path="/admin-dashboard/exams/add-question" element={<AddQuestion />} />
        <Route path="/admin-dashboard/exams/QuestionList" element={<QuestionList />} />
      

        <Route path="/exam/:subject" element={<ExamPage />} />

        <Route path="/exam-result/:subject" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
