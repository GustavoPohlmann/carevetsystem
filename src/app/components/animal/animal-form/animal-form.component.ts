import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Tutor } from 'src/app/models/tutor';
import { AnimalService } from 'src/app/services/animal.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  animal: Animal = {
    idAnimal: '',
    nome: '',
    tutor: null,
    idade: 0,
    peso: 0,
    especie: '',
    sexo: '',
    pelagem: '',
    cor: '',
    alergias: '',
    observacao: '',
  }

  tutors: Tutor[] = []

  constructor(
    private animalService : AnimalService,
    private tutorService : TutorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  

  isNew() : boolean {
    return this.route.snapshot.paramMap.get('id') === 'novo';
  }

  ngOnInit(): void {
    this.findAllTutor();
    if(!this.isNew()){
      this.animal.idAnimal = this.route.snapshot.paramMap.get('id');
      this.findById();
    }
  }

  findAllTutor(): void {
    this.tutorService.findAll().subscribe(resposta => {
      this.tutors = resposta;
    })
  }

  findById(): void{
    this.animalService.findById(this.animal.idAnimal).subscribe(resposta =>{
      console.log(resposta);
      this.animal = resposta;
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
    console.log(this.animal);
    
    this.animalService.create(this.animal).subscribe(resposta =>{
      this.toast.success('Animal cadastrador com sucesso', 'Cadastro')
      this.router.navigate(['animais'])
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
    this.animalService.update(this.animal).subscribe(resposta =>{
      this.toast.success('Animal atualizado com sucesso', 'Editar')
      this.router.navigate(['animais'])
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
