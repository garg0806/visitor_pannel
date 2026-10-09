import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { AdminContext } from "@/context/AdminContext";
import { loginAdmin } from "@/services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginAdmin(
        formData.email,
        formData.password
      );

      login(res);

      navigate("/admin/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  
   

    return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

      {/* Logo */}

      <div className="flex justify-center mb-6">

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

          <ShieldCheck
            className="text-blue-600"
            size={30}
          />

        </div>

      </div>

      {/* Heading */}

      <h1 className="text-3xl font-bold text-center text-slate-800">

        Admin Login

      </h1>

      <p className="text-center text-slate-500 mt-2 mb-8">

        Sheopal's Visitor Management System

      </p>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Email */}

        <div>

          <label className="block mb-2 text-sm font-medium text-slate-700">

            Email Address

          </label>

          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-300
              px-4
              outline-none
              transition
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />

        </div>

        {/* Password */}

        <div>

          <label className="block mb-2 text-sm font-medium text-slate-700">

            Password

          </label>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="   w-full   h-12   rounded-xl   border   border-slate-300   px-4   outline-none   transition   focus:border-blue-600
         focus:ring-2
              focus:ring-blue-200
            "
          />

        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            h-12
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>

  </div>
);
  
}