import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const fetchpassword = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/passwords");
        const data = res.data;
        setPasswordArray(data);
      } catch (err) {
        console.log("something wrong in useeffect check it", err);
      }
    }
    fetchpassword();
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (form._id) {
        // Edit existing password
        await axios.put(`http://localhost:5000/api/passwords/${form._id}`, {
          site: form.site,
          username: form.username,
          password: form.password,
          //  owner: user._id  // yeh user id login ke time se
        });

        const updated = passwordArray.map(item =>
          item._id === form._id
            ? { ...item, site: form.site, username: form.username, password: form.password }
            : item
        );
        setPasswordArray(updated);

        toast.success('Changes saved successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        // Add new password
        const res = await axios.post(`http://localhost:5000/api/passwords`, {
          site: form.site,
          username: form.username,
          password: form.password
        });

        // ✅ Use backend response directly
        const updated = [...passwordArray, res.data];
        setPasswordArray(updated);
      }

      setForm({ site: "", username: "", password: "" });
    } catch (err) {
      console.error("Error saving password:", err);
    }
  };

  const deletepassword = async (id) => {
    let c = confirm("You are sure to delete this?");
    if (c) {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`);
      setPasswordArray(passwordArray.filter(item => item._id !== id));
    }
  };

  const editpassword = (id) => {
    setForm(passwordArray.filter(item => item._id === id)[0]);
  };

  const handlecopy = (text) => {
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="pt-24 px-4 md:px-10 bg-gray-100 min-h-screen pb-20">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-10">
        Password Manager
      </h2>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-lg mx-auto space-y-5 border border-gray-200">
        <div>
          <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">🌐 Website URL</label>
          <input
            type="text"
            id="url"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">👤 Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">🔒 Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600 transition"
          >
            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </button>
        </div>

        <button
          onClick={savePassword}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-md hover:scale-[1.02] transition-transform duration-200 shadow-md"
        >
          💾 Save Password
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 my-10 mb-10 max-w-4xl mx-auto pb-10">
        <h3 className="text-2xl font-bold text-gray-800 px-6 py-4 border-b">🔐 Your Saved Passwords</h3>

        {passwordArray.length === 0 && (
          <div className="text-center text-gray-500 py-8">No passwords to show 😴</div>
        )}

        {passwordArray.length !== 0 && (
          <table className="min-w-full table-auto text-sm text-left text-gray-600">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Website</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Password</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {passwordArray.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div className="flex flex-row justify-between items-center">
                      <a
                        href={item.site.startsWith("http") ? item.site : `https://${item.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline hover:text-blue-800 transition flex-1"
                      >
                        {item.site}
                      </a>
                      <button
                        onClick={() => handlecopy(item.site)}
                        className="ml-2 text-gray-500 hover:text-indigo-600"
                        type="button"
                        title="Copy website URL"
                      >
                        <i className="fa-solid fa-copy cursor-pointer"></i>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {item.username}
                    <button
                      onClick={() => handlecopy(item.username)}
                      className="ml-2 text-gray-500 hover:text-indigo-600"
                      type="button"
                      title="Copy username"
                    >
                      <i className="fa-solid fa-copy cursor-pointer"></i>
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    {item.password}
                    <button
                      onClick={() => handlecopy(item.password)}
                      className="ml-2 text-gray-500 hover:text-indigo-600"
                      type="button"
                      title="Copy password"
                    >
                      <i className="fa-solid fa-copy cursor-pointer"></i>
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-row gap-3">
                      <span onClick={() => editpassword(item._id)}><i className="fa-solid fa-pen"></i></span>
                      <span onClick={() => deletepassword(item._id)}><i className="fa-solid fa-trash"></i></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
