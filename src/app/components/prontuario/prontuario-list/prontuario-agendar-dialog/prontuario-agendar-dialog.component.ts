import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Agenda } from 'src/app/models/agenda';
import { Animal } from 'src/app/models/animal';
import { AgendaService } from 'src/app/services/agenda.service';
import { AnimalService } from 'src/app/services/animal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-prontuario-agendar-dialog',
  templateUrl: './prontuario-agendar-dialog.component.html',
  styleUrls: ['./prontuario-agendar-dialog.component.css']
})
export class ProntuarioAgendarDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ProntuarioAgendarDialogComponent>
  ) { }

  ngOnInit(): void {
    this.findAllAnimal();
    this.preeencherUsuario();
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

  cancelar(): void {
    this.dialogRef.close();
  }

}
