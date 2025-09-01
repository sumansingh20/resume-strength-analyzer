"use client"

import { Link, Route, Routes, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/Dashboard"
import UploadAnalyze from "./pages/UploadAnalyze"
import Reports from "./pages/Reports"
import Templates from "./pages/Templates"
import Admin from "./pages/Admin"

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/70 dark:bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            Resume Strength Analyzer
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload">Analyze</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/templates">Templates</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadAnalyze />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
