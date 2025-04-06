import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [focusField, setFocusField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const validateFields = () => {
    const newErrors = { username: "", password: "" };
    if (!inputValues.username) {
      newErrors.username = "Username is required.";
    }
    if (!inputValues.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (validateFields()) {
      navigate("/dashboard");
      alert("Login successful");
      console.log("inputValues", inputValues);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-900">
      <div className="absolute inset-0 bg-[url('image/bg/starry-night.avif')] bg-cover bg-center opacity-20"></div>
      <div className="relative w-96 p-8 bg-white/30 rounded-lg shadow-lg text-white border border-white">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <label
              className={`absolute left-3 text-sm transition-all ${
                focusField === "username" || inputValues.username
                  ? "-top-3 left-3 text-xs text-white"
                  : "top-6 text-white"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              value={inputValues.username}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, username: e.target.value });
                if (errors.username) {
                  setErrors({ ...errors, username: "" });
                }
              }}
            />
            <span className="absolute right-3 top-6 text-white">
              <FaRegUser />
            </span>
            {errors.username && (
              <label className="text-red-500 text-xs mt-1">{errors.username}</label>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              className={`absolute left-3 text-sm transition-all ${
                focusField === "password" || inputValues.password
                  ? "-top-3 left-3 text-xs text-white"
                  : "top-6 text-white"
              }`}
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={inputValues.password}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-6 text-white focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <label className="text-red-500 text-xs mt-1">{errors.password}</label>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-white text-gray-600 py-2 rounded-lg font-bold transition cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="register" className="font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
