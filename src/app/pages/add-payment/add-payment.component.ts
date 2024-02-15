import { Component } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { StripeService } from 'src/app/shared/services/stripe.service';
import { IMembership } from 'src/app/shared/interfaces/membership.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
 
})
export class AddPaymentComponent {
  private stripe: Stripe | null
  private card: any;
  private exp: any;
  private cvv: any;

  public name_user: string;
  public cp: string;
  public loader: boolean = false;
  public success_transaction: boolean = false;
  public memberships: IMembership[] = [
    {
      name: 'CLUB SALUDA+',
      price: '$2,268 anual',
      alternative_name: 'Anual 2 pagos',
      per_price: '$189 MXM / mes',
      frequency_payment: '2 pagos de $1,134',
      frequency_payment_down_text: 'Mes 1 y mes 7',
      amount: 0,
      has_month: true,
      value: 1134,
    },
    {
      name: 'CLUB SALUDA+',
      price: '$1,890 anual',
      alternative_name: 'Anual 1 pago',
      per_price: '2 meses gratis',
      frequency_payment: '1 solo pago',
      frequency_payment_down_text: '$157.5 MXM / mes',
      amount: 0,
      has_year: true,
      value: 1890,
      
    }
  ]
  private status_card: any = {
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  }

  constructor(private stripe_service: StripeService, private route: ActivatedRoute) {
    this.stripe = null;
    this.name_user = ''
    this.cp = '';
  }

  async ngOnInit() {

    this.setMembershipsFromParams()
    this.getCustomer();

    this.stripe = await loadStripe(environment.STRIPE_PUBLIC);
    const elements = this.stripe?.elements();
    
    this.card = elements?.create('cardNumber');
    this.exp = elements?.create('cardExpiry');
    this.cvv = elements?.create('cardCvc');

    this.card?.mount('#card')
    this.exp?.mount('#exp');
    this.cvv?.mount('#cvv');

    this.card?.on('change', (event: any) => this.handleCardChange(event, 'card-errors'));
    this.exp?.on('change', (event: any) => this.handleCardChange(event, 'exp-errors'));
    this.cvv?.on('change', (event: any) => this.handleCardChange(event, 'cvc-errors'));
  }
  setMembershipsFromParams(): void {
    const query_params: any = this.route.snapshot.queryParams;
    const membership_month = this.memberships.find(i => i.has_month)
    const membership_year = this.memberships.find(i => i.has_year)

    if (query_params.has_month && membership_month) {
      membership_month.amount = parseInt(query_params.quantity_month);
    }
    if (query_params.has_year && membership_year) {
      membership_year.amount = parseInt(query_params.quantity_year);
    }
  }

  async handleBuy() {
    if (this.handleDisabledButton()) {
      const owner_info = {
        owner: {
          name: this.name_user,
          address: {
            postal_code: this.cp
          }
        },
        
      }
      try {
        const result = await this.stripe?.createSource(this.card, owner_info);
        if (result?.source) {
          const form_data: FormData = new FormData();
          form_data.append('token_card', result.source?.id ? result.source?.id : '');
          this.loader = true;
  
          this.stripe_service.addPaymentMethod(form_data).subscribe((response) => {
            if (response.status === 200) {
              this.stripe_service.buySuscription(this.getFormDataMemberships()).subscribe((response_buy) => {
                if (response_buy.status === 200) {
                  this.loader = true;
                  this.success_transaction = true
                } else {
                  this.loader = false; 
                }
              })
            } else {
              this.loader = false;
            }
          })
        }
      } catch (e: any) {
        console.warn(e.message)
      }
    }
  }

  getCustomer():void {
    this.stripe_service.getCustomerStripe().subscribe(() => {
    })
  }
  getTotal() {
    let total: number = 0
    this.memberships.forEach(membership => {
      total += membership.amount * membership.value
    });
    return total;
  }
  getNextTotalPaymentCase() {
    let total: number = 0
    const months: IMembership[] =  this.memberships.filter(i => i.has_month)
    
    months.forEach(membership => {
      total += membership.amount * membership.value
    });
    return total;
  }
  separatebycomma(num: string) {
    if (num === null) return '0'
    const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  getFormDataMemberships() {
    const form_data_buy: FormData = new FormData();
    const memberships_to_buy: IMembership[] = this.memberships.filter(i => i.amount > 0);

    memberships_to_buy.forEach((membership) => {
      if (membership?.has_year) {
        form_data_buy.append('has_month', 'true');
        form_data_buy.append('quantity_month', membership.amount.toString());
      } 
      if (membership?.has_month) {  
        form_data_buy.append('has_year', 'true');
        form_data_buy.append('quantity_year', membership.amount.toString());
      }

    })
    return form_data_buy;
  }

  handleDisabledButton() {
    const status = Object.values(this.status_card);
    status.push(this.cp.length > 0)
    status.push(this.name_user.length > 0)
    status.push(this.memberships.filter((i) => i.amount > 0).length > 0)

    return status.every((i) => i === true)
  }
  
  handleCardChange(event: any, errorElementId: string) {
    const displayError = document.getElementById(errorElementId);

    this.status_card[event.elementType] = event.complete

    if (displayError) {
      displayError.textContent = event.error ? event.error.message : '';
    }
  }
}