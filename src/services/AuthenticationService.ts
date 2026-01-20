import { BaseService, type OnJwtChange } from './BaseService';
import { Models, SuccessfulResponse } from './models';

export class AuthenticationService extends BaseService {
    constructor(
        baseUrl: string,
        jwt: string | null,
        jwtChanged: OnJwtChange,
        connectionId: string | null = null
    ) {
        super(baseUrl, jwt, jwtChanged, connectionId);
    }

    public async Authenticate(
        model: Models.Authentication.Login
    ): Promise<Models.Authentication.LoginResponse> {
        const response = await this.Post(`${this.baseUrl}/Authentication/Authenticate`, model);

        if (!response) {
            throw new Error("Response is null");
        }

        // Check if already an instance
        if (response instanceof Models.Authentication.LoginResponse) {
            return response;
        }

        // Cast to any to access all properties from JSON response
        const jsonResponse = response as any;

        // Check ResponseType with type coercion (handle both string and number)
        const responseType = jsonResponse.ResponseType != null
            ? (typeof jsonResponse.ResponseType === 'string'
                ? parseInt(jsonResponse.ResponseType, 10)
                : Number(jsonResponse.ResponseType))
            : null;

        // Primary check: if Jwt exists OR ResponseType is 2, it's a LoginResponse
        if (jsonResponse.Jwt != null || responseType === 2 || responseType === Models.ResponseType.LoginResponse) {
            const loginResponse = new Models.Authentication.LoginResponse();
            loginResponse.AccessId = jsonResponse.AccessId ?? null;
            loginResponse.Jwt = jsonResponse.Jwt ?? null;
            loginResponse.PasswordResetId = jsonResponse.PasswordResetId ?? null;
            loginResponse.FoundUsers = jsonResponse.FoundUsers ?? null;
            loginResponse.ResponseType = responseType ?? Models.ResponseType.LoginResponse;
            loginResponse.Success = jsonResponse.Success ?? false;
            loginResponse.Message = jsonResponse.Message ?? null;
            return loginResponse;
        }

        // This should never be reached if the above check worked, but keeping as safety fallback
        if (responseType === Models.ResponseType.LoginResponse || responseType === 2) {
            const loginResponse = new Models.Authentication.LoginResponse();
            loginResponse.AccessId = jsonResponse.AccessId ?? null;
            loginResponse.Jwt = jsonResponse.Jwt ?? null;
            loginResponse.PasswordResetId = jsonResponse.PasswordResetId ?? null;
            loginResponse.FoundUsers = jsonResponse.FoundUsers ?? null;
            loginResponse.ResponseType = responseType;
            loginResponse.Success = jsonResponse.Success ?? false;
            loginResponse.Message = jsonResponse.Message ?? null;
            return loginResponse;
        }

        // Only handle exception if response indicates an error
        if (jsonResponse && jsonResponse.Message) {
            this.HandleExceptionResponse(response);
        }
        throw new Error(`Response is not as expected. ResponseType: ${jsonResponse?.ResponseType}, Has Jwt: ${!!jsonResponse?.Jwt}`);
    }

    public async ChangePassword(
        model: Models.Authentication.ChangePassword
    ): Promise<SuccessfulResponse> {
        const response = await this.Post(`${this.baseUrl}/Authentication/ChangePassword`, model);
        if (response && (response.ResponseType === Models.ResponseType.SuccessfulResponse || response.Success === true)) {
            const successResponse = new SuccessfulResponse();
            successResponse.Success = true;
            successResponse.Message = response.Message ?? null;
            return successResponse;
        }
        this.HandleExceptionResponse(response);
        throw new Error("Response is not as expected");
    }

    public async Logout(): Promise<SuccessfulResponse> {
        const response = await this.Get(`${this.baseUrl}/Authentication/Logout`);
        if (response instanceof SuccessfulResponse ||
            (response && 'Success' in response)) {
            return response as SuccessfulResponse;
        }
        this.HandleExceptionResponse(response);
        throw new Error("Response is not as expected");
    }

    public async InitialData(): Promise<Models.Authentication.InitialDataResponse> {
        const response = await this.Get(`${this.baseUrl}/Authentication/InitialData`);

        if (!response) {
            throw new Error("Response is null");
        }

        // Check if already an instance
        if (response instanceof Models.Authentication.InitialDataResponse) {
            return response;
        }

        // Cast to any to access all properties from JSON response
        const jsonResponse = response as any;

        // Check ResponseType with type coercion (handle both string and number)
        const responseType = jsonResponse.ResponseType != null
            ? (typeof jsonResponse.ResponseType === 'string'
                ? parseInt(jsonResponse.ResponseType, 10)
                : Number(jsonResponse.ResponseType))
            : null;

        // Parse response based on ResponseType (matching reference-project's ParseResponse pattern)
        if (responseType === Models.ResponseType.InitialDataResponse || responseType === 4) {
            const initialDataResponse = new Models.Authentication.InitialDataResponse();
            initialDataResponse.ResponseType = responseType;
            initialDataResponse.Success = jsonResponse.Success ?? false;
            initialDataResponse.Message = jsonResponse.Message ?? null;
            // Entities will be handled by Application/entity collections later
            return initialDataResponse;
        }

        // Fallback: if Entities property exists, treat as InitialDataResponse
        if (jsonResponse.Entities !== undefined) {
            const initialDataResponse = new Models.Authentication.InitialDataResponse();
            initialDataResponse.ResponseType = Models.ResponseType.InitialDataResponse;
            initialDataResponse.Success = jsonResponse.Success ?? false;
            initialDataResponse.Message = jsonResponse.Message ?? null;
            return initialDataResponse;
        }

        this.HandleExceptionResponse(response);
        throw new Error("Response is not as expected");
    }
}
