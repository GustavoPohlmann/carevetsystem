import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log: Login = {
    login: '',
    senha: ''
  }

  login = new FormControl(null, Validators.minLength(1));
  senha = new FormControl(null, Validators.minLength(1));

  constructor(
    private toast: ToastrService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar(){
    this.loginService.authenticate(this.log).subscribe(resposta =>{     
      this.loginService.successfulLogin(resposta.headers.get('Authorization').substring(7));

      this.usuarioService.findByLogin(this.log.login).subscribe(respostaUsuario =>{
        localStorage.setItem('idUsuario', respostaUsuario.idUsuario.toString());
      })

      this.router.navigate(['']);
    }, () => {
      this.toast.error('Usuário e/ou Senha Inválida!', 'Login');
    })
  }

  validarCampos(): boolean{
    return this.login.valid && this.senha.valid;
  }

}
