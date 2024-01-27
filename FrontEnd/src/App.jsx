import './App.css'
import Navbar from './Common/Navbar';
import {
  BrowserRouter as Router, 
} from "react-router-dom";

function App() {

  return (
    <>     
    <Router>
    <Navbar/>
    </Router>
    
    </>
  )
}

export default App
