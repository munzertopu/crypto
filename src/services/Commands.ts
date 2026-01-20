export type OnCommandExecuted = (command: BaseCommand) => void;

export class CommandService {
    private _onCommandExecuted: OnCommandExecuted | null;

    constructor(onCommandExecuted: OnCommandExecuted | null) {
        this._onCommandExecuted = onCommandExecuted;
    }

    private Executed(command: BaseCommand) {
        if (this._onCommandExecuted) {
            this._onCommandExecuted(command);
        }
    }

    public LoggedIn(jwt: string, redirectUrl?: string | null) {
        this.Executed(new LoggedInCommand(jwt, redirectUrl));
    }

    public Logout() {
        this.Executed(new LoggedOutCommand());
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
