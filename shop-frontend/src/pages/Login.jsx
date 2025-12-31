import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access) {
          setToken(data.access);
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      });
  };

  return (
    <div
        className="w-full h-125 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('../../public/images/login.png')" }}
        >
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

            <input
            className="w-full mb-4 p-3 border border-gray-300 rounded bg-white/70 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="password"
            className="w-full mb-6 p-3 border border-gray-300 rounded bg-white/70 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            onClick={handleLogin}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold transition"
            >
            Login
            </button>

            <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-teal-700 font-bold cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
    </div>

  );
};

export default Login;
