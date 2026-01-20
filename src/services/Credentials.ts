// Credentials management based on reference project architecture
export class Credentials {
    private _nameFull: string | null = null;
    private _userId: number | null = null;
    private _partnerId: number | null = null;

    public get NameFull(): string | null {
        return this._nameFull;
    }

    public set NameFull(nameFull: string | null) {
        this._nameFull = nameFull;
    }

    public get UserId(): number | null {
        return this._userId;
    }

    public set UserId(userId: number | null) {
        this._userId = userId;
    }

    public get PartnerId(): number | null {
        return this._partnerId;
    }

    public set PartnerId(partnerId: number | null) {
        this._partnerId = partnerId;
    }

    constructor(
        nameFull: string | null = null,
        userId: number | null = null,
        partnerId: number | null = null
    ) {
        this._nameFull = nameFull;
        this._userId = userId;
        this._partnerId = partnerId;
    }
}
