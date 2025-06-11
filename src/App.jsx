import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Furnitures from "./pages/Furnitures";
import { RoomProvider } from "./context/RoomContext";
import './App.css'

function App() {
  return (
    <RoomProvider>
      <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/muebles/:estancia" element={<Furnitures/>}></Route>
            </Routes>
        </Router>
    </RoomProvider>

  )
}

export default App
