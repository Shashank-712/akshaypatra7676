// src/pages/Login.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import gsap from "gsap";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donor",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const fakeUser = {
        email: formData.email,
        role: formData.role,
      };

      localStorage.setItem("user", JSON.stringify(fakeUser));

      toast.success("Login successful 🎉");

      if (formData.role === "donor") {
        navigate("/donor/dashboard");
      } else {
        navigate("/ngo/dashboard");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="login-card w-full max-w-md glass-card p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Role Selection */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            >
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-500"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;