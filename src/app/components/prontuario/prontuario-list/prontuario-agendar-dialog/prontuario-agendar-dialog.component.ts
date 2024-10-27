import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Prontuario } from 'src/app/models/prontuario';
import { AnimalService } from 'src/app/services/animal.service';
import { ProntuarioService } from 'src/app/services/prontuario.service';

@Component({
  selector: 'app-prontuario-agendar-dialog',
  templateUrl: './prontuario-agendar-dialog.component.html',
  styleUrls: ['./prontuario-agendar-dialog.component.css']
})
export class ProntuarioAgendarDialogComponent implements OnInit {

  dataAgendamentoHora = '';

  prontuario : Prontuario = {
    idProntuario: '',
    dataCadastro: new Date(),
    anamnese: '',
    prescrisaoOrientacao: '',
    exames: '',
    procedimentoRealizado: '',
    procedimento: '',
    usuario: null,
    animal: null,
    dataAgendamento: new Date()
  };

  animais: Animal[] = []

  constructor(
    private prontuarioService : ProntuarioService,
    private animalService : AnimalService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ProntuarioAgendarDialogComponent>
  ) { }

  ngOnInit(): void {
    this.findAllAnimal();
  }

  findAllAnimal(): void {
    this.animalService.findAll().subscribe(resposta => {
      this.animais = resposta;
    })
  }
  atualizarDataAgendamento() {
    const data = this.prontuario.dataAgendamento;
    const hora = this.dataAgendamentoHora;

    if (data && hora) {
      const ano = data.getFullYear();
        const mes = data.getMonth();
        const dia = data.getDate();

        const [horas, minutos] = hora.split(':').map(Number);

        this.prontuario.dataAgendamento = new Date(ano, mes, dia, horas, minutos);
    }
  }

  agendar(): void {    
    this.prontuarioService.create(this.prontuario).subscribe(resposta =>{
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
