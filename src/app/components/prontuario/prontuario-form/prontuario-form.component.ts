import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { TeleAtendimentoDialogComponent } from './tele-atendimento-dialog/tele-atendimento-dialog.component';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-prontuario-form',
  templateUrl: './prontuario-form.component.html',
  styleUrls: ['./prontuario-form.component.css']
})
export class ProntuarioFormComponent implements OnInit {

  prontuario : Prontuario = {
    idProntuario: '',
    dataCadastro: new Date(),
    anamnese: '',
    prescrisaoOrientacao: '',
    exames: '',
    procedimentoRealizado: '',
    usuario: null,
    animal: null,
    agenda: null
  };

  constructor(
    private prontuarioService : ProntuarioService,
    private toast: ToastrService,
    private agendaService: AgendaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    var idAgenda = this.route.snapshot.paramMap.get('id');
    this.findById(idAgenda);
  }

  findById(idAgenda: any): void{debugger
    this.prontuarioService.findByIdAgenda(idAgenda).subscribe(resposta =>{
      if(resposta.idProntuario == null || resposta.idProntuario == undefined){
        this.agendaService.findById(idAgenda).subscribe(resposta =>{
          this.prontuario.agenda = resposta;
          this.prontuario.animal = resposta.animal;
          this.prontuario.usuario = resposta.usuario;
        })
      } else {
        this.prontuario = resposta;
        this.prontuario.dataCadastro = new Date();
      }
    });
  }

  salvar() : void{
    this.salvarNew();
  }

  salvarNew(): void {
    this.prontuarioService.update(this.prontuario).subscribe(resposta =>{
      this.toast.success('Prontuário salvo com sucesso', 'Cadastro')
      this.router.navigate(['atender'])
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

  openDialog(): void {
    const dialogRef = this.dialog.open(TeleAtendimentoDialogComponent, {
      width: '500px',
      data: { idProntuario: this.prontuario.idProntuario}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
