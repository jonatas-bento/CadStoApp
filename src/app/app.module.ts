import { AlunosParaBoletimComponent } from './alunos/porAluno/AlunosParaBoletim/AlunosParaBoletim.component';
import { PorAlunoComponent } from './alunos/porAluno/porAluno.component';
import { DetalhamentoProfessorComponent } from './professores/detalhamentoProfessor/detalhamentoProfessor.component';
import { EditProfessoresComponent } from './professores/editProfessores/editProfessores.component';
import { ProfessoresService } from './../services/professores.service';
import { TerceiroPeriodoComponent } from './alunos/terceiroPeriodo/terceiroPeriodo.component';
import { TokenInterceptorService } from './../services/httpInterceptor.service';
import { UserService } from './../api/base/user/userService';
import { SextoPeriodoComponent } from './alunos/sextoPeriodo/sextoPeriodo.component';
import { SegundoPeriodoComponent } from './alunos/segundoPeriodo/segundoPeriodo.component';
import { PrimeiroPeriodoComponent } from './alunos/primeiroPeriodo/primeiroPeriodo.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularMaterialModule} from './angular.material.module';
import {MatInputModule} from '@angular/material/input';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunosService } from '../alunos.service';
import { EditComponent } from './alunos/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalhamentoComponent } from './alunos/detalhamento/detalhamento.component';
import { OitavoPeriodoComponent } from './alunos/oitavoPeriodo/oitavoPeriodo.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { FooterComponent } from './footer/footer.component';
import { ListadeAlunosComponent } from './alunos/detalhamento/ListadeAlunos/ListadeAlunos.component';
import { LoginComponent } from '../api/base/user/login/login.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PorBimestreComponent } from './alunos/porBimestre/porBimestre.component';
import { MenuUserComponent } from '../api/base/user/menu/menu.user.component';
import { BoletimService } from '../services/boletim.service';
import { ProfessoresComponent } from './professores/professores.component';
import { DatePipe } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LancamentoNotasComponent } from './lancamentoNotas/lancamentoNotas.component';
import { DialogBoxComponent } from './lancamentoNotas/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    AlunosComponent,
    DetalhamentoComponent,
    DetalhamentoProfessorComponent,
    DialogBoxComponent,
    EditComponent,
    EditProfessoresComponent,
    PrimeiroPeriodoComponent,
    SegundoPeriodoComponent,
    SextoPeriodoComponent,
    OitavoPeriodoComponent,
    TerceiroPeriodoComponent,
    PorBimestreComponent,
    DisciplinasComponent,
    FooterComponent,
    ListadeAlunosComponent,
    LoginComponent,
    MenuUserComponent,
    ProfessoresComponent,
    PorAlunoComponent,
    AlunosParaBoletimComponent,
      LancamentoNotasComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    NgbModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'BASE_URL',
      useValue: environment.root
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AlunosService,
    UserService,
    BoletimService,
    ProfessoresService,
    DatePipe,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
