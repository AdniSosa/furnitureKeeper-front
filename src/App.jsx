import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Furnitures from "./pages/Rooms";
import Stores from "./pages/Stores";
import Favorites from "./pages/Favorites";
import AddForm from "./pages/AddForm";
import NavBar from "./components/NavBar";
import FurnitureDetails from "./pages/FurnitureDetails";
import { SearchProvider } from "./context/SearchContext";
import './App.css'
import UpdateForm from "./pages/UpdateForm";

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
                <Route path="/editar/:id" element={<UpdateForm />}></Route>
                <Route path="/info/:id" element={<FurnitureDetails />}></Route>
            </Routes>
        </Router>
    </SearchProvider>

  )
}

export default App
