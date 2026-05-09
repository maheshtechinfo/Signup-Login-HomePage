import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  // ✅ Initialize state directly (no useEffect)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔐 Redirect if no user
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
        
        <div className="text-center mb-4">
          <h3>Welcome, {user.name} 👋</h3>
        </div>

        <div className="list-group">
          <div className="list-group-item">
            <strong>Email:</strong> {user.email}
          </div>

          <div className="list-group-item">
            <strong>Mobile:</strong> {user.mobile}
          </div>

          <div className="list-group-item">
            <strong>Address:</strong> {user.address}
          </div>
        </div>

        <button 
          className="btn btn-danger mt-4 w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;