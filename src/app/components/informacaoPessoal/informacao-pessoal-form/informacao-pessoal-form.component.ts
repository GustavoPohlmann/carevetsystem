import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InformacaoPessoal } from 'src/app/models/informacaoPessoal';
import { InformacaoPessoalService } from 'src/app/services/informacao-pessoal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-informacao-pessoal-form',
  templateUrl: './informacao-pessoal-form.component.html',
  styleUrls: ['./informacao-pessoal-form.component.css']
})
export class InformacaoPessoalFormComponent implements OnInit {

  informacaoPessoal: InformacaoPessoal = {
    idInformacaoPessoal: '',
    usuario: null,
    nomeCompleto:'',
    dataNascimento: new Date,
    cpf:'',
    rg:'',
    sexo:'',
    endereco:'',
    telefone:'',
    email:'',
    fotoPerfil:'',
    numeroCrmv:'',
    especialidade:''
  }

  validateNome: FormControl = new FormControl(null, Validators.minLength(3));
  validateCpf: FormControl = new FormControl(null, Validators.required);
  validateRg: FormControl = new FormControl(null, Validators.required);
  validateDataNascimento: FormControl = new FormControl(null, Validators.required);
  validateSexo: FormControl = new FormControl(null, Validators.required);
  validateTelefone: FormControl = new FormControl(null, Validators.required);
  validateNumeroCrmv: FormControl = new FormControl(null, Validators.required);
  validateEmail: FormControl = new FormControl(null, Validators.email);
  validateEndereco: FormControl = new FormControl(null, Validators.minLength(10));

  constructor(
    private informacaoPessoalService : InformacaoPessoalService,
    private usuarioService : UsuarioService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var idUsuario = localStorage.getItem('idUsuario');
    if(idUsuario !== undefined && idUsuario !== null){
      this.findInformacaoPessoal(idUsuario)
    }
  }
  
  findInformacaoPessoal(idUsuario : any) : void{
    this.informacaoPessoalService.findByIdUsuario(idUsuario).subscribe(resposta => {
      if(resposta.idInformacaoPessoal === null || resposta.idInformacaoPessoal === undefined){
        this.usuarioService.findById(idUsuario).subscribe(usuario =>{
          this.informacaoPessoal.usuario = usuario;
        })
      } else {
        this.informacaoPessoal = resposta;
      }
    })
  }

  isNew() : boolean {
    return this.informacaoPessoal.idInformacaoPessoal === undefined || this.informacaoPessoal.idInformacaoPessoal === null || this.informacaoPessoal.idInformacaoPessoal === "";
  }

  salvar() : void{
    if(this.isNew()){
      this.salvarNew();
    } else {
      this.salvarEdit();
    }
  }

  salvarNew(): void {
    this.informacaoPessoalService.create(this.informacaoPessoal).subscribe(resposta =>{
      this.toast.success('Informação Pessoal cadastrador com sucesso', 'Cadastro')
      this.router.navigate(['home'])
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
    this.informacaoPessoalService.update(this.informacaoPessoal).subscribe(resposta =>{
      this.toast.success('Informação Pessoal atualizado com sucesso', 'Editar')
      this.router.navigate(['home'])
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
