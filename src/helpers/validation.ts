/* eslint-disable @typescript-eslint/no-unused-vars */
import { validateSync, ValidationError } from "class-validator";
type Constructor<T> = new () => T;
const rules = {
	length: /^(?=.{8,})/,
	lowercase: /^(?=.*[a-z])/,
	uppercase: /^(?=.*[A-Z])/,
	digit: /^(?=.*\d)/,
	specialChar: /^(?=.*[@$!%*?&])/
};

export function ValidatePassword(password: string): [boolean, boolean, boolean, boolean, boolean] {
	const isLengthValid = rules.length.test(password);
	const isLowercaseValid = rules.lowercase.test(password);
	const isUppercaseValid = rules.uppercase.test(password);
	const isDigitValid = rules.digit.test(password);
	const isSpecialCharValid = rules.specialChar.test(password);

	return [isLengthValid, isLowercaseValid, isUppercaseValid, isDigitValid, isSpecialCharValid];
}
export function validateField<T extends object>(
	obj: T,
	propertyKey: string,
	ctor: Constructor<T>
): ValidationError | null {
	//const instance = Object.assign(new ctor(), obj);

	const validationErrors = validateSync(obj, {
		stopAtFirstError: false,
	});
	return validationErrors.find(x => x.target === obj && x.property === propertyKey) ?? null;
}

export function validateAll<T extends object>(
	obj: T,
	ctor?: Constructor<T>
): ValidationError[] {
	//const instance = Object.assign(new ctor(), obj);

	const validationErrors = validateSync(obj, {
		stopAtFirstError: false,
	});
	const result: ValidationError[] = [];
	for (let iter = 0; iter < validationErrors.length; iter++) {
		const child = validationErrors[iter];
		result.push(...extractValidationError(child));
	}
	return result;
}
function extractValidationError(validationError: ValidationError): ValidationError[] {
	if (validationError.children && validationError.children.length > 0) {
		const result: ValidationError[] = [];
		for (let iter = 0; iter < validationError.children.length; iter++) {
			const child = validationError.children[iter];
			result.push(...extractValidationError(child));
		}
		return result;
	}
	return [validationError];
}
