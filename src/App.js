import { Component } from "react";

import Cookies from "js-cookie";

import axios from "axios";

import Home from "./components/Home";

import Register from "./components/Register";

import TodoContext from "./TodosContext/TodoContext";

import Login from "./components/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" exact element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
