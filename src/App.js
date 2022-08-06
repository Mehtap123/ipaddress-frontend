import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landingpage from "./components/Landingpage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Landingpage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
