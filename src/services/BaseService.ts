// Base service class for HTTP requests with JWT handling
import { ResponseBase } from "./models";

export type OnJwtChange = (newJwt: string | null) => void;

export class ServiceError extends Error {
  public ExceptionResponse: any | null;

  constructor(message: string, exceptionResponse: any | null = null) {
    super(message);
    this.ExceptionResponse = exceptionResponse;
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

export class BaseService {
  protected baseUrl: string;
  protected jwt: string | null;
  protected connectionId: string | null;
  protected jwtChanged: OnJwtChange;

  constructor(
    baseUrl: string,
    jwt: string | null,
    jwtChanged: OnJwtChange,
    connectionId: string | null = null,
  ) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
    this.jwtChanged = jwtChanged;
    this.connectionId = connectionId;
  }

  public SetJWT(value: string | null) {
    this.jwt = value;
  }

  public SetConnectionId(value: string | null) {
    this.connectionId = value;
  }

  protected HandleExceptionResponse(response: any): void {
    if (response && response.Message) {
      throw new ServiceError(response.Message ?? "An error occurred", response);
    }
  }

  protected async Post(
    endpoint: string,
    model: any,
  ): Promise<ResponseBase | null> {
    return this.request(endpoint, "POST", model);
  }

  protected async Get(endpoint: string): Promise<ResponseBase | null> {
    return this.request(endpoint, "GET");
  }

  private async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
  ): Promise<ResponseBase | null> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.jwt) {
      headers["Authorization"] = `Bearer ${this.jwt}`;
    }

    if (this.connectionId) {
      headers["ConnectionId"] = this.connectionId;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(endpoint, options);

      // Check for 401 Unauthorized BEFORE trying to parse JSON
      // This means the token is invalid and we should clear it
      if (response.status === 401 && this.jwt) {
        this.jwtChanged(null);
        throw new ServiceError("Unauthorized - token expired or invalid");
      }

      const data = await response.json();

      if (!response.ok) {
        this.HandleExceptionResponse(data);
        throw new ServiceError(
          data.Message || `HTTP error! status: ${response.status}`,
        );
      }

      return data;
    } catch (error) {
      // Don't clear JWT on network errors - only on 401
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError(
        `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
