import React from "react";
import './Logout.css';

function Logout() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Success ✅");
    window.location.reload();
  };

  return (
    <div className="logout-header">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;