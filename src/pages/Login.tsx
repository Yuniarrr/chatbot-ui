import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ErrorModal from "../components/modal/ErrorModal";

const Login = () => {
  const { login } = useAuth();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (input.email !== "" && input.password !== "") {
      const response = await login(input.email, input.password);
      if (response?.status !== 200 && response?.status !== 201) {
        setErrorMessage(response?.response?.data?.detail);
      }

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
    }
    // alert("please provide a valid input");
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    setErrorMessage("Masukkan email dan password");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen w-full flex-row gap-x-5">
      <div className="my-auto w-full sm:w-1/2">
        <div className="flex flex-col items-center gap-y-2">
          <label htmlFor="title" className="my-2 text-2xl font-semibold">
            Selamat Datang
          </label>
          <div className="flex w-1/2 flex-col gap-y-3">
            <div>
              <label
                htmlFor="Email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="abc@gmail.com"
                required
                onChange={handleInput}
              />
            </div>
            <div>
              <label
                htmlFor="Password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="password"
                required
                onChange={handleInput}
              />
            </div>
            {/* <p className="text-right text-sm text-gray-400">Forgot password?</p> */}
            <div className="relative flex w-full flex-row justify-end">
              <button
                onClick={handleSubmitEvent}
                className="me-2 mb-2 cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-1/2 flex-col items-center justify-center bg-blue-400 sm:flex">
        <p className="text-2xl font-bold">CATI</p>
        <p className="text-xl">
          Chatbot Departemen <br className="block xl:hidden" />
          Teknologi Informasi
        </p>
      </div>

      <ErrorModal errorMessage={errorMessage} />
    </div>
  );
};

export default Login;
