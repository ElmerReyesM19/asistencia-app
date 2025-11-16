import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/UI/AdminLayout";
import AdminUsuarios from "./AdminUsuarios";
import AdminLogs from "./AdminLogs";
import AdminHome from "./AdminHome"; 

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="logs" element={<AdminLogs />} />
       
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

