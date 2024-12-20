import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import OpenEvent from "./pages/OpenEvent";
import UserPage from "./pages/UserPage";
import Layout from "./Layout";
import CreateEvent from "./pages/CreateEvent";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./hooks/AuthContext";
import ProtectedRoute from "./hooks/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/event/:idevent" element={<OpenEvent />} />
        <Route element={<ProtectedRoute />}>
          <Route path="userPage" element={<UserPage />} />
          <Route path="createEvent" element={<CreateEvent />} />
      </Route>
        <Route path="404" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </AuthProvider>
    
  );
}

export default App;