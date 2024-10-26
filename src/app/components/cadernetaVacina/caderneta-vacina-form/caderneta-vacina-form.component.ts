import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { CadernetaVacina } from 'src/app/models/cadernetaVacina';
import { Vacina } from 'src/app/models/vacina';
import { AnimalService } from 'src/app/services/animal.service';
import { CadernetaVacinaService } from 'src/app/services/caderneta-vacina.service';
import { VacinaService } from 'src/app/services/vacina.service';
import { VacinaDialogComponent } from './vacina-dialog/vacina-dialog.component';

@Component({
  selector: 'app-caderneta-vacina-form',
  templateUrl: './caderneta-vacina-form.component.html',
  styleUrls: ['./caderneta-vacina-form.component.css']
})
export class CadernetaVacinaFormComponent implements OnInit {

  cadernetaVacina: CadernetaVacina = {
    idCadernetaVacina: '',
    descricao: '',
    animal: null
  }

  animais: Animal[] = []

  ELEMENT_DATA: Vacina[] = []

  displayedColumns: string[] = ['nome', 'idadeVacina', 'numeroDose', 'aplicada', 'dataAplicacao', 'acoes'];
  dataSource = new MatTableDataSource<Vacina>(this.ELEMENT_DATA);

  constructor(
    private cadernetaService : CadernetaVacinaService,
    private animalService : AnimalService,
    private vacinaService : VacinaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isNew() : boolean {
    return this.route.snapshot.paramMap.get('id') === 'novo';
  }

  ngOnInit(): void {
    this.findAllAnimal();
    if(!this.isNew()){
      this.cadernetaVacina.idCadernetaVacina = this.route.snapshot.paramMap.get('id');
      this.findById();
      this.findAllVacina();
    }
  }

  findAllVacina(){
    this.vacinaService.findByIdCadernetaVacina(this.cadernetaVacina.idCadernetaVacina).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Vacina>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  compararAnimais(animal: any, animalCompare: any): boolean {
    return animal && animalCompare ? animal.id === animalCompare.id : animal === animalCompare;
  }

  excluir(vacina : Vacina){
    this.vacinaService.delete(vacina.idVacina).subscribe(respota =>{
      this.toast.success('Vacina excluída com sucesso', 'Exclusão')
      this.findAllVacina();
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

  findAllAnimal(): void {
    this.animalService.findAll().subscribe(resposta => {
      this.animais = resposta;
    })
  }

  findById(): void{
    this.cadernetaService.findById(this.cadernetaVacina.idCadernetaVacina).subscribe(resposta =>{
      this.cadernetaVacina = resposta;
    });
  }

  disableButonAdicionar(){
    return true;
  }

  salvar() : void{
    if(this.isNew()){
      this.salvarNew();
    } else {
      this.salvarEdit();
    }
  }

  salvarNew(): void {    
    this.cadernetaService.create(this.cadernetaVacina).subscribe(resposta =>{
      this.toast.success('Caderneta de vacina cadastrada com sucesso', 'Cadastro')
      this.router.navigate([`cadeneta-vacina/update/${resposta.idCadernetaVacina}`]);
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
    this.cadernetaService.update(this.cadernetaVacina).subscribe(resposta =>{
      this.toast.success('Caderneta de vacina atualizada com sucesso', 'Editar')
      this.router.navigate([`cadeneta-vacina/update/${resposta.idCadernetaVacina}`]);
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

  openDialog(idVacina): void {
    const dialogRef = this.dialog.open(VacinaDialogComponent, {
      width: '500px',
      data: { idCadernetaVacina: this.cadernetaVacina.idCadernetaVacina, idVacina: idVacina}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.findAllVacina();
    });
  }
}
