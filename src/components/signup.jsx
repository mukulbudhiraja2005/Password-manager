import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
  const res = await API.post("/api/signup", form);
  alert(res.data.message || "Signup successful");
  nav('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 5rem)', paddingTop: '4rem' }}>
      {/* Left side - illustration/text */}
  <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-blue-600 to-indigo-700 items-center justify-center p-10">
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold mb-6">Welcome to Password Manager</h1>
          <p className="text-lg">
            Securely store your passwords and manage them easily.<br />
            Stay safe online and never forget your credentials.
          </p>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition duration-200 shadow-lg"
            >
              Sign Up
            </button>
          </form>
              <p className="text-center text-gray-500 mt-5">
                Already have an account?{' '}
                <span className="text-indigo-600 font-semibold cursor-pointer" onClick={() => nav('/login')}>
                  Login
                </span>
              </p>
        </div>
      </div>
    </div>
  );
};
