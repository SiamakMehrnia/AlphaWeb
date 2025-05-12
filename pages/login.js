import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", { password }, { withCredentials: true });

      if (res.status === 200) {
        // ✅ ذخیره کوکی به صورت مستقیم
        Cookies.set("auth", res.data.token, { path: "/" });

        setTimeout(() => {
          router.push("/admin");
        }, 300);
      } else {
        setError("رمز عبور نادرست است");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("مشکلی در ورود به سیستم وجود دارد");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl mb-4">ورود به سیستم</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="رمز عبور را وارد کنید"
            className="bg-gray-700 p-3 rounded mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 px-6 py-2 rounded">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
