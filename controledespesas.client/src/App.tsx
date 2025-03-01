import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarComponent";
import Home from "./pages/Home/home.component";
import TipoDespesa from "./pages/TipoDespesa/tipoDespesa.component";
import TipoDespesaEdit from "./pages/TipoDespesa/tipoDespesaEdit.component";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tiposDespesas" element={<TipoDespesa />} />
                <Route path="/tipoDespesa" element={<TipoDespesaEdit />} />
                <Route path="/tipoDespesa/:id" element={<TipoDespesaEdit />} />
            </Routes>
        </Router>
    );
};

export default App;
