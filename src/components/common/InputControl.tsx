/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
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

    // Try to get metadata for data type and label
    const options = Reflect.getMetadata?.(
        "magnaAltaDisplay:options",
        obj.constructor.prototype,
        propertyKey
    ) || {};

    const effectiveDataType = dataTypeOverride ?? options?.DataType;
    const inputType = getInputTypeFromDataType(effectiveDataType);
    
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
                }`}
                placeholder={placeHolder}
                readOnly={props.isReadOnly}
                autoComplete={autoComplete === false ? (inputType === "password" ? "new-password" : "off") : undefined}
            />
            {errorMessage && !hideErrors && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
}

export default InputControl;
