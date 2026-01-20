/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";
import * as Commands from "./services/Commands";
import { Credentials } from "./services/Credentials";
import { AuthenticationService } from "./services/AuthenticationService";
import ModalManager from "./components/ModalManager";
import type { ModalManagerMethods } from "./components/ModalManager";

export interface CustomJwtPayload {
    sub?: string;
    exp?: number;
    UserId?: number | null;
    PartnerId?: number | null;
    FullName?: string | null;
    AccessId?: string;
    Permissions?: string;
    Accounts?: string;
}

class Application {
    private static BaseUrl = "https://services.dealfinalizer.com"; //"https://localhost:7471"; //"https://services.dealfinalizer.com";//"https://localhost:7471";//  "https://localhost:7471";//

    private rootElement: HTMLElement;
    private _root: Root | null = null;
    private _jwt: string | null = null;
    private _connectionId: string | null = null;
    private _authenticationService: AuthenticationService;
    private _commandService: Commands.CommandService;
    private _credentials: Credentials = new Credentials();
    private _isLoggedIn: boolean = false;
    private _modalManager: React.RefObject<ModalManagerMethods | null> = React.createRef<ModalManagerMethods | null>();

    public get IsLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    private set IsLoggedIn(value: boolean) {
        if (this._isLoggedIn !== value) {
            this._isLoggedIn = value;
            if (this.onAuthStateChange) {
                this.onAuthStateChange(value);
            }
            window.dispatchEvent(
                new CustomEvent("authStateChange", { detail: value }),
            );
        }
    }

    public get Credentials(): Credentials {
        return this._credentials;
    }

    public get AuthenticationService(): AuthenticationService {
        return this._authenticationService;
    }

    public get CommandService(): Commands.CommandService {
        return this._commandService;
    }

    public NavigateTo: (url: string, options?: any) => void = (url: string) => {
        if (window.location.pathname !== url) {
            window.history.pushState(null, "", url);
            window.dispatchEvent(new PopStateEvent("popstate"));
        }
    };

    public CurrentUrl: () => string = () => {
        return window.location.pathname + window.location.search;
    };

    public DisplayingModal: () => void = () => { };
    public ClosedModal: () => void = () => { };
    public onAuthStateChange: ((isLoggedIn: boolean) => void) | null = null;

    private set Jwt(value: string | null) {
        this._jwt = value;
        if (value == null) {
            localStorage.removeItem("jwt");
            this._credentials.NameFull = null;
            this._credentials.UserId = null;
            this._credentials.PartnerId = null;
            this.IsLoggedIn = false;
            return;
        }

        localStorage.setItem("jwt", value);
        this.IsLoggedIn = true;

        try {
            const decoded = jwtDecode<CustomJwtPayload>(value);
            const accessIds =
                JSON.parse(localStorage.getItem("AccessIds") ?? "[]") ?? [];

            if (decoded.AccessId && !accessIds.includes(decoded.AccessId)) {
                accessIds.push(decoded.AccessId);
                localStorage.setItem("AccessIds", JSON.stringify(accessIds));
            }

            this.Credentials.NameFull = decoded.FullName ?? null;
            this.Credentials.UserId = decoded.UserId ?? null;
            this.Credentials.PartnerId = decoded.PartnerId ?? null;
        } catch (error) {
            console.error("Error decoding JWT:", error);
        }
    }

    private OnJwtChange = (newJwt: string | null) => {
        this.Jwt = newJwt;
        this._authenticationService.SetJWT(newJwt);
        this.IsLoggedIn = newJwt != null;
    };

    constructor(rootElementId: string) {
        const rootElement = document.getElementById(rootElementId);
        if (!rootElement) {
            throw new Error(`Element with id ${rootElementId} not found`);
        }
        this.rootElement = rootElement;
        this._root = createRoot(this.rootElement);

        const storedJwt = localStorage.getItem("jwt");
        if (storedJwt) {
            this.Jwt = storedJwt;
            this._isLoggedIn = true;
        }

        this._authenticationService = new AuthenticationService(
            Application.BaseUrl,
            this._jwt,
            this.OnJwtChange.bind(this),
            this._connectionId,
        );

        this._commandService = new Commands.CommandService(
            this.OnCommandExecuted.bind(this),
            this.GetCommandExecutedUrl.bind(this),
        );

        this.ConfigureServiceJWT(this._jwt);
    }

