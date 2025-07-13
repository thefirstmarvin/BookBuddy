import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <BookList />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/books/add"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <BookForm />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
