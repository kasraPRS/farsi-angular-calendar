
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

import * as _ from 'lodash';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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

  kir(total, num) {
    return total - num;
  }


  ngOnInit(): void {

    // this.events = this.depositItems.map(k => ({
    //   type: k.type,
    //   title: k.amount,
    //   start: startOfDay(new Date(Date.parse(k.date))),
    //   color: k.type === "deposit" ? colors : colors.yellow
    // }));
    // this.depositItems.reduce((a, b) => { return b.type })
    // console.log(this.events);

    // this.events = this.depositItems.map(k => ({
    //   type: k.type,
    //   title: k.amount,
    //   start: startOfDay(new Date(Date.parse(k.date))),
    // }))

    // _.groupBy([6.1, 4.2, 6.3], Math.floor);

    // this.events = _.groupBy(this.depositItems.map(k => (
    //   {
    //     title: k.amount,
    //     start: startOfDay(new Date(Date.parse(k.start))),
    //     type: k.type,
    //     color: k.type === "deposit" ? colors : colors.yellow
    //   }
    // )), 'type')
    // this.events = _.groupBy(this.depositItems, 'type')

    // console.log(_.groupBy(this.depositItems, 'type'));



    // this.events = _.groupBy(this.depositItems.map(k => (
    //   {
    //     title: k.amount,
    //     // title: _.sumBy(_(_.groupBy(this.depositItems, 'type'))),
    //     // title: _.sumBy(_(_.groupBy(this.depositItems, 'type')['deposit']).groupBy('start').filter(group => group.length == 2).flatten().value(), 'amount'),
    //     start: startOfDay(new Date(Date.parse(k.start))),
    //     type: k.type,
    //     color: k.type === "deposit" ? colors : colors.yellow
    //   }
    // )), 'type')

    // this.events = _.sumBy(_(_.groupBy(this.depositItems, 'type')['deposit']).groupBy('start').filter(group => group.length == 2).flatten().value(), 'title')

    // this.events = _.groupBy(this.depositItems, 'type')

    // this.events = this.events['Withdrawal'].concat(this.events['deposit']); // final steps



    const groupedResults = _(this.depositItems).map(k => (
      {
        title: k.amount,
        start: startOfDay(new Date(Date.parse(k.start))),
        type: k.type,
      }
    ))
      .groupBy('start').mapValues(
        item => {
          return _.sumBy(_.groupBy(item, 'type')['deposit'], 'title');
        }
      ).value();

    console.log(groupedResults); // sum of deposits

    debugger;



  }

}
