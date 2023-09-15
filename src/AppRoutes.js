import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ViewDetails from "./components/ViewDetails";

function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/admin-panel/*" element={<AdminPanel />} />
                <Route path="/view/:serviceId" element={<ViewDetails />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;