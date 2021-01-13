import { depositMock } from './../../deposit-turnover/deposit-mock';
import { CalendarService } from './calendar.service';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from 'date-fns';

import { Subject } from 'rxjs';
import moment from 'moment-jalaali';

import { colors, actions } from './calendar-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  CalendarView = CalendarView;

  @Input() view: CalendarView | 'month' | 'week' | 'day';


  viewDate: Date = new Date();

  weekStartsOn: number = DAYS_OF_WEEK.SATURDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY];

  activeDayIsOpen: boolean = true;

  locale = moment.locale('fa');

  refresh: Subject<any> = new Subject();

  // actions = actions;
  colors = colors;
  @Input() depositItems: any[] = [];
  events: CalendarEvent[] = [];


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  constructor(
    private modal: NgbModal
  ) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {

    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnInit(): void {

    this.events = this.depositItems.map((k, i) => ({
      type: k.type,
      title: k.amount,
      start: startOfDay(new Date(Date.parse(k.date))),
      color: k.type === "deposit" ? colors : colors.yellow
    }));

    console.log(this.events);

    // debugger;

  }

}
