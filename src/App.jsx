import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Project from "./pages/Project.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/HomePage.jsx";
import AllProjects from "./pages/All-Projects.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/" element={<Home />}/>
        <Route path="/projects" element={<AllProjects/>}/>

        {/* Protected Routes (you’ll add auth logic later) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
