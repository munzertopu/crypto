/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { CommandService } from "../../../services/Commands";
import { Models } from "../../../services/models";
import MagnaForm from "../../../components/common/MagnaForm";
import InputControl from "../../../components/common/InputControl";
import { validateAll, ValidatePassword } from "../../../helpers/validation";
import { ValidationError } from "class-validator";

interface ChangePasswordTabProps {
  authenticationService: AuthenticationService;
  commandService: CommandService;
}

const ChangePasswordTab: React.FC<ChangePasswordTabProps> = ({
  authenticationService,
  commandService,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [validPassword, setValidPassword] = useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const [model, setModel] = useState<Models.Authentication.ChangePassword>(new Models.Authentication.ChangePassword());

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSaving) {
      return;
    }
    const validationErrors: ValidationError[] = validateAll(
      model,
      Models.Authentication.ChangePassword
    );
    if (!(validPassword[0] && validPassword[1] && validPassword[2] && validPassword[3] && validPassword[4])) {
      return;
    }
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      await authenticationService.ChangePassword(model);
      commandService.ShowMessage("Password changed successfully!", () => {
        setTimeout(() => {
          commandService.CloseChangePassword();
        }, 200);
      });
    } catch (error: any) {
      commandService.Error(error.toString());
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    commandService.CloseChangePassword();
  };

  const handleInputChange = (propertyKey: string, value: any) => {
    if (propertyKey === "NewPassword") {
      setValidPassword(ValidatePassword(value));
    }
    setModel((prev) => {
      if (!prev) return prev;
      (prev as any)[propertyKey] = value;
      return prev;
    });
  };

  return (
    <div className="md:space-y-8 mt-5 md:mt-0">
      <MagnaForm onSubmit={handleSave} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputControl
            obj={model}
            selector={(m) => m.CurrentPassword}
            onChange={handleInputChange}
            errors={errors}
            setErrors={setErrors}
            labelOverride="Current Password"
            placeHolderOverride="Enter current password"
            dataTypeOverride="password"
          />

          <div>
            <InputControl
              obj={model}
              selector={(m) => m.NewPassword}
              onChange={handleInputChange}
              errors={errors}
              setErrors={setErrors}
              labelOverride="New Password"
              placeHolderOverride="Enter new password"
              dataTypeOverride="password"
              forceUpdateOnKey={true}
            />

            {/* Password Requirements */}
            {model.NewPassword && (
              <div className="mt-3 space-y-1 text-xs">
                <div
                  className={`flex items-center ${validPassword[0] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={validPassword[0] ? faCheckCircle : faXmarkCircle}
                    className="w-3 h-3 mr-2"
                  />
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center ${validPassword[1] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={validPassword[1] ? faCheckCircle : faXmarkCircle}
                    className="w-3 h-3 mr-2"
                  />
                  At least one lowercase letter
                </div>
                <div
                  className={`flex items-center ${validPassword[2] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={validPassword[2] ? faCheckCircle : faXmarkCircle}
                    className="w-3 h-3 mr-2"
                  />
                  At least one uppercase letter
                </div>
                <div
                  className={`flex items-center ${validPassword[3] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={validPassword[3] ? faCheckCircle : faXmarkCircle}
                    className="w-3 h-3 mr-2"
                  />
                  At least one number
                </div>
                <div
                  className={`flex items-center ${validPassword[4] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <FontAwesomeIcon
                    icon={validPassword[4] ? faCheckCircle : faXmarkCircle}
                    className="w-3 h-3 mr-2"
                  />
                  At least one special character
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div
          className="hidden md:block border-t border-default my-8 dark:border-gray-700"
          role="separator"
        ></div>

        {/* Action Buttons */}
        <div className="flex md:justify-end pt-8 md:pt-2 gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="w-full md:w-auto text-base px-5 py-3 border-0 rounded-lg font-medium bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || !(validPassword[0] && validPassword[1] && validPassword[2] && validPassword[3] && validPassword[4])}
            className={`w-full md:w-auto text-base px-5 py-3 border-0 rounded-lg font-medium ${
              isSaving || !(validPassword[0] && validPassword[1] && validPassword[2] && validPassword[3] && validPassword[4])
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
      </MagnaForm>
    </div>
  );
};

export default ChangePasswordTab;
