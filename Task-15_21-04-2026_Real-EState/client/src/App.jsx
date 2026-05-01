import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PropertyDetails from "./pages/PropertyDetails";
import AgentDashboard from "./pages/AgentDashboard";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import UserDashboard from "./pages/UserDashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<UserDashboard />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
