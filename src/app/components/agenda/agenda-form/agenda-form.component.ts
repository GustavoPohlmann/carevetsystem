import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importa o plugin de visualização de tempo
import interactionPlugin from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt';
import { AgendaBean } from 'src/app/models/agendaBean';
import { AgendaService } from 'src/app/services/agenda.service';
import { MatDialog } from '@angular/material/dialog';
import { AgendaDialogComponent } from './agenda-dialog/agenda-dialog.component';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  agendaBean: AgendaBean[] = [];

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
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.agendaBean,
    slotMinTime: '07:00:00',
    slotMaxTime: '20:00:00',
  };

  constructor(
    private agendaService: AgendaService,
    public dialog: MatDialog    
  ) { }

  ngOnInit(): void {
    this.findAllAgenda();
  }

  findAllAgenda() {
    this.agendaService.findAll().subscribe(response => {
      this.agendaBean = response.map(agenda => ({
        start: new Date(agenda.dataInicioAgendamento),
        end: new Date(agenda.dataFimAgendamento),
        title: agenda.animal.nome.concat(' - ').concat(agenda.procedimento),
        id: agenda.idAgenda
      }));
  
      setTimeout(() => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.agendaBean,
          timeZone: 'local',
          height: 'auto',
        };
      }, 1000);
    });
  }
  
  handleDateClick(info: any) {
    const dialogRef = this.dialog.open(AgendaDialogComponent, {
      width: '500px',
      data: { idAgenda: null, dataInicioAgendamento: info.dateStr}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.findAllAgenda();
    });
  }

  handleEventClick(info: any) {
   const dialogRef = this.dialog.open(AgendaDialogComponent, {
    width: '500px',
    data: { idAgenda: info.event.id, dataInicioAgendamento: new Date()}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.findAllAgenda();
  });
  }

}
