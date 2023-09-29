export interface IAuthCredentials {
    email: string | null | undefined;
    password: string | null | undefined;
}

export class AuthCredentials {
    email: string | null | undefined;
    password: string | null | undefined;
    constructor(pAuthCredentials:IAuthCredentials){
        this.email = pAuthCredentials.email;
        this.password = pAuthCredentials.password;
    }
}
