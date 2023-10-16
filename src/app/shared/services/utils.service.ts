import { FormGroup } from '@angular/forms';
import * as moment from 'moment/moment';

export const checkPermission = (permission: string): boolean => {
    return true;
}

export const hasSession = (): boolean => {
    if (localStorage.getItem('token')) return true
    return false;
}

export const setUser = (user: any): void => {
    localStorage.setItem('user', JSON.stringify(user))
}
export const getUserData = (): any => {
    const user_data: any = localStorage.getItem('user');
    if (user_data)
        return JSON.parse(user_data)
    return null
}

export const formatDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD');
}

export const toFormData = (formGroup: FormGroup): FormData => {
    let formData = new FormData()
    for (const [key, value] of Object.entries(formGroup)) {
        if (typeof value != "object") {
            formData.append(key, String(value))
        }
    }
    return formData;
}