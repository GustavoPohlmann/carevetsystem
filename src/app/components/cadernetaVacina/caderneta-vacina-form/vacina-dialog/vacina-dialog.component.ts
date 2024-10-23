import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vacina } from 'src/app/models/vacina';

@Component({
  selector: 'app-vacina-dialog',
  templateUrl: './vacina-dialog.component.html',
  styleUrls: ['./vacina-dialog.component.css']
})
export class VacinaDialogComponent{

  /* vacina : Vacina = {
    idVacina: '',
    cadernetaVacina: null,
    nome
  } */

  constructor(
    public dialogRef: MatDialogRef<VacinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close("test");
  }

}
