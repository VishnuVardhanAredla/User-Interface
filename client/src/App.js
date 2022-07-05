import React from "react";
import { BrowserRouter as Router, Switch, Route, Link,Routes } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { Profile } from "./Dashboard/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register"element={<Register/>} >
        </Route>
        <Route path="/login" element={<Login/>}>
        </Route>
        <Route path="/profile" element={<Profile/>}>
        </Route>
        <Route path="/" element={<Login/>}>
        </Route>
      </Routes>
    </Router>
  );
}
