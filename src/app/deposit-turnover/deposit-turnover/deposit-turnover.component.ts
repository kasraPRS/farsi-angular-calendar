import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, startOfDay, subDays } from 'date-fns';
import { depositMock } from '../deposit-mock';
@Component({
  selector: 'app-deposit-turnover',
  templateUrl: './deposit-turnover.component.html',
  styleUrls: ['./deposit-turnover.component.scss']
})
export class DepositTurnoverComponent implements OnInit {

  depositItem = depositMock;

  events: CalendarEvent[] = [

    {
      // start: subDays(startOfDay(new Date()), 0),
      start: startOfDay(new Date()),
      // end: addDays(new Date(), 1),
      title: 'تست برای ۳ ایونت',
      // color: colors.red,
      // actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'ایونتی که اتمامش مشخص نیست',
    //   // color: colors.yellow,
    //   // actions: this.actions
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 0),
    //   end: addDays(new Date(), 5),
    //   title: 'ایونتی که دو ماه طول می کشد',
    //   // color: colors.blue,
    //   allDay: true
    // }
  ];
  constructor() { }

  ngOnInit(): void {
    // var result = arr.map(person => ({ value: person.id, text: person.name }));
    // this.events = this.depositItem.map(k => ({ title: k.amount, start: subDays(startOfDay(new Date()), 2) }));
    console.log(this.events);

  }

}
