import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private service: TutorService) { }

  ngOnInit(): void {
    this.findAll();
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tutor>(resposta)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}