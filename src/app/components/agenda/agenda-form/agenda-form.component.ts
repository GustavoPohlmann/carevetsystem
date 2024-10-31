import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importa o plugin de visualização de tempo
import interactionPlugin from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  events = [
    {
      title: 'Reunião com o Cliente',
      start: '2024-10-30T10:00:00',
      end: '2024-10-30T10:30:00',
      extendedProps: {
        id: 1,
        descricao: 'Reunião para discutir o projeto.'
      }
    },
    {
      title: 'Consulta Médica',
      start: '2024-10-31T14:00:00',
      end: '2024-10-31T15:00:00',
      extendedProps: {
        id: 2,
        descricao: 'Consulta de rotina.'
      }
    }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locales: [ptLocale],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    height: 'auto',
    //dateClick: this.handleDateClick.bind(this),
    events: this.events,
    slotMinTime: '07:00:00',
    slotMaxTime: '20:00:00',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
