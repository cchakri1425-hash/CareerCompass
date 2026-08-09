import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from '../pages/Landing';
import ChooseEducation from '../pages/ChooseEducation';
import CareerExplorer from '../pages/CareerExplorer';
import CareerDetails from '../pages/CareerDetails';
import RoadmapPage from '../pages/RoadmapPage';
import Resources from '../pages/Resources';
import CompareCareers from '../pages/CompareCareers';
import CareerQuiz from '../pages/CareerQuiz';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerifyOTP from '../pages/VerifyOTP';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Choose Education Selection Flow */}
      <Route path="/education" element={<ChooseEducation />} />

      {/* Career Explorer & Details */}
      <Route path="/explorer" element={<CareerExplorer />} />
      <Route path="/explorer/:id" element={<CareerDetails />} />

      {/* Interactive Roadmap Page */}
      <Route path="/roadmap/:id" element={<RoadmapPage />} />

      {/* Learning Resources */}
      <Route path="/resources" element={<Resources />} />

      {/* Compare Careers */}
      <Route path="/compare" element={<CompareCareers />} />

      {/* Career Quiz */}
      <Route path="/quiz" element={<CareerQuiz />} />

      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
