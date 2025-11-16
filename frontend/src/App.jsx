import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Inicio from "./pages/Inicio";
import Asistencia from "./pages/Asistencia";
import AsistenciasSuper from "./pages/AsistenciasSuper"; 
import Layout from "./components/UI/Layout";
import LoginForm from "./pages/LoginForm";
import Trabajador from "./pages/Trabajador";
import Supervisor from "./pages/supervisor";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Acceso general */}
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Acceso para trabajadores */}
            <Route
              path="/asistencia"
              element={
                <ProtectedRoute role="trabajador">
                  <Asistencia />
                </ProtectedRoute>
              }
            />
            <Route
             path="/trabajador"
             element={
              <ProtectedRoute role="trabajador">
                <Trabajador />
              </ProtectedRoute>
             }
          />
            <Route
              path="/supervisor/reportes/asistencia"
              element={
                <ProtectedRoute role="supervisor">
                  <AsistenciasSuper/>
                </ProtectedRoute>
              }
            />
            <Route
             path="/supervisor"
             element={
              <ProtectedRoute role="supervisor">
               <Supervisor/>
              </ProtectedRoute>
             }
            />

            {/* Admin */}
            <Route
              path="/admin/*"
             element={
              <ProtectedRoute role="admin">
             <AdminDashboard />
           </ProtectedRoute>
             }
          />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
