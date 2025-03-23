import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.component";
import TipoDespesa from "./pages/TipoDespesa/tipoDespesa.component";
import TipoDespesaEdit from "./pages/TipoDespesa/tipoDespesaEdit.component";
import Login from "./pages/Login/login.component";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/tiposDespesas" element={<TipoDespesa />} />
                        <Route path="/tipoDespesa" element={<TipoDespesaEdit />} />
                        <Route path="/tipoDespesa/:id" element={<TipoDespesaEdit />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
