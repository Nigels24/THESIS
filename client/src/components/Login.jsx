import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bscslogs from "../assets/bscslogs.png";
import api from "../configs/axios-base-url";
import useAuthStore from "../store/auth.store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { decodeToken } from "../utils/token";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const handleLOGIN = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth", {
        email,
        password,
      });
      if (response.data) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        localStorage.setItem("token", response.data);

        setUser({ username: email });

        console.log(error);
      }

      if (response.data) {
        localStorage.setItem("token", response.data.data);

        const details = decodeToken(localStorage.getItem("token"));
        const role = details.role;

        if (role === "admin") {
          navigate("/Adminpage", { replace: true });
        } else {
          navigate("/AProfile", { replace: true });
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        console.error("An error occurred during login:", error.response.data);
      } else if (error.request) {
        setError("Network error, please try again.");
        console.error("An error occurred during login: Network error");
      } else {
        setError("An error occurred, please try again.");
        console.error("An error occurred during login:", error.message);
      }
    }
  };

  // ... (rest of the code remains unchanged)

  return (
    <div className="bg-emerald-400 flex justify-center items-center min-h-screen">
      <div className="bg-green-300 rounded-lg shadow-md sm:w-auto w-1/3 mx-auto py-8 mt-5">
        <div className="relative inline-block w-28 mt-2 mx-2 text-center sm:inline-block sm:w-28 md:w-40 sm:mx-auto">
          <img src={bscslogs} className="sm:w-auto lg:w-auto" alt="WMSU Logs" />
          <Link to="/Registration">
            <button className=" mt-2 p-1 w-full">
              {" "}
              <u>Create an Account</u>
            </button>
          </Link>
        </div>
        <div className="relative inline-block float-right m-2 sm:w-auto ">
          <form onSubmit={handleLOGIN}>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1 ">
                <strong>Email </strong>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                <strong>Password</strong>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded pr-10" // added padding for the button/icon
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 mt-3 mr-2 cursor-pointer bg-slate-50"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-black rounded hover:bg-blue-600 transition duration-300 mb-2 py-2"
            >
              <strong>Login</strong>
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
