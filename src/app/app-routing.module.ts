import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TutorCreateComponent } from './components/tutor/tutor-create/tutor-create.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'tutors', component: TutorListComponent},
      {path: 'tutors/create', component: TutorCreateComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
