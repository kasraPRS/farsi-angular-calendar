import { Injectable } from '@angular/core';
import { startOfDay } from 'date-fns';

@Injectable()
export class CalendarService {

  constructor() { }

  sortDepositEvents(events: any) {
    return events.map(k => ({ title: k.amount, start: startOfDay(new Date()) }));
  }
}
