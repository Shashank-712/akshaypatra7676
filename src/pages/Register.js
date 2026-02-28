// src/pages/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "proton.me"
];

const blockedDomains = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "yopmail.com"
];

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (formData.name.length < 2) {
      toast.error("Enter valid name.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email.");
      return false;
    }

    const domain = formData.email.split("@")[1];

    if (blockedDomains.includes(domain)) {
      toast.error("Temporary emails not allowed.");
      return false;
    }

    if (!allowedDomains.includes(domain)) {
      toast.error("Use real emails only");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be 8+ characters atleast");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fakeUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));

    toast.success("Registration successful 🎉");

    if (formData.role === "donor") {
      navigate("/donor/dashboard");
    } else {
      navigate("/ngo/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md glass-card p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              name="email"
              type="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

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
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-500"
            >
              Register
            </button>

          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;