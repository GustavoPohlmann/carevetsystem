import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Vacina } from 'src/app/models/vacina';
import { CadernetaVacinaService } from 'src/app/services/caderneta-vacina.service';
import { VacinaService } from 'src/app/services/vacina.service';

@Component({
  selector: 'app-vacina-dialog',
  templateUrl: './vacina-dialog.component.html',
  styleUrls: ['./vacina-dialog.component.css']
})
export class VacinaDialogComponent{

  vacina : Vacina = {
    idVacina: '',
    cadernetaVacina: null,
    nome:'',
    aplicada: false,
    idadeVacina: 0,
    numeroDose:0,
    observacao:'',
    dataAplicacao: new Date()
  }

  constructor(
    private vacinaService: VacinaService,
    private caderntaVacinaService: CadernetaVacinaService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<VacinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if(this.isNew()){
      this.preencherCadernetaVacina();
    } else {
      this.findById();
    }
  }

  preencherCadernetaVacina(): void {
    this.caderntaVacinaService.findById(this.data.idCadernetaVacina).subscribe(resposta =>{
      this.vacina.cadernetaVacina = resposta;
    });
  }

  findById(): void{
    this.vacinaService.findById(this.data.idVacina).subscribe(resposta =>{
      this.vacina = resposta;
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  isNew() : boolean {
    return this.data.idVacina === 'novo';
  }

  salvar() : void{
    if(this.isNew()){
      this.salvarNew();
    } else {
      this.salvarEdit();
    }
  }

  salvarNew(): void {    
    this.vacinaService.create(this.vacina).subscribe(resposta =>{
      this.toast.success('Vacina cadastrada com sucesso', 'Cadastro')
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

  salvarEdit(): void {
    this.vacinaService.update(this.vacina).subscribe(resposta =>{
      this.toast.success('Vacina atualizada com sucesso', 'Editar')
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

}
