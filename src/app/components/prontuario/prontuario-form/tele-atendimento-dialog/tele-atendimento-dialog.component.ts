import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TeleAtendimento } from 'src/app/models/teleAtendimento';
import { TeleAtendimentoService } from 'src/app/services/tele-atendimento.service';

@Component({
  selector: 'app-tele-atendimento-dialog',
  templateUrl: './tele-atendimento-dialog.component.html',
  styleUrls: ['./tele-atendimento-dialog.component.css']
})
export class TeleAtendimentoDialogComponent implements OnInit {

  teleAtendimento : TeleAtendimento = {
    idTeleAtendimento: '',
    idDayliCall:'',
    url:'',
    prontuario: null
  }

  constructor(
    private teleAtendimentoService: TeleAtendimentoService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<TeleAtendimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.findByIdProntuario();
  }

  criarTeleAtendimentoByIdProntuario(): void{
    this.teleAtendimentoService.criarTeleAtendimentoByIdProntuario(this.data.idProntuario).subscribe(resposta =>{
      this.teleAtendimento = resposta;
    });
  }

  findByIdProntuario(): void{debugger
    this.teleAtendimentoService.findByIdProntuario(this.data.idProntuario).subscribe(resposta =>{
      this.teleAtendimento = resposta;
      if(this.teleAtendimento === null ||  this.teleAtendimento.idTeleAtendimento === null || this.teleAtendimento.idTeleAtendimento === ''){
        this.criarTeleAtendimentoByIdProntuario();
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
  
  copiar(url: String): void{
    navigator.clipboard.writeText(url.toString()).then(() => {
      this.toast.success("Link copiado para a área de transferência");
    }).catch(err => {
      this.toast.error("Erro ao copiar link para a área de transferência");
    });
  }

}
