import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";

import CreateExam from "./pages/CreateExam";
import AssignQuestions from "./pages/AssignQuestions";
import AddQuestion from "./pages/AddQuestion";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam/:id"
          element={
            <ProtectedRoute role="student">
              <ExamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute role="student">
              <ResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-exam"
          element={
            <ProtectedRoute role="admin">
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign-questions"
          element={
            <ProtectedRoute role="admin">
              <AssignQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-question"
          element={
            <ProtectedRoute role="admin">
              <AddQuestion />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
