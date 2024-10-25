import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CadernetaVacina } from 'src/app/models/cadernetaVacina';
import { CadernetaVacinaService } from 'src/app/services/caderneta-vacina.service';

@Component({
  selector: 'app-caderneta-vacina-list',
  templateUrl: './caderneta-vacina-list.component.html',
  styleUrls: ['./caderneta-vacina-list.component.css']
})
export class CadernetaVacinaListComponent implements OnInit {

  ELEMENT_DATA: CadernetaVacina[] = []

  displayedColumns: string[] = ['codigo', 'animal', 'tutor', 'acoes'];
  dataSource = new MatTableDataSource<CadernetaVacina>(this.ELEMENT_DATA);

  constructor(private service : CadernetaVacinaService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: CadernetaVacina, filter: string) => {
      return data.animal.tutor.nome.toLowerCase().includes(filter) ||
             data.idCadernetaVacina.toString().includes(filter) ||
             data.animal.nome.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {

      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<CadernetaVacina>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  excluir(cadernetaVacina : CadernetaVacina){
    this.service.delete(cadernetaVacina.idCadernetaVacina).subscribe(respota =>{
      this.toast.success('Cadernata de vacina excluída com sucesso', 'Exclusão')
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
