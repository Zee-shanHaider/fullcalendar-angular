import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions , EventInput, Calendar } from '@fullcalendar/core';
import rrulePlugin from '@fullcalendar/rrule'
import {RRule} from 'rrule'
import * as moment from 'moment';
// document.addEventListener('DOMContentLoaded', function() {
//   const calendarEl: HTMLElement | null = document.querySelector('#fc');
//   const calendar = new Calendar(calendarEl!, {
//     // Calendar options and configurations
//     // ...
//     selectable: true,
//     select: function(info) {
//       const event = {
//         title: 'New Event',
//         start: info.startStr,
//         end: info.endStr
//       };

//       calendar.addEvent(event);
//     }
//   });

//   calendar.render();
// });
// interface CustomEvent extends EventInput {
//   rrule: {
//     freq: any;
//     // interval: number;
//     byweekday: any[];
//   };
// }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  date1: any;
  date2: any;
  title = 'fullCalender';
  // @ViewChild("fc", { static: false }) fc! : Calendar;
  @ViewChild('fc') fc!: Calendar;
  events2 :CustomEvent[]= [];
    event : any;
    ngOnInit(): void {
    console.log('calender', this.fc)
  }
  ngAfterViewInit() {
    console.log("after view in it", this.fc); // works
  }
  handleEventClick = (info: any) => {
    // Access the event object
    const event = info.event;
    alert("Are you sure to delete?")
    event.remove()
    // Delete the event
    
  };
  
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: true,
    slotDuration: "00:15",
    slotLabelInterval: "01:00",
    events: this.events2,
    displayEventTime: false,
    eventOverlap: false,
    selectOverlap: false,
    eventClick: this.handleEventClick,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin],
      eventConstraint: {
        startTime: "0:00", 
        endTime: "23:45",
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
      },
      allDayText: "",
      // columnHeader: true,
      editable: true,
      selectable: true,
      selectMinDistance: 29,
      select: (info)=> {
        this.date1 = new Date(info.start);
        this.date2 = new Date(info.end);
        const diffTime = Math.abs(this.date2 - this.date1);
        console.log(diffTime + " hours");
        console.log('Selected range:', info.start, info.end);
        const rrule = new RRule({
          freq: RRule.WEEKLY,
          count: 10,
          dtstart: info.start
        });
        this.event = {
                        title: "Select Test",
                        start: info.start,
                        end: info.end, 
                        rrule: rrule.toString(),
                        duration: diffTime
      }
        // this.fc.addEvent()
        this.events2.push(this.event)
        // this.events2.push({ 
        //   title: 'Meeting',
        //   start: new Date("Tue May 21 2023 07:30:00 GMT-0400"), 
        //   end: new Date("Tue May 21 2023 09:30:00 GMT-0400")
        // })
        console.log(this.events2)
        this.calendarOptions.events=[];
        this.calendarOptions.events = [...this.events2];
        console.log(" this.calendarOptions.events :",  this.calendarOptions.events )

        
      },
      eventResize: (event) => {
        console.log('event is edited and new one is:', event);
      },
      eventDragStart: (info) => {
        // Handle event drag start
        console.log('Event drag started:', info.event);
      },
      eventDragStop: (info) => {
        // Handle event drag stop
        console.log('Event drag stopped:', info.event);
      },
      eventDrop: (info)=> {
        // Handle event drop
        console.log('Event dropped onto:', info.event.start);
      },
      dateClick: (info) => {
        // Handle date click event
        console.log('Date clicked:', info.date);
        this.event = {
          title: 'Recurring Event',
          start: info.date,
          duration: '06:00',
          rrule: {
            freq: 'weekly',
            interval: 5,
            byweekday: [ 'mo', 'fr' ],
            dtstart: '2012-02-01T10:30:00', // will also accept '20120201T103000'
            until: '2012-06-01'  // Recur on Mondays
        }
      }
        this.events2.push(
          this.event
          )
        console.log(this.events2)
        this.calendarOptions.events=[];
        this.calendarOptions.events = [...this.events2];
      }
      
  };
   
 
  getEvents() {
    console.log("In Here")
    return this.events2;
  };
  


}
