import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Tutor } from 'src/app/models/tutor';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  ELEMENT_DATA: Tutor[] = []

  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Tutor>(this.ELEMENT_DATA);

  constructor(private service: TutorService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  findAll(){
    this.service.findAll().subscribe(resposta => {
      resposta.sort((a, b) => a.idTutor - b.idTutor);

      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tutor>(resposta)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluir(tutor : Tutor){
    this.service.delete(tutor.idTutor).subscribe(respota =>{
      this.toast.success('Tutor excluído com sucesso', 'Exclusão')
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

}