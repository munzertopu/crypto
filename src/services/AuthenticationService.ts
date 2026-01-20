// Authentication service based on reference project architecture
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
        if (response instanceof Models.Authentication.LoginResponse ||
            (response && 'Jwt' in response)) {
            return response as Models.Authentication.LoginResponse;
        }
        this.HandleExceptionResponse(response);
        throw new Error("Response is not as expected");
    }

    public async ChangePassword(
        model: Models.Authentication.ChangePassword
    ): Promise<SuccessfulResponse> {
        const response = await this.Post(`${this.baseUrl}/Authentication/ChangePassword`, model);

        // Check if response indicates success (either ResponseType = 1 or Success = true)
        if (response && (response.ResponseType === 1 || response.Success === true)) {
            const successResponse = new SuccessfulResponse();
            successResponse.Success = true;
            successResponse.Message = response.Message ?? null;
            return successResponse;
        }

        // Check for exception/error response
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
        if (response instanceof Models.Authentication.InitialDataResponse ||
            (response && response.Success !== undefined)) {
            return response as Models.Authentication.InitialDataResponse;
        }
        this.HandleExceptionResponse(response);
        throw new Error("Response is not as expected");
    }
}
