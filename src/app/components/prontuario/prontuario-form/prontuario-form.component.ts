import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';

@Component({
  selector: 'app-prontuario-form',
  templateUrl: './prontuario-form.component.html',
  styleUrls: ['./prontuario-form.component.css']
})
export class ProntuarioFormComponent implements OnInit {

  prontuario : Prontuario = {
    idProntuario: '',
    dataCadastro: new Date(),
    anamnese: '',
    prescrisaoOrientacao: '',
    exames: '',
    procedimentoRealizado: '',
    procedimento: '',
    usuario: null,
    animal: null,
    dataAgendamento: new Date()
  };

  constructor(
    private prontuarioService : ProntuarioService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.prontuario.idProntuario = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.prontuarioService.findById(this.prontuario.idProntuario).subscribe(resposta =>{
      this.prontuario = resposta;
      this.prontuario.dataCadastro = new Date();
    });
  }

  salvar() : void{
    this.salvarNew();
  }

  salvarNew(): void {
    this.prontuarioService.update(this.prontuario).subscribe(resposta =>{
      this.toast.success('Prontuário salvo com sucesso', 'Cadastro')
      this.router.navigate(['atender'])
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