    private ConfigureServiceJWT(jwt: string | null) {
        this.IsLoggedIn = jwt != null;
        this._authenticationService.SetJWT(jwt);
    }

    public ShouldPreventNavigation(): boolean {
        if (this._modalManager.current && this._modalManager.current.Count() > 0) {
            this._modalManager.current.Close();
            return true;
        }
        return false;
    }

    private GetCommandExecutedUrl(command: Commands.BaseCommand): string {
        if (command instanceof Commands.CloseChangePasswordCommand) {
            return "/settings";
        }
        if (command instanceof Commands.ChangePasswordCommand) {
            return "/settings?tab=changePassword";
        }
        if (command instanceof Commands.LogInCommand) {
            const val = command as Commands.LogInCommand;
            return `/login${val.RedirectUrl ? "?redirectUrl=" + encodeURIComponent(val.RedirectUrl) : ""}`;
        }
        return "#";
    }

    private async OnCommandExecuted(command: Commands.BaseCommand) {
        const currentPath = this.CurrentUrl();

        if (command instanceof Commands.ErrorCommand) {
            const val = command as Commands.ErrorCommand;
            this._modalManager.current?.ShowError(val.Error ?? "Error", this.ClosedModal);
            return;
        }

        if (command instanceof Commands.ShowMessageCommand) {
            const val = command as Commands.ShowMessageCommand;
            this._modalManager.current?.ShowMessage(val.Message ?? "", () => {
                this.ClosedModal();
                if (val.DoneDelegate !== null) {
                    val.DoneDelegate();
                }
            });
            return;
        }

        if (command instanceof Commands.CloseChangePasswordCommand) {
            this.NavigateTo(this.GetCommandExecutedUrl(command), { replace: true });
            return;
        }

        if (command instanceof Commands.ChangePasswordCommand) {
            this.NavigateTo(this.GetCommandExecutedUrl(command));
            return;
        }

        if (command instanceof Commands.LogInCommand) {
            this.NavigateTo(this.GetCommandExecutedUrl(command));
            return;
        }

        if (command instanceof Commands.LoggedInCommand) {
            const val = command as Commands.LoggedInCommand;
            this._credentials = new Credentials();
            this.OnJwtChange(val.JWT);

            try {
                await this._authenticationService.InitialData();
            } catch (err: any) {
                this._commandService.Error(err.toString());
            }

            if (val.RedirectUrl !== null && val.RedirectUrl !== undefined) {
                this.NavigateTo(val.RedirectUrl);
                return;
            }
            this.NavigateTo("/");
            return;
        }

        if (command instanceof Commands.LoggedOutCommand) {
            try {
                await this._authenticationService.Logout();
            } catch (err) {
                console.error("Logout API call failed:", err);
            }

            this._credentials = new Credentials();
            this.OnJwtChange(null);
            localStorage.removeItem("AccessIds");
            this.NavigateTo("/login");
            return;
        }

        const gotoUrl = this.GetCommandExecutedUrl(command);
        const regex = /[^?]*/;
        const text1 = gotoUrl.match(regex)?.[0] || gotoUrl;
        const text2 = currentPath.match(regex)?.[0] || currentPath;
        this.NavigateTo(gotoUrl, { replace: text1.toLowerCase() === text2.toLowerCase() });
    }

    public async Run(AppComponent: React.ComponentType<{ app: Application }>) {
        if (!this._root) {
            console.error("Root element not found!");
            return;
        }

        this._root.render(
            <BrowserRouter>
                <ModalManager ref={this._modalManager} />
                <AppComponent app={this} />
            </BrowserRouter>,
        );

        if (this.IsLoggedIn && this._jwt) {
            try {
                await this._authenticationService.InitialData();
                if (this._jwt) {
                    this.IsLoggedIn = true;
                }
            } catch (err: any) {
                const errorMessage = err?.message || err?.toString() || "";
                if (
                    errorMessage.includes("Unauthorized") ||
                    errorMessage.includes("401")
                ) {
                    console.error("Authentication failed - token invalid:", err);
                } else {
                    console.warn("Failed to load initial data (non-auth error):", err);
                }
            }
        }
    }
}

export default Application;
