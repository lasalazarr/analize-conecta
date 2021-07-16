import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delivery-payment',
  templateUrl: './delivery-payment.component.html',
  styleUrls: ['./delivery-payment.component.scss']
})
export class DeliveryPaymentComponent implements OnInit {

  payment: any = {
    voucher: null,
    efecty: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
