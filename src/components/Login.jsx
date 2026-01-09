import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/login', form);
      alert(res.data.message || 'Login successful');
      nav('/manager');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
   <div className="flex" style={{ minHeight: 'calc(100vh - 5rem)', paddingTop: '4rem' }}>
      
      {/* LEFT SIDE INFO */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-bold mb-6 text-center">Welcome Back!</h1>
        <p className="text-lg text-center leading-relaxed max-w-md">
          Forget your saved passwords often? Don’t worry — we’ve got you covered!  
          Manage all your credentials in one secure place.  
          <br /><br />
          Stay organized. Stay secure. 
        </p>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to Your Account</h2>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
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
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition duration-200 shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            Don’t have an account?{' '}
            <span
              className="text-indigo-600 font-semibold cursor-pointer"
              onClick={() => nav('/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
