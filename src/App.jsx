// import { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
// import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    </>
  )
}

export default App;
