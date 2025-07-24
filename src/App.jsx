import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Furnitures from "./pages/Rooms";
import Stores from "./pages/Stores";
import Favorites from "./pages/Favorites";
import AddForm from "./pages/AddForm";
import NavBar from "./components/NavBar";
import { SearchProvider } from "./context/SearchContext";
import './App.css'

function App() {
  return (
    <SearchProvider>
      <Router>
        <NavBar />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/muebles/:estancia" element={<Furnitures/>}></Route>
                <Route path="/tiendas/:tienda" element={<Stores/>}></Route>
                <Route path="/favoritos" element={<Favorites/>}></Route>
                <Route path="/agregar" element={<AddForm/>}></Route>
            </Routes>
        </Router>
    </SearchProvider>

  )
}

export default App
