import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';

@Component({
  selector: 'app-historico-form',
  templateUrl: './historico-form.component.html',
  styleUrls: ['./historico-form.component.css']
})
export class HistoricoFormComponent implements OnInit {

  prontuario : Prontuario = {
    idProntuario: '',
    dataCadastro: new Date(),
    anamnese: '',
    prescrisaoOrientacao: '',
    exames: '',
    procedimentoRealizado: '',
    usuario: null,
    animal: null,
    agenda: null
  };

  constructor(
    private prontuarioService : ProntuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.prontuario.idProntuario = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.prontuarioService.findById(this.prontuario.idProntuario).subscribe(resposta =>{
      this.prontuario = resposta;
    });
  }
}
