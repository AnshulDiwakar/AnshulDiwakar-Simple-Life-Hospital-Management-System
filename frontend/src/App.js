import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Page Imports
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DoctorProfile from './pages/DoctorProfile';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import PatientProfile from './pages/PatientProfile';
import PatientProfileEdit from './pages/PatientProfileEdit';
import DoctorList from './pages/DoctorList';
import AppointmentForm from './pages/AppointmentForm';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
        <Route path="/patient/:id/edit" element={<PatientProfileEdit />} />
        <Route path="/appointment/:doctorId" element={<AppointmentForm />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
