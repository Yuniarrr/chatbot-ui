import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", username);
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen w-full flex-row gap-x-5">
      <div className="my-auto w-1/2">
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex w-1/2 flex-col gap-y-3">
            <div>
              <label
                htmlFor="Email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="abc@gmail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="password"
                required
              />
            </div>
            <p className="text-right text-sm text-gray-400">Forgot password?</p>
            <div className="flex w-full flex-row justify-end">
              <Link
                to="/dashboard"
                className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-blue-400"></div>
    </div>
  );
};

export default Login;
