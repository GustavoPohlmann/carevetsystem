import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['atender'])
  }

  logar(){
    this.router.navigate(['login']);
    this.loginService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', {timeOut: 7000})
  }

}
