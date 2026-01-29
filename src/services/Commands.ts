export type OnCommandExecuted = (command: BaseCommand) => void;
export type GetCommandExecutedUrl = (command: BaseCommand) => string;

export class CommandService {
    private _onCommandExecuted: OnCommandExecuted | null;
    private _getCommandExecutedUrl: GetCommandExecutedUrl | null;

    constructor(
        onCommandExecuted: OnCommandExecuted | null,
        getCommandExecutedUrl: GetCommandExecutedUrl | null = null
    ) {
        this._onCommandExecuted = onCommandExecuted;
        this._getCommandExecutedUrl = getCommandExecutedUrl;
    }

    private Executed(command: BaseCommand) {
        if (this._onCommandExecuted) {
            this._onCommandExecuted(command);
        }
    }

    private GetUrl(command: BaseCommand): string {
        return this._getCommandExecutedUrl
            ? this._getCommandExecutedUrl(command)
            : "#";
    }

    public LoggedIn(jwt: string, redirectUrl?: string | null) {
        this.Executed(new LoggedInCommand(jwt, redirectUrl));
    }

    public Logout() {
        this.Confirm("Are you sure you want to logout?", () => {
            this.Executed(new LoggedOutCommand());
        }, () => {
            // No action on cancel
        });
    }

    public Confirm(message: string, yesDelegate: () => void, noDelegate: () => void) {
        this.Executed(new ConfirmCommand(message, yesDelegate, noDelegate));
    }

    public ChangePassword() {
        this.Executed(new ChangePasswordCommand());
    }

    public CloseChangePassword() {
        this.Executed(new CloseChangePasswordCommand());
    }

    public Error(value: string | null) {
        this.Executed(new ErrorCommand(value));
    }

    public ShowMessage(value: string | null, doneDelegate: () => void) {
        this.Executed(new ShowMessageCommand(value, doneDelegate));
    }

    public LogIn(redirectUrl?: string | null) {
        this.Executed(new LogInCommand(redirectUrl));
    }

    public LogoutUrl(): string {
        return "/login";
    }
}

export abstract class BaseCommand {
    constructor() { }
}

export class LoggedInCommand extends BaseCommand {
    public JWT: string;
    public RedirectUrl: string | null;

    constructor(jwt: string, redirectUrl?: string | null) {
        super();
        this.JWT = jwt;
        this.RedirectUrl = redirectUrl ?? null;
    }
}

export class LoggedOutCommand extends BaseCommand {
    constructor() {
        super();
    }
}

export class LogInCommand extends BaseCommand {
    public RedirectUrl: string | null;

    constructor(redirectUrl?: string | null) {
        super();
        this.RedirectUrl = redirectUrl ?? null;
    }
}

export class ChangePasswordCommand extends BaseCommand {
    constructor() {
        super();
    }
}

export class CloseChangePasswordCommand extends BaseCommand {
    constructor() {
        super();
    }
}

export class ErrorCommand extends BaseCommand {
    public Error: string | null;

    constructor(error: string | null) {
        super();
        this.Error = error;
    }
}

export class ShowMessageCommand extends BaseCommand {
    public Message: string | null;
    public DoneDelegate: () => void;

    constructor(message: string | null, doneDelegate: () => void) {
        super();
        this.Message = message;
        this.DoneDelegate = doneDelegate;
    }
}

export class ConfirmCommand extends BaseCommand {
    public Message: string;
    public YesDelegate: () => void;
    public NoDelegate: () => void;

    constructor(message: string, yesDelegate: () => void, noDelegate: () => void) {
        super();
        this.Message = message;
        this.YesDelegate = yesDelegate;
        this.NoDelegate = noDelegate;
    }
}
