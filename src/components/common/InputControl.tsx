/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { ValidationError } from "class-validator";
import { validateField } from "../../helpers/validation";

export enum IconPosition {
    Start = "start",
    End = "end"
}

export enum LabelPosition {
    Top = "top",
    Inside = "inside"
}

export interface FormInputProps<T extends object> {
    obj: T;
    selector: (obj: T) => any;
    onChange: (propertyKey: string, value: any) => void;
    errors: ValidationError[];
    setErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
    icon?: any;
    iconLibrary?: any;
    labelPosition?: LabelPosition;
    iconPosition?: IconPosition;
    helpInformation?: string | null;
    exampleInformation?: string | null;
    labelOverride?: string | null;
    placeHolderOverride?: string | null;
    isReadOnly?: boolean;
    forceUpdateOnKey?: boolean;
    hideErrors?: boolean;
    autoComplete?: boolean;
    dataTypeOverride?: any | null;
}

export function getPropertyName<T>(selector: (obj: T) => any): string {
    const funcStr = selector.toString();
    const match = funcStr.match(/\.([a-zA-Z0-9_]+)/);

    if (!match || !match[1]) {
        console.error(
            "Failed to extract property name from selector:",
            selector
        );
        throw new Error("Invalid selector. Could not extract property name.");
    }
    return match[1];
}

function getInputTypeFromDataType(dt?: any): string {
    if (!dt) return "text";
    // Simplified mapping for auth flows
    if (dt === "email" || dt === 14) return "email"; // EmailAddress
    if (dt === "password" || dt === 12) return "password"; // Password
    return "text";
}

function InputControl<T extends object>(props: FormInputProps<T>) {
    const {
        obj,
        selector,
        onChange,
        errors,
        setErrors,
        labelPosition = LabelPosition.Top,
        hideErrors = false,
        autoComplete = true,
        dataTypeOverride = null,
        placeHolderOverride = null,
        labelOverride = null
    } = props;

    const propertyKey = getPropertyName(selector);
    const [localValue, setLocalValue] = useState<any>((obj as any)[propertyKey] ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Try to get metadata for data type and label
    const options = Reflect.getMetadata?.(
        "magnaAltaDisplay:options",
        obj.constructor.prototype,
        propertyKey
    ) || {};

    const effectiveDataType = dataTypeOverride ?? options?.DataType;
    const baseInputType = getInputTypeFromDataType(effectiveDataType);
    // For password fields, allow toggling between password and text
    const inputType = baseInputType === "password" && showPassword ? "text" : baseInputType;
    const isPasswordField = baseInputType === "password";
    
    const label: string = labelOverride ?? (options?.Label ?? propertyKey);
    const placeHolder: string = placeHolderOverride ?? (options?.PlaceHolder ?? label);

    // Keep localValue in sync with external object
    useEffect(() => {
        if (!isFocused) {
            const incoming = (obj as any)[propertyKey];
            setLocalValue(incoming ?? "");
        }
    }, [obj, propertyKey, isFocused]);

    const error = errors.find(x => x.target === obj && x.property === propertyKey);
    const errorMessage = error ? Object.values(error.constraints || {}).join(", ") : "";

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        setLocalValue(newVal);
        if (!isFocused || props.forceUpdateOnKey === true) {
            handleBlur(newVal);
        }
    };

    const handleBlur = (newValue?: any) => {
        const key = propertyKey as keyof T;
        const valueToSet = (newValue ?? localValue)?.trim() || null;
        (obj as any)[key] = valueToSet;
        onChange(propertyKey, valueToSet);
        setIsFocused(false);

        // Validate field
        if (obj && obj.constructor) {
            const fieldErrors = validateField(
                obj,
                propertyKey,
                obj.constructor as { new(): T }
            );
            
            // Remove existing error for this field
            const foundErrorPosition = errors.findIndex(x => x.target === obj && x.property === propertyKey);
            if (foundErrorPosition > -1) {
                errors.splice(foundErrorPosition, 1);
            }
            
            // Add new error if validation failed
            if (fieldErrors !== null) {
                errors.push(fieldErrors);
            }
            setErrors([...errors]);
        }
    };

    return (
        <div className="my-4">
            {labelPosition === LabelPosition.Top && (
                <label
                    htmlFor={propertyKey}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 my-2 block"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={propertyKey}
                    type={inputType}
                    value={localValue ?? ""}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => handleBlur()}
                    className={`text-gray-900 dark:text-gray-100 block w-full my-1 py-2 px-4 border rounded-xl focus:outline-none placeholder:text-base dark:bg-transparent ${
                        errorMessage
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-700 focus:border-green-500"
                    } ${isPasswordField ? "pr-10" : ""}`}
                    placeholder={placeHolder}
                    readOnly={props.isReadOnly}
                    autoComplete={autoComplete === false ? (baseInputType === "password" ? "new-password" : "off") : undefined}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowPassword(!showPassword);
                        }}
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.8 15.53 3.72 12 3.72C8.46997 3.72 5.17997 5.8 2.88997 9.4C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73C8.46997 3.73 5.17997 5.81 2.88997 9.41C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.42004 19.53C9.56004 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39999C20.78 8.87999 20.42 8.38999 20.05 7.92999"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.47 14.53L2 22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22 2L14.53 9.47"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {errorMessage && !hideErrors && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
}

export default InputControl;
