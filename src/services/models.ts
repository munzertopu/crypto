/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsNotEmpty, IsEmail, MaxLength } from "class-validator";

export namespace Models {
  export class BaseValidation {
    public CustomValidator: ((propertyName: string, value: any) => Promise<string | null>) | null = null;
    protected BaseValidator = async (propertyName: string, value: any): Promise<string | null> => {
      if (this.CustomValidator) {
        try {
          return await this.CustomValidator(propertyName, value);
        } catch (e) {
          return (e && (e as Error).message) ? (e as Error).message : 'Custom validator error';
        }
      }
      return null;
    }
  }
}

export class ResponseBase extends Models.BaseValidation {
  public ResponseType?: number | null = null;
  public Success: boolean = false;
  public Message: string | null = null;
  constructor() { super(); }
}

export class SuccessfulResponse extends ResponseBase {
  constructor() {
    super();
    this.Success = true;
  }
}

export namespace Models {
  export enum ResponseType {
    SuccessfulResponse = 1,
    LoginResponse = 2,
    Profile = 3,
    InitialDataResponse = 4,
    VerifiedResponse = 5,
    PasswordResetResponse = 6,
    BooleanResponse = 7,
    Exception = 8,
    CreatePasswordResetResponse = 9,
  }
  export namespace Authentication {
    export class Login extends Models.BaseValidation {
      @IsNotEmpty()
      @MaxLength(200)
      @IsEmail()
      public EmailAddress: string | null = null;
      
      @IsNotEmpty()
      @MaxLength(50)
      public Password: string | null = null;
      
      public UserId: number | null = null;
      public AccessIds: string[] | null = null;
      public InviteToken: string | null = null;
      constructor() { super(); }
    }

    export class LoginResponse extends ResponseBase {
      public Jwt: string | null = null;
      public AccessId: string | null = null;
      public FoundUsers: any[] | null = null;
      public PasswordResetId: string | null = null;
    }

    export class ChangePassword extends Models.BaseValidation {
      @IsNotEmpty()
      @MaxLength(50)
      public CurrentPassword: string | null = null;
      
      @IsNotEmpty()
      @MaxLength(50)
      public NewPassword: string | null = null;
      constructor() { super(); }
    }

    export class InitialDataResponse extends ResponseBase { }
  }
}
