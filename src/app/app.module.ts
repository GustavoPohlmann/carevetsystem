import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TutorCreateComponent } from './components/tutor/tutor-create/tutor-create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TutorUpdateComponent } from './components/tutor/tutor-update/tutor-update.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { InformacaoPessoalFormComponent } from './components/informacaoPessoal/informacao-pessoal-form/informacao-pessoal-form.component';
import { AnotacaoFormComponent } from './components/anotacao/anotacao-form/anotacao-form.component';
import { CadernetaVacinaListComponent } from './components/cadernetaVacina/caderneta-vacina-list/caderneta-vacina-list.component';
import { CadernetaVacinaFormComponent } from './components/cadernetaVacina/caderneta-vacina-form/caderneta-vacina-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { VacinaDialogComponent } from './components/cadernetaVacina/caderneta-vacina-form/vacina-dialog/vacina-dialog.component';
import { ProntuarioListComponent } from './components/prontuario/prontuario-list/prontuario-list.component';
import { ProntuarioFormComponent } from './components/prontuario/prontuario-form/prontuario-form.component';
import { ProntuarioAgendarDialogComponent } from './components/prontuario/prontuario-list/prontuario-agendar-dialog/prontuario-agendar-dialog.component';
import { HistoricoListComponent } from './components/historico/historico-list/historico-list.component';
import { HistoricoFormComponent } from './components/historico/historico-form/historico-form.component';
import { TeleAtendimentoDialogComponent } from './components/prontuario/prontuario-form/tele-atendimento-dialog/tele-atendimento-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgendaFormComponent } from './components/agenda/agenda-form/agenda-form.component';
import { OutrosFormComponent } from './components/outros/outros-form/outros-form.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './customArquiteture/custom-paginator-intl';
import { AgendaDialogComponent } from './components/agenda/agenda-form/agenda-dialog/agenda-dialog.component';
import { CustomDateAdapter } from './customArquiteture/custom-date-adapter';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TutorListComponent,
    LoginComponent,
    TutorCreateComponent,
    TutorUpdateComponent,
    AnimalListComponent,
    AnimalFormComponent,
    InformacaoPessoalFormComponent,
    AnotacaoFormComponent,
    CadernetaVacinaListComponent,
    CadernetaVacinaFormComponent,
    VacinaDialogComponent,
    ProntuarioListComponent,
    ProntuarioFormComponent,
    ProntuarioAgendarDialogComponent,
    HistoricoListComponent,
    HistoricoFormComponent,
    TeleAtendimentoDialogComponent,
    AgendaFormComponent,
    OutrosFormComponent,
    AgendaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    FullCalendarModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    AuthInterceptorProvider,
    { provide: MatPaginatorIntl, useValue: CustomPaginatorIntl() },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
