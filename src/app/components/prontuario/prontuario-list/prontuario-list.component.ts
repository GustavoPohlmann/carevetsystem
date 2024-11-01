import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProntuarioAgendarDialogComponent } from './prontuario-agendar-dialog/prontuario-agendar-dialog.component';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-prontuario-list',
  templateUrl: './prontuario-list.component.html',
  styleUrls: ['./prontuario-list.component.css']
})
export class ProntuarioListComponent implements OnInit {

  ELEMENT_DATA: Agenda[] = []

  displayedColumns: string[] = ['paciente', 'tutor', 'dataInicioAgendamento', 'dataFimAgendamento', 'procedimento',  'acoes'];
  dataSource = new MatTableDataSource<Agenda>(this.ELEMENT_DATA);

  constructor(private service : AgendaService, private toast: ToastrService, public dialog: MatDialog) { }

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
      this.dataSource = new MatTableDataSource<Agenda>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  excluir(agenda : Agenda){
    this.service.delete(agenda.idAgenda).subscribe(respota =>{
      this.toast.success('Agendamento excluído com sucesso', 'Exclusão')
      this.findAll();
    }, ex =>{
      if(ex.error) {
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
