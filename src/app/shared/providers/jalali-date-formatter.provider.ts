import { Injectable } from '@angular/core';
import { CalendarDateFormatterInterface, DateAdapter, DateFormatterParams } from 'angular-calendar';
import * as moment from 'jalali-moment'
import { formatDate } from '@angular/common';

@Injectable()
export class CalendarJalaliDateFormatter
    implements CalendarDateFormatterInterface {
    constructor(
        protected dateAdapter: DateAdapter
    ) { }


    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'EEEE', locale);
    }


    public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
        return moment(date)
            .locale(locale)
            .format('jD');
    }


    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'LLLL ', locale) + moment(date).format('jYYYY');
    }

    public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'EEEE', locale);
    }


    public weekViewColumnSubHeader({
        date,
        locale
    }: DateFormatterParams): string {
        return formatDate(date, 'MMM ', locale) + moment(date)
            .format('jD');
    }


    public weekViewTitle({
        date,
        locale,
        weekStartsOn,
        excludeDays,
        daysInWeek
    }: DateFormatterParams): string {

        const format = d => {
            return formatDate(d, 'MMM d ', locale) + moment(d).format('jYYYY');
        }

        return format(moment(date).startOf('week').toDate()) + ' - ' + format(moment(date).endOf('week').toDate())
    }


    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'h a', locale);
    }


    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'h a', locale);
    }


    public dayViewTitle({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'EEEE, MMMM d ', locale) + moment(date).format('jYYYY');
    }
}