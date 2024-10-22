import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anotacao } from 'src/app/models/anotacao';
import { AnotacaoService } from 'src/app/services/anotacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-anotacao-form',
  templateUrl: './anotacao-form.component.html',
  styleUrls: ['./anotacao-form.component.css']
})
export class AnotacaoFormComponent implements OnInit {

  anotacao : Anotacao = {
    idAnotacao: '',
    usuario:null,
    anotacao: ''
  }

  constructor(
    private anotacaoService : AnotacaoService,
    private usuarioService : UsuarioService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var idUsuario = localStorage.getItem('idUsuario');
    if(idUsuario !== undefined && idUsuario !== null){
      this.findAnotacao(idUsuario)
    }
  }
  
  findAnotacao(idUsuario : any) : void{
    this.anotacaoService.findByIdUsuario(idUsuario).subscribe(resposta => {
      if(resposta.idAnotacao === null || resposta.idAnotacao === undefined){
        this.usuarioService.findById(idUsuario).subscribe(usuario =>{
          this.anotacao.usuario = usuario;
        })
      } else {
        this.anotacao = resposta;
      }
    })
  }

  isNew() : boolean {
    return this.anotacao.idAnotacao === undefined || this.anotacao.idAnotacao === null || this.anotacao.idAnotacao === "";
  }

  salvar() : void{
    if(this.isNew()){
      this.salvarNew();
    } else {
      this.salvarEdit();
    }
  }

  salvarNew(): void {
    this.anotacaoService.create(this.anotacao).subscribe(resposta =>{
      this.toast.success('Anotação cadastrada com sucesso', 'Cadastro')
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
    this.anotacaoService.update(this.anotacao).subscribe(resposta =>{
      this.toast.success('Anotação atualizada com sucesso', 'Editar')
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
