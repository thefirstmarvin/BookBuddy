import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await userApi.post("/login", formData);
      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/dashboard"); // or any protected route
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9"
  },
  form: {
    padding: "2rem", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%", padding: "10px", margin: "10px 0", borderRadius: "4px", border: "1px solid #ccc"
  },
  button: {
    width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  error: {
    color: "red", fontSize: "0.9rem"
  }
};

export default Login;
