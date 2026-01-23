/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { AuthenticationService } from "../services/AuthenticationService";
import { CommandService } from "../services/Commands";
import { Models } from "../services/models";
import MagnaForm from "../components/common/MagnaForm";
import InputControl, { LabelPosition } from "../components/common/InputControl";
import { validateAll } from "../helpers/validation";
import { ValidationError } from "class-validator";

interface LoginPageProps {
  authenticationService: AuthenticationService;
  commandService: CommandService;
  redirectUrl: string | null;
  accessIds: string[] | null;
  token: string | null;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
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
  const [loginModel, setLoginModel] = useState<Models.Authentication.Login>(
    () => {
      return new Models.Authentication.Login();
    },
  );
  const [foundUsers, setFoundUsers] = useState<any[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleInputChange = (propertyKey: string, value: any) => {
    setLoginModel((prev) => {
      if (!prev) return prev;
      (prev as any)[propertyKey] = value;
      return prev;
    });
  };

  const SelectUser = (user: any) => {
    loginModel.UserId = user.UserId;
    handleSignIn(null);
  };

  const handleSignIn = async (event: React.FormEvent | null) => {
    event?.preventDefault();
    const validationErrors = validateAll(
      loginModel,
      Models.Authentication.Login
    );

    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    loginModel.AccessIds = accessIds;
    loginModel.InviteToken = token;
    try {
      const response = await authenticationService.Authenticate(
        loginModel
      );

      if (response?.Jwt) {
        commandService.LoggedIn(response.Jwt, redirectUrl);
      }
      else {
        setFoundUsers(response.FoundUsers);
        setIsSaving(false);
      }
    } catch (error: any) {
      commandService.Error(error.toString());
      setIsSaving(false);
    }
  };

  if (foundUsers !== null && foundUsers.length > 0) {
    return (
      <AuthLayout>
        <MagnaForm onSubmit={handleSignIn} noValidate>
          <div className="text-left mb-7">
            <h3 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-900 mb-2 dark:text-gray-150">
              Sign In
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Select a user to continue
            </p>
            {foundUsers.map((x) => (
              <button
                key={x.UserId}
                type="button"
                disabled={isSaving}
                onClick={() => {
                  SelectUser(x);
                }}
                className="block w-full text-left py-2 px-4 text-green-700 dark:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {`${x.NameFirst} ${x.NameLast} (${x.UserId})`}
              </button>
            ))}
          </div>
        </MagnaForm>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <MagnaForm onSubmit={handleSignIn} noValidate>
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-900 mb-2 text-left dark:text-gray-150">
            Login
          </h1>
          <p className="text-base sm:text-lg text-gray-900 text-left dark:text-gray-250">
            Access your crypto tax tools securely.
          </p>
        </div>

        <InputControl
          obj={loginModel}
          selector={(m) => m.EmailAddress}
          onChange={handleInputChange}
          errors={errors}
          setErrors={setErrors}
          labelPosition={LabelPosition.Top}
          labelOverride="Email"
          placeHolderOverride="Enter your email"
          dataTypeOverride="email"
          autoComplete={true}
        />

        <div className="my-4">
          <div className="flex text-sm justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
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
          <InputControl
            obj={loginModel}
            selector={(m) => m.Password}
            onChange={handleInputChange}
            errors={errors}
            setErrors={setErrors}
            labelPosition={LabelPosition.Top}
            labelOverride=""
            placeHolderOverride="Type a password"
            dataTypeOverride="password"
            autoComplete={true}
          />
        </div>

        <div className="mt-6 mb-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-lg transition-colors ${
              isSaving
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            style={{ backgroundColor: "#90C853", color: "black" }}
            aria-label="Sign in to account"
          >
            {isSaving ? (
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

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (onSignUpClick) {
                  onSignUpClick();
                }
              }}
              className="font-medium focus:outline-none text-green-700 hover:text-green-600 dark:text-green-600 dark:hover:text-green-700 transition-colors"
              aria-label="Navigate to sign up page"
            >
              Sign up
            </button>
          </p>
        </div>
      </MagnaForm>
    </AuthLayout>
  );
};

export default LoginPage;
