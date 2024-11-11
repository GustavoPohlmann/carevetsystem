import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  ELEMENT_DATA: Animal[] = []

  displayedColumns: string[] = ['codigo', 'nome', 'tutor', 'especie', 'pelagem', 'sexo', 'acoes'];
  dataSource = new MatTableDataSource<Animal>(this.ELEMENT_DATA);

  constructor(private service : AnimalService, private toast: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      resposta.sort((a, b) => a.idAnimal - b.idAnimal);

      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Animal>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  excluir(animal : Animal){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(animal.idAnimal).subscribe(respota =>{
          this.toast.success('Animal excluído com sucesso', 'Exclusão')
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
    });
  }
}
