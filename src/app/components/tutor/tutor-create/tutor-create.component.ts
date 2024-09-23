import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tutor } from 'src/app/models/tutor';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-tutor-create',
  templateUrl: './tutor-create.component.html',
  styleUrls: ['./tutor-create.component.css']
})
export class TutorCreateComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  disableButonAdicionar(): boolean {
    return this.validateCpf.valid && this.validateDataNascimento.valid && this.validateEmail.valid && 
           this.validateEndereco.valid && this.validateNome.valid && this.validateRg.valid;
  }

  salvar(): void {
    this.service.create(this.tutor).subscribe(resposta =>{
      this.toast.success('Tutor cadastrador com sucesso', 'Cadastro')
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
