import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-outros-form',
  templateUrl: './outros-form.component.html',
  styleUrls: ['./outros-form.component.css']
})
export class OutrosFormComponent implements OnInit {

  animal: Animal = null;

  animais: Animal[] = [];

  constructor(private animalService : AnimalService) { }

  ngOnInit(): void {
    this.findAllAnimal();
  }

  findAllAnimal(): void {
    this.animalService.findAll().subscribe(resposta => {
      this.animais = resposta;
    })
  }

  onChangeAnimal(): void {
    this.animal = null;
  }

  gerarDeclaracaoObito(): void {
    console.log('Gerar Declaração de Óbito');
  }

  gerarTermoConsequentimento(): void {
    console.log('Gerar Termo de Consequentimento');
  }

}
