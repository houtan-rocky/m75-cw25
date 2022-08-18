import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Chart from "./pages/chart";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/profile" element={< Profile/>}/>
      <Route path="/chart" element={< Chart/>}/>
      <Route path="/login" element={< Login/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
