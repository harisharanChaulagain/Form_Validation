import React from "react";
import SignupForm from "./pages/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import EditForm from "./pages/EditForm";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/edit-user/:userId" element={<EditForm />} />
      </Routes>
    </Router>
  );
};

export default App;
