import { CalendarEvent, CalendarEventAction } from "angular-calendar";

export const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

export const actions: CalendarEventAction[] = [
    {
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            // this.handleEvent('Edited', event);
        }
    },
    {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            // this.events = this.events.filter(iEvent => iEvent !== event);
            // this.handleEvent('Deleted', event);
        }
    }
]