import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AccRegistration from "./pages/accRegistration";
import Login from "./pages/Login";
import Register from "./pages/register";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/accReg" element={<AccRegistration />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
    </Router>
    //<AccRegistration/>
  );
}

export default App;



// function Appp() {
//   return (
//     <div className="Appp">
//       <AccRegistration></AccRegistration>
//       <header className="App-header">
//         <AccRegistration></AccRegistration>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default Appp;