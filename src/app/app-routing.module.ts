import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TutorCreateComponent } from './components/tutor/tutor-create/tutor-create.component';
import { TutorUpdateComponent } from './components/tutor/tutor-update/tutor-update.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { InformacaoPessoalFormComponent } from './components/informacaoPessoal/informacao-pessoal-form/informacao-pessoal-form.component';
import { AnotacaoFormComponent } from './components/anotacao/anotacao-form/anotacao-form.component';
import { CadernetaVacinaListComponent } from './components/cadernetaVacina/caderneta-vacina-list/caderneta-vacina-list.component';
import { CadernetaVacinaFormComponent } from './components/cadernetaVacina/caderneta-vacina-form/caderneta-vacina-form.component';
import { ProntuarioListComponent } from './components/prontuario/prontuario-list/prontuario-list.component';
import { ProntuarioFormComponent } from './components/prontuario/prontuario-form/prontuario-form.component';
import { HistoricoListComponent } from './components/historico/historico-list/historico-list.component';
import { HistoricoFormComponent } from './components/historico/historico-form/historico-form.component';
import { AgendaFormComponent } from './components/agenda/agenda-form/agenda-form.component';
import { OutrosFormComponent } from './components/outros/outros-form/outros-form.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'tutors', component: TutorListComponent},
      {path: 'tutors/create', component: TutorCreateComponent},
      {path: 'tutors/update/:id', component: TutorUpdateComponent},

      {path: 'animais', component: AnimalListComponent},
      {path: 'animais/create/:id', component: AnimalFormComponent},
      {path: 'animais/update/:id', component: AnimalFormComponent},
      
      {path: 'informacao-pessoal', component: InformacaoPessoalFormComponent},

      {path: 'anotacao', component: AnotacaoFormComponent},

      {path: 'cadeneta-vacina', component: CadernetaVacinaListComponent},
      {path: 'cadeneta-vacina/create/:id', component: CadernetaVacinaFormComponent},
      {path: 'cadeneta-vacina/update/:id', component: CadernetaVacinaFormComponent},

      {path: 'atender', component: ProntuarioListComponent},
      {path: 'atender/prontuario/:id', component: ProntuarioFormComponent},
      
      {path: 'historico', component: HistoricoListComponent},
      {path: 'historico/visualizar/:id', component: HistoricoFormComponent},

      {path: 'agenda', component: AgendaFormComponent},

      {path: 'outros', component: OutrosFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
