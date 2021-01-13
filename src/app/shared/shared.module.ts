import { FriendlyPricePipe } from './pipe/frindly-price.pipe';
import { CalendarJalaliDateFormatter } from './providers/jalali-date-formatter.provider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';

import localeFa from '@angular/common/locales/fa';

import { registerLocaleData } from '@angular/common';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';

import { JalaliAdapter } from './providers/jalali-date-adapter.provider';
import { CalendarService } from './calendar/calendar.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeFa);

export function momentAdapterFactory() {
  return adapterFactory();
};


@NgModule({
  declarations: [
    CalendarComponent,
    FriendlyPricePipe
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: function () {
          return new JalaliAdapter();
        }
      }),
    NgbModalModule
  ],
  exports: [
    CalendarComponent,
    FriendlyPricePipe,
    NgbModalModule
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarJalaliDateFormatter
    },
    CalendarService
  ]
})
export class SharedModule { }
