import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './auth/AuthProvider';
import AccessDenied from './pages/AccessDenied';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

export default function App() {
  return <AuthProvider><BrowserRouter><Navbar/><Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/profile" element={<Profile/>}/></Route><Route path="/access-denied" element={<AccessDenied/>}/><Route path="*" element={<NotFound/>}/></Routes></BrowserRouter></AuthProvider>;
}
