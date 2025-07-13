import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Decode token to extract username
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.sub); // assuming `sub` holds the username
    } catch (err) {
      console.error("Invalid token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome, {username}!</h2>
        <p>You are now logged in.</p>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5"
  },
  card: {
    padding: "2rem", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", textAlign: "center"
  },
  button: {
    marginTop: "1rem", padding: "10px 20px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
  }
};

export default Dashboard;
