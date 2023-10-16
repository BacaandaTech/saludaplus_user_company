export interface IButtonDetails{
    action:string;
    label:string;
    url?:string;
}

export class ButtonDetails{
    action: string;
    label: string;
    constructor(pAuthCredentials:IButtonDetails){
        this.action = pAuthCredentials.action;
        this.label = pAuthCredentials.label;
    }
}

export const BUTTON_ACTIONS = {
    REDIRECT:'redirect'
}

export const CONFIG_DATE_PICKER = {
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD'
}