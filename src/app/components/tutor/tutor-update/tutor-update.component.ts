import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tutor } from 'src/app/models/tutor';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-tutor-update',
  templateUrl: './tutor-update.component.html',
  styleUrls: ['./tutor-update.component.css']
})
export class TutorUpdateComponent implements OnInit {
  tutor: Tutor = {
    idTutor: '',
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: new Date(),
    email: '',
    endereco: '',
    profissao: ''
  }

  validateNome: FormControl = new FormControl(null, Validators.minLength(3));
  validateCpf: FormControl = new FormControl(null, Validators.required);
  validateRg: FormControl = new FormControl(null, Validators.required);
  validateDataNascimento: FormControl = new FormControl(null, Validators.required);
  validateEmail: FormControl = new FormControl(null, Validators.email);
  validateEndereco: FormControl = new FormControl(null, Validators.minLength(10));

  constructor(
    private service: TutorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tutor.idTutor = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.tutor.idTutor).subscribe(resposta =>{
      this.tutor = resposta;
    });
  }

  disableButonAdicionar(): boolean {
    return this.validateCpf.valid && this.validateDataNascimento.valid && this.validateEmail.valid && 
           this.validateEndereco.valid && this.validateNome.valid && this.validateRg.valid;
  }

  editar(): void {
    this.service.update(this.tutor).subscribe(resposta =>{
      this.toast.success('Tutor atualizado com sucesso', 'Editar')
      this.router.navigate(['tutors'])
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