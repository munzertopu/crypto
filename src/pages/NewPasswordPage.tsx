import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LottieAnimation from "../components/LottieAnimation";
import AuthLayout from "../components/layouts/AuthLayout";

interface NewPasswordPageProps {
  onBackToLogin?: () => void;
  email?: string;
}

const NewPasswordPage: React.FC<NewPasswordPageProps> = ({
  onBackToLogin,
  email = "jon.doe@gmail.com",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [password, setPassword] = useState("");

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

  // Check if form is complete
  const isFormComplete = isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New password set for:", email);
    console.log("Password:", password);
  };

  return (
    <AuthLayout>
      {/* Left Side - New Password Form */}

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-[#0E201E] mb-2 text-left">
          Set New Password
        </h1>
      </div>

      {/* Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
                  : "border-gray-150"
              }`}
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword
                  ? "Hide new password field"
                  : "Show new password field"
              }
            >
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />{" "}
                </svg>
                Special characters, & number
              </div>
            </div>
          )}
        </div>

        {/* Set Password Button */}
        <div>
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
              isFormComplete ? "opacity-100" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: isFormComplete ? "#75AE46" : "#9CA3AF" }}
            aria-label="Set new password and complete reset"
          >
            Set New Password
          </button>
        </div>

        {/* Back to Login Link */}
        {/* <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button 
                  type="button"
                  onClick={onBackToLogin}
                  className="font-medium hover:text-green-500 focus:outline-none"
                  style={{color: '#75AE46'}}
                >
                  Back to login
                </button>
              </p>
            </div> */}
      </form>
    </AuthLayout>
  );
};

export default NewPasswordPage;
