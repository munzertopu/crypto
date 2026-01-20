/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { CommandService } from "../../../services/Commands";
import { Models } from "../../../services/models";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";

interface ChangePasswordTabProps {
  authenticationService: AuthenticationService;
  commandService: CommandService;
}

const ChangePasswordTab: React.FC<ChangePasswordTabProps> = ({
  authenticationService,
  commandService,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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

  // Update password validation when new password changes
  useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword]);

  // Check if password meets all requirements
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    // Validation
    if (!currentPassword.trim()) {
      setErrorMessage("Current password is required");
      setShowError(true);
      setShowSuccess(false);
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("New password is required");
      setShowError(true);
      setShowSuccess(false);
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage("New password does not meet all requirements");
      setShowError(true);
      setShowSuccess(false);
      return;
    }

    // if (currentPassword === newPassword) {
    //     setErrorMessage("New password must be different from current password");
    //     setShowError(true);
    //     setShowSuccess(false);
    //     return;
    // }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setShowError(false);
    setShowSuccess(false);

    try {
      const changePasswordModel = new Models.Authentication.ChangePassword();
      changePasswordModel.CurrentPassword = currentPassword;
      changePasswordModel.NewPassword = newPassword;

      await authenticationService.ChangePassword(changePasswordModel);

      setSuccessMessage("Password changed successfully!");
      setShowSuccess(true);
      setShowError(false);

      // Clear form after successful change
      setTimeout(() => {
        setCurrentPassword("");
        setNewPassword("");
        setSuccessMessage(null);
        setShowSuccess(false);
      }, 3000);
    } catch (error: any) {
      const errorMsg =
        error?.message ||
        error?.toString() ||
        "Failed to change password. Please try again.";
      setErrorMessage(errorMsg);
      setShowError(true);
      setShowSuccess(false);
      commandService.Error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="md:space-y-8 mt-5 md:mt-0">
      {showSuccess && successMessage && (
        <div className="mb-4">
          <SuccessNotification
            message={successMessage}
            isVisible={showSuccess}
            onClose={() => {
              setShowSuccess(false);
              setSuccessMessage(null);
            }}
          />
        </div>
      )}

      {showError && errorMessage && (
        <div className="mb-4">
          <ErrorNotification
            message={errorMessage}
            isVisible={showError}
            onClose={() => {
              setShowError(false);
              setErrorMessage(null);
            }}
          />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="currentPassword"
              className={`block text-sm font-medium text-left mb-2 text-gray-800 dark:text-gray-300`}
            >
              Current Password
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrorMessage(null);
                }}
                className={`text-base bg-transparent py-3 border-default dark:border-gray-700 dark:text-white pr-10`}
                disabled={isSaving}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={
                  showCurrentPassword ? "Hide password" : "Show password"
                }
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className={`block text-sm font-medium text-left mb-2 text-gray-800 dark:text-gray-300`}
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrorMessage(null);
                }}
                className={`text-base bg-transparent py-3 border-default dark:border-gray-700 dark:text-white pr-10 ${
                  newPassword && !isPasswordValid
                    ? "border-red-500 focus:border-red-500"
                    : newPassword && isPasswordValid
                      ? "border-green-500 focus:border-green-500"
                      : ""
                }`}
                disabled={isSaving}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                />
              </button>
            </div>

            {/* Password Requirements */}
            {newPassword && (
              <div className="mt-3 space-y-1 text-xs">
                <div
                  className={`flex items-center ${passwordValidation.hasMinLength ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={
                      passwordValidation.hasMinLength
                        ? faCheckCircle
                        : faXmarkCircle
                    }
                    className="w-3 h-3 mr-2"
                  />
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center ${passwordValidation.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={
                      passwordValidation.hasLowerCase
                        ? faCheckCircle
                        : faXmarkCircle
                    }
                    className="w-3 h-3 mr-2"
                  />
                  At least one lowercase letter
                </div>
                <div
                  className={`flex items-center ${passwordValidation.hasUpperCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={
                      passwordValidation.hasUpperCase
                        ? faCheckCircle
                        : faXmarkCircle
                    }
                    className="w-3 h-3 mr-2"
                  />
                  At least one uppercase letter
                </div>
                <div
                  className={`flex items-center ${passwordValidation.hasNumber ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={
                      passwordValidation.hasNumber
                        ? faCheckCircle
                        : faXmarkCircle
                    }
                    className="w-3 h-3 mr-2"
                  />
                  At least one number
                </div>
                <div
                  className={`flex items-center ${passwordValidation.hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={
                      passwordValidation.hasSpecialChar
                        ? faCheckCircle
                        : faXmarkCircle
                    }
                    className="w-3 h-3 mr-2"
                  />
                  At least one special character
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Separator */}
      <div
        className="hidden md:block border-t border-default my-8 dark:border-gray-700"
        role="separator"
      ></div>

      {/* Save Button */}
      <div className="flex md:justify-end pt-8 md:pt-2">
        <button
          onClick={handleSave}
          disabled={isSaving || !isPasswordValid || !currentPassword.trim()}
          className={`w-full md:w-auto text-base px-5 py-3 border-0 rounded-lg font-medium ${
            isSaving || !isPasswordValid || !currentPassword.trim()
              ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-500"
              : "bg-[#90C853] text-[#0E201E]"
          }`}
        >
          {isSaving ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0E201E]"
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
              Changing Password...
            </span>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordTab;
