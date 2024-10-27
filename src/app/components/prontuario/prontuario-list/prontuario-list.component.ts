import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { ProntuarioAgendarDialogComponent } from './prontuario-agendar-dialog/prontuario-agendar-dialog.component';

@Component({
  selector: 'app-prontuario-list',
  templateUrl: './prontuario-list.component.html',
  styleUrls: ['./prontuario-list.component.css']
})
export class ProntuarioListComponent implements OnInit {

  ELEMENT_DATA: Prontuario[] = []

  displayedColumns: string[] = ['paciente', 'tutor', 'hora', 'procedimento',  'acoes'];
  dataSource = new MatTableDataSource<Prontuario>(this.ELEMENT_DATA);

  constructor(private service : ProntuarioService, private toast: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(){
    this.service.findAtendimentoDiario().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Prontuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  excluir(prontuario : Prontuario){
    this.service.delete(prontuario.idProntuario).subscribe(respota =>{
      this.toast.success('Prontuario excluído com sucesso', 'Exclusão')
      this.findAll();
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
    const dialogRef = this.dialog.open(ProntuarioAgendarDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.findAll();
    });
  }
}
