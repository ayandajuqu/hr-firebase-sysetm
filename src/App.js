// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { Auth } from "./Components/auth";
import { SignIn } from "./Components/signin";
import Home from "./Components/home";
import EmployeeHierarchy from "./Components/hierachy";
import ProfilePage from "./Components/profile";
import './App.css';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={!user ? <Auth /> : <Navigate to="/home" />} />
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/signin" />} /> 
          <Route path="/employee-hierarchy" element={user ? <EmployeeHierarchy /> : <Navigate to="/signin" />} />
          <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
