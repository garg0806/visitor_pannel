
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Public/Home";
import VisitorForm from "./pages/Public/VisitorForm";
import InterviewForm from "./pages/Public/InterviewForm";
import Dashboard from "./pages/Admin/Dashboard";
import Visitors from "./pages/Admin/Visitors";
import Interviewees from "./pages/Admin/Interviewees";
import Login from "./pages/Admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visitor" element={<VisitorForm />} />
        <Route path="/interview" element={<InterviewForm />} />
         <Route path="/admin" element={<Dashboard />} />
         <Route path="/admin/interviewees" element={<Interviewees />} />
         <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/visitors" element={<ProtectedRoute> <Visitors /></ProtectedRoute> }/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;






