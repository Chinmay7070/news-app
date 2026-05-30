import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import "./css/theme.css";
function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<HomePage />} />
               </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;