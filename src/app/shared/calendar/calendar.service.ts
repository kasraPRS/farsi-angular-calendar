import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Injectable()
export class CalendarService {
  events: CalendarEvent
  constructor() { }

  createDepositEvents(events: any) {
    // console.log(events);

  }
}
