export interface IMembership {
    name: string,
    alternative_name: string,
    price: string,
    value: number,
    per_price: string,
    frequency_payment: string,
    frequency_payment_down_text: string,
    amount: number,
    has_month?: boolean,
    has_year?: boolean,
}