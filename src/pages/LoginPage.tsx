/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { AuthenticationService } from "../services/AuthenticationService";
import { CommandService } from "../services/Commands";
import { Models } from "../services/models";

interface LoginPageProps {
  authenticationService: AuthenticationService;
  commandService: CommandService;
  redirectUrl: string | null;
  accessIds: string[] | null;
  token: string | null;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({
  authenticationService,
  commandService,
  redirectUrl,
  accessIds,
  token,
  onSignUpClick,
  onForgotPasswordClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginModel, setLoginModel] = useState<Models.Authentication.Login>(
    () => {
      return new Models.Authentication.Login();
    },
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!loginModel.EmailAddress?.trim()) {
      newErrors.email = "*Email field cannot be blank";
    } else if (!validateEmail(loginModel.EmailAddress)) {
      newErrors.email = "*Please enter a valid email address";
    }

    // Password validation
    if (!loginModel.Password?.trim()) {
      newErrors.password = "*Password field cannot be blank";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear specific field error when user starts typing
  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputChange = (propertyKey: string, value: any) => {
    setLoginModel((prev) => {
      const updated = { ...prev };
      (updated as any)[propertyKey] = value;
      return updated;
    });

    // Clear error for the field being changed
    if (propertyKey === "EmailAddress") {
      clearFieldError("email");
    } else if (propertyKey === "Password") {
      clearFieldError("password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      loginModel.AccessIds = accessIds;
      loginModel.InviteToken = token;

      const response = await authenticationService.Authenticate(loginModel);

      if (response?.Jwt) {
        commandService.LoggedIn(response.Jwt, redirectUrl);
      } else {
        // Handle case where multiple users found or other response
        setIsSubmitting(false);
        if (response.FoundUsers && response.FoundUsers.length > 0) {
          // TODO: Handle multiple users scenario if needed
          commandService.Error("Multiple users found. Please contact support.");
        } else {
          commandService.Error("Invalid credentials. Please try again.");
        }
      }
    } catch (error: any) {
      setIsSubmitting(false);
      const errorMessage =
        error?.message || error?.toString() || "An error occurred during login";
      commandService.Error(errorMessage);
      setErrors({ password: errorMessage });
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <h1
          className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-900 mb-2 text-left
         dark:text-gray-150"
        >
          Login
        </h1>
        <p className="text-base  sm:text-lg text-gray-900 text-left dark:text-gray-250">
          Access your crypto tax tools securely.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="my-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 my-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={loginModel.EmailAddress || ""}
            onChange={(e) => {
              handleInputChange("EmailAddress", e.target.value);
            }}
            className={`text-gray-900 dark:text-gray-100 block w-full my-1 py-2 px-4 border rounded-xl focus:outline-none placeholder:text-base dark:bg-transparent ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-700 focus:border-green-500"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="my-4">
          <div className="flex text-sm justify-between items-center">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 my-0"
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
              className="font-medium focus:outline-none text-green-700 dark:text-green-600"
              aria-label="Navigate to forgot password page"
            >
              Forgot your password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={loginModel.Password || ""}
              onChange={(e) => {
                handleInputChange("Password", e.target.value);
              }}
              className={`text-gray-900 dark:text-gray-100 block w-full my-1 py-2 px-4 border rounded-xl focus:outline-none placeholder:text-base dark:bg-transparent ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-green-500"
              }`}
              placeholder="Type a password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword ? "Hide password field" : "Show password field"
              }
            >
              {showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Sign In Button */}
        <div className="mt-6 mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-lg transition-colors ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            style={{ backgroundColor: "#90C853", color: "black" }}
            aria-label="Sign in to account"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (onSignUpClick) {
                  onSignUpClick();
                }
              }}
              className="font-medium focus:outline-none text-green-700 hover:text-green-600 dark:text-green-600 dark:hover:text-green-700 transition-colors"
              // style={{ color: "#5f9339" }}
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
