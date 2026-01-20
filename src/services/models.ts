// Authentication models based on reference project architecture

export class ResponseBase {
    public Success: boolean = false;
    public Message: string | null = null;
}

export class SuccessfulResponse extends ResponseBase {
    constructor() {
        super();
        this.Success = true;
    }
}

export class Login {
    public EmailAddress: string | null = null;
    public Password: string | null = null;
    public UserId: number | null = null;
    public AccessIds: string[] | null = null;
    public InviteToken: string | null = null;
}

export class LoginResponse extends ResponseBase {
    public Jwt: string | null = null;
    public AccessId: string | null = null;
    public FoundUsers: any[] | null = null;
    public PasswordResetId: string | null = null;
}

export class ChangePassword {
    public CurrentPassword: string | null = null;
    public NewPassword: string | null = null;
}

export class InitialDataResponse extends ResponseBase {
    // Add fields as needed for initial data
}

// Compatibility export object to match Models.Authentication.* pattern
export const Models = {
    Authentication: {
        Login,
        LoginResponse,
        ChangePassword,
        InitialDataResponse,
    },
};
