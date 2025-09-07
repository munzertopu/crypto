import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../components/layouts/AuthLayout";

interface LoginPageProps {
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onSignUpClick,
  onForgotPasswordClick,
  onLoginSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    // Simulate login success - in real app, this would validate credentials
    if (email && password) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-900 mb-2 text-left">
          Login
        </h1>
        <p className="text-base sm:text-lg text-gray-800 text-left">
          Access your crypto tax tools securely.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="my-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 my-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full my-1 py-2 px-4 border border-gray-150 rounded-xl focus:outline-none placeholder:text-base"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="my-4">
          <div className="flex text-sm justify-between items-center">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 my-0"
            >
              Password
            </label>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onForgotPasswordClick) {
                  onForgotPasswordClick();
                }
              }}
              className="font-medium focus:outline-none"
              style={{ color: "#5f9339" }}
              aria-label="Navigate to forgot password page"
            >
              Forgot your password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full my-1 py-2 px-4 border border-gray-150 rounded-xl focus:outline-none"
              placeholder="Type a password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword ? "Hide password field" : "Show password field"
              }
            >
              {/* <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
              /> */}
              {showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42 12 8.42C13.98 8.42 15.58 10.02 15.58 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.8 15.53 3.72 12 3.72C8.46997 3.72 5.17997 5.8 2.88997 9.4C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M14.53 9.47L9.47004 14.53C8.82004 13.88 8.42004 12.99 8.42004 12C8.42004 10.02 10.02 8.42 12 8.42C12.99 8.42 13.88 8.82 14.53 9.47Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73C8.46997 3.73 5.17997 5.81 2.88997 9.41C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.42004 19.53C9.56004 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39999C20.78 8.87999 20.42 8.38999 20.05 7.92999"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.47 14.53L2 22"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 2L14.53 9.47"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="mt-6 mb-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-lg"
            style={{ backgroundColor: "#90C853", color: "black" }}
            aria-label="Sign in to account"
          >
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (onSignUpClick) {
                  onSignUpClick();
                }
              }}
              className="font-medium focus:outline-none"
              style={{ color: "#5f9339" }}
              aria-label="Navigate to sign up page"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
