import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LottieAnimation from "../components/LottieAnimation";
import { Checkbox, Typography } from "@material-tailwind/react";
import AuthLayout from "../components/layouts/AuthLayout";

interface RegisterPageProps {
  onLoginClick?: () => void;
  onRegistrationComplete?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onLoginClick,
  onRegistrationComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const [fullName, setFullName] = useState("Jon Doe");
  const [email, setEmail] = useState("jon.doe@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cryptoNews, setCryptoNews] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  // Password validation function
  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordValidation({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    });
  };

  // Update password validation when password changes
  useEffect(() => {
    validatePassword(password);
  }, [password]);

  // Check if password meets all requirements
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt:", {
      fullName,
      email,
      password,
      confirmPassword,
      cryptoNews,
      productUpdates,
    });
    // Navigate to welcome page after successful registration
    if (onRegistrationComplete) {
      onRegistrationComplete();
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-[#0E201E] mb-2 text-left">
          Welcome to Portal!
        </h1>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                password.length > 0
                  ? isPasswordValid
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
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

          {/* Password Validation Rules */}
          {password.length > 0 && (
            <div className="mt-3 space-y-2">
              <div
                className={`flex items-center text-sm ${
                  passwordValidation.hasUpperCase &&
                  passwordValidation.hasLowerCase
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${
                    passwordValidation.hasUpperCase &&
                    passwordValidation.hasLowerCase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />{" "}
                </svg>
                One uppercase & lowercase letter
              </div>
              <div
                className={`flex items-center text-sm ${
                  passwordValidation.hasMinLength
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${
                    passwordValidation.hasMinLength
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />{" "}
                </svg>
                Minimum 8 characters
              </div>
              <div
                className={`flex items-center text-sm ${
                  passwordValidation.hasNumber &&
                  passwordValidation.hasSpecialChar
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${
                    passwordValidation.hasNumber &&
                    passwordValidation.hasSpecialChar
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />{" "}
                </svg>
                Special characters, & number
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Type a password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleConfirmPasswordVisibility}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password field"
                  : "Show confirm password field"
              }
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
              />
            </button>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cryptoNews"
              checked={cryptoNews}
              onChange={(e) => setCryptoNews(e.target.checked)}
              className="w-4 h-4 rounded-sm border border-[rgba(225, 227, 229, 1)] bg-white"
              style={{ backgroundColor: "#75AE46" }}
            >
              <Checkbox.Indicator
                className="text-white"
                style={{ backgroundColor: "#75AE46" }}
              />
            </Checkbox>
            <Typography
              as="label"
              htmlFor="cryptoNews"
              className="cursor-pointer text-gray-900 text-sm "
            >
              Send me news related to crypto taxes
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="productUpdates"
              checked={productUpdates}
              onChange={(e) => setProductUpdates(e.target.checked)}
              className="w-4 h-4 rounded-sm border border-[rgba(225, 227, 229, 1)] bg-white"
              style={{ backgroundColor: "#75AE46" }}
            >
              <Checkbox.Indicator
                className="text-white"
                style={{ backgroundColor: "#75AE46" }}
              />
            </Checkbox>
            <Typography
              as="label"
              htmlFor="productUpdates"
              className="cursor-pointer text-gray-900 text-sm "
            >
              Send me product updates & discounts
            </Typography>
          </div>
        </div>

        {/* Create Account Button */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            style={{ backgroundColor: "#75AE46" }}
            aria-label="Create new portal account"
          >
            Create Portal Account
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <div>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Sign up with Google account"
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span className="ml-2">Continue with Google</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have a Portal Account?{" "}
            <button
              onClick={onLoginClick}
              className="font-medium hover:text-green-500 focus:outline-none"
              style={{ color: "#75AE46" }}
              aria-label="Navigate to login page"
            >
              Log in here
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
