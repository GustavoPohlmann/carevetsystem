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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
