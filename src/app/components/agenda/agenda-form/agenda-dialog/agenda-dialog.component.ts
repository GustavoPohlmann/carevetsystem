import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProntuarioAgendarDialogComponent } from 'src/app/components/prontuario/prontuario-list/prontuario-agendar-dialog/prontuario-agendar-dialog.component';
import { Agenda } from 'src/app/models/agenda';
import { Animal } from 'src/app/models/animal';
import { AgendaService } from 'src/app/services/agenda.service';
import { AnimalService } from 'src/app/services/animal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agenda-dialog',
  templateUrl: './agenda-dialog.component.html',
  styleUrls: ['./agenda-dialog.component.css']
})
export class AgendaDialogComponent implements OnInit {

  horaInicio = '';
  horaFim = '';

  agenda : Agenda = {
    idAgenda: '',
    dataInicioAgendamento: new Date(),
    dataFimAgendamento: new Date(),
    observacao: '',
    procedimento: '',
    usuario: null,
    animal: null,

  };

  animais: Animal[] = []

  constructor(
    private agendaService : AgendaService,
    private animalService : AnimalService,
    private usuarioService : UsuarioService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<AgendaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.findAllAnimal();
    if(this.data.idAgenda){
      this.findById();
    } else {
      this.preeencherUsuario();
      const dataInicio = new Date(this.data.dataInicioAgendamento + 'T00:00:00'); // Se precisar especificar a hora
      dataInicio.setHours(dataInicio.getHours() + new Date().getTimezoneOffset() / 60); // Ajusta para o fuso horário local
      this.agenda.dataInicioAgendamento = dataInicio;
    }
  }

  findById(): void {
    this.agendaService.findById(this.data.idAgenda).subscribe(resposta => {
      this.agenda = resposta;
      this.horaInicio = new Date(resposta.dataInicioAgendamento).toTimeString().substring(0, 5);
      this.horaFim = new Date(resposta.dataFimAgendamento).toTimeString().substring(0, 5);
    })
  }

  preeencherUsuario(): void {
    var idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.findById(idUsuario).subscribe(resposta => {
      this.agenda.usuario = resposta;
    })
  }

  findAllAnimal(): void {
    this.animalService.findAll().subscribe(resposta => {
      this.animais = resposta;
    })
  }

  atualizarDataAgendamento() {
    this.atualizarDataInicioAgendamento();
    this.atualizarDataFimAgendamento();
  }

  atualizarDataInicioAgendamento() {
    const data = this.agenda.dataInicioAgendamento;
    const hora = this.horaInicio;

    if (data && hora) {
      const ano = data.getFullYear();
        const mes = data.getMonth();
        const dia = data.getDate();

        const [horas, minutos] = hora.split(':').map(Number);

        this.agenda.dataInicioAgendamento = new Date(ano, mes, dia, horas, minutos);
    }
  }

  atualizarDataFimAgendamento() {
    const data = this.agenda.dataInicioAgendamento;
    const hora = this.horaFim;

    if (data && hora) {
      const ano = data.getFullYear();
        const mes = data.getMonth();
        const dia = data.getDate();

        const [horas, minutos] = hora.split(':').map(Number);

        this.agenda.dataFimAgendamento = new Date(ano, mes, dia, horas, minutos);
    }
  }

  agendar(): void {    
    this.agendaService.create(this.agenda).subscribe(resposta =>{
      this.toast.success('Agendado com sucesso', 'Agenda')
      this.dialogRef.close();
    }, ex =>{
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  compararAnimais(animal: any, animalCompare: any): boolean {
    return animal && animalCompare ? animal.id === animalCompare.id : animal === animalCompare;
  }
  
  disableDesagendar(): boolean {
    return !this.agenda.idAgenda || this.agenda.idAgenda === '';
  }

  desagendar(): void {
    this.agendaService.delete(this.agenda.idAgenda).subscribe(resposta => {
      this.toast.success('Desagendado com sucesso', 'Agenda');
      this.dialogRef.close();
    }, ex => {
      this.toast.error('Erro ao desagendar', 'Agenda');
    })
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
