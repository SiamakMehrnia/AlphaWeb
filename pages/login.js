import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("auth");
        console.log("Token from Cookies on useEffect:", token);
    if (token) {
      axios
        .get("/api/auth/checkAuth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            router.push("/admin");
          }
        })
        .catch(() => {
          Cookies.remove("auth");
        });
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", { password });

      if (response.status === 200) {
        Cookies.set("auth", response.data.token, {
                    
          path: "/",

          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
        router.push("/admin");
      }
    } catch (err) {
      setError("Invalid password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
