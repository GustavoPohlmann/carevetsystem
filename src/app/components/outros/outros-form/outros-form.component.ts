import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { OutrosService } from 'src/app/services/outros.service';

@Component({
  selector: 'app-outros-form',
  templateUrl: './outros-form.component.html',
  styleUrls: ['./outros-form.component.css']
})
export class OutrosFormComponent implements OnInit {

  animal: Animal = null;

  animais: Animal[] = [];

  constructor(
    private animalService : AnimalService,
    private outrosService : OutrosService,
    private toast: ToastrService,
  ) { }

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
  
  disalbeButton(): boolean {
    return this.animal == null;
  }

  gerarDeclaracaoObito(): void {
    this.outrosService.generatePdfObito(this.animal.idAnimal).subscribe((response) => {      
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      window.open(url, '_blank');
      
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toast.error('Erro ao gerar PDF:', error); 
    });
  }

  gerarTermoConsequentimento(): void {
    this.outrosService.generatePdfTermoConsentimento(this.animal.idAnimal).subscribe((response) => {      
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      window.open(url, '_blank');
      
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toast.error('Erro ao gerar PDF:', error);
    });
  }

}
