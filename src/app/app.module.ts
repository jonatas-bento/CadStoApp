import { UserService } from './../api/base/user/userService';
import { SextoPeriodoComponent } from './alunos/sextoPeriodo/sextoPeriodo.component';
import { SegundoPeriodoComponent } from './alunos/segundoPeriodo/segundoPeriodo.component';
import { PrimeiroPeriodoComponent } from './alunos/primeiroPeriodo/primeiroPeriodo.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularMaterialModule} from './angular.material.module';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    AlunosComponent,
    DetalhamentoComponent,
    EditComponent,
    PrimeiroPeriodoComponent,
    SegundoPeriodoComponent,
    SextoPeriodoComponent,
    OitavoPeriodoComponent,
    PorBimestreComponent,
    DisciplinasComponent,
    FooterComponent,
    ListadeAlunosComponent,
    LoginComponent,
    MenuUserComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'BASE_URL',
      useValue: environment.root
    },
    AlunosService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
