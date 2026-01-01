import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          // Registration success — redirect
          navigate("/login");
        } else {
          // Backend errors (e.g., username exists)
          setError(
            data?.detail ||
              data?.username?.[0] ||
              data?.email?.[0] ||
              "Registration failed"
          );
        }
      })
      .catch(() => {
        setError("Something went wrong");
      });
  };

  return (
    <div
      className="w-full h-125 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('../../public/images/login.png')" }}
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        {error && (
          <p className="mb-4 text-red-600 bg-red-200/70 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleRegister} >
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded bg-white/70 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Username"
          name="username"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          className="w-full mb-4 p-3 border border-gray-300 rounded bg-white/70 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 border border-gray-300 rounded bg-white/70 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold transition"
        >
          Create Account
        </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-teal-700 font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
