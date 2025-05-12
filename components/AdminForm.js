import { useState } from "react";
import axios from "axios";

export default function AdminForm({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", { password });
      onLogin(res.data.token);
    } catch (error) {
      alert("Invalid password");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 w-full"
      >
        Login
      </button>
    </div>
  );
}