import { Component, Input } from '@angular/core';
import { IMembership } from '../../interfaces/membership.interface';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {
  @Input() membership: IMembership;

  constructor() {
    this.membership = {
      name: '',
      alternative_name: '',
      price: '',
      value: 0,
      per_price: '',
      frequency_payment: '',
      frequency_payment_down_text: '',
      amount: 0,
    }
  }
  
  plusAction(): void {
    this.membership.amount += 1;  
  }
  lessAction(): void {    
    if (this.membership.amount > 0) this.membership.amount -= 1;
  }
  onInput(event: any) {
    const newValue = event.target.value.replace(/[^0-9]*/g, '');
    this.membership.amount = newValue;
  }
}
