import React from "react";
import SignupForm from "./components/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
    </Router>
  );
};

export default App;
