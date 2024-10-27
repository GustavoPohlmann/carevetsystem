import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal';
import { Prontuario } from 'src/app/models/prontuario';
import { AnimalService } from 'src/app/services/animal.service';
import { ProntuarioService } from 'src/app/services/prontuario.service';

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricoListComponent implements OnInit {

  animal: Animal = null;

  ELEMENT_DATA: Prontuario[] = [];

  animais: Animal[] = [];

  displayedColumns: string[] = ['paciente', 'tutor', 'dataAtendimento', 'procedimento',  'acoes'];
  dataSource = new MatTableDataSource<Prontuario>(this.ELEMENT_DATA);

  constructor(private service : ProntuarioService, private animalService : AnimalService) { }

  ngOnInit(): void {
    this.findAllAnimal();
  }

  onChangeAnimal(): void {
    this.dataSource = new MatTableDataSource<Prontuario>(null);
    this.animal = null;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAllAnimal(): void {
    this.animalService.findAll().subscribe(resposta => {
      this.animais = resposta;
    })
  }
  
  disale(): boolean {
    return this.animal == null;
  }
  
  imprimirHistorico(): void {
    /* this.service.imprimirHistorico(this.animal.idAnimal).subscribe(resposta => {
      let file = new Blob([resposta], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }) */
  }

  consultar(){
    this.service.findByIdAnimal(this.animal.idAnimal).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Prontuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

}
