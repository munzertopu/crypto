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
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-[#0E201E] mb-2 text-left">
          Login
        </h1>
        <p className="text-base sm:text-lg text-[#2F3232] text-left">
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
            className="block w-full my-1 py-2 px-4 border border-gray-300 rounded-xl focus:outline-none placeholder:text-base"
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
              style={{ color: "#75AE46" }}
              aria-label="Navigate to forgot password page"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full my-1 py-2 px-4 border border-gray-300 rounded-xl focus:outline-none"
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
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
              />
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
              onClick={onSignUpClick}
              className="font-medium focus:outline-none"
              style={{ color: "#75AE46" }}
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
