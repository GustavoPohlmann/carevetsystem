import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'tutors', component: TutorListComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
