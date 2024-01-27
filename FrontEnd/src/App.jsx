import './App.css'
import Navbar from './Common/Navbar';
import {
  BrowserRouter as Router, 
} from "react-router-dom";
import Home from './pages/Home';

function App() {

  return (
    <>     
    <Router>
    <Navbar/>
    <Home/>
    </Router>
    
    </>
  )
}

export default App
