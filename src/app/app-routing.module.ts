import { AlunosParaBoletimComponent } from './alunos/porAluno/AlunosParaBoletim/AlunosParaBoletim.component';
import { LancamentoNotasComponent } from './lancamentoNotas/lancamentoNotas.component';
import { DetalhamentoProfessorComponent } from './professores/detalhamentoProfessor/detalhamentoProfessor.component';
import { EditProfessoresComponent } from './professores/editProfessores/editProfessores.component';
import { LoginComponent } from '../api/base/user/login/login.component';

import { ListadeAlunosComponent } from './alunos/detalhamento/ListadeAlunos/ListadeAlunos.component';
import { OitavoPeriodoComponent } from './alunos/oitavoPeriodo/oitavoPeriodo.component';
import { SextoPeriodoComponent } from './alunos/sextoPeriodo/sextoPeriodo.component';
import { SegundoPeriodoComponent } from './alunos/segundoPeriodo/segundoPeriodo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { HomeComponent } from './home/home.component';
import { DetalhamentoComponent } from './alunos/detalhamento/detalhamento.component';
import { EditComponent } from './alunos/edit/edit.component';
import { PrimeiroPeriodoComponent } from './alunos/primeiroPeriodo/primeiroPeriodo.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { PorBimestreComponent } from './alunos/porBimestre/porBimestre.component';
import { TerceiroPeriodoComponent } from './alunos/terceiroPeriodo/terceiroPeriodo.component';
import { ProfessoresComponent } from './professores/professores.component';
import { PorAlunoComponent } from './alunos/porAluno/porAluno.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'alunos', component: AlunosComponent, pathMatch: 'full'},
  { path: 'professores', component: ProfessoresComponent, pathMatch: 'full'},
  { path: 'entrar', component: LoginComponent, pathMatch: 'full'},
  { path: 'detalhamento/:id', component: DetalhamentoComponent, pathMatch: 'full'},
  { path: 'detalheProfessor/:id', component: DetalhamentoProfessorComponent, pathMatch: 'full'},
  { path: 'aluno/:id', component: EditComponent},
  { path: 'aluno', component: EditComponent},
  { path: 'professor/:id', component: EditProfessoresComponent},
  { path: 'professor', component: EditProfessoresComponent},
  { path: 'primeiroPeriodo', component: PrimeiroPeriodoComponent, pathMatch: 'full'},
  { path: 'segundoPeriodo', component: SegundoPeriodoComponent, pathMatch: 'full'},
  { path: 'terceiroPeriodo', component: TerceiroPeriodoComponent, pathMatch: 'full'},
  { path: 'sextoPeriodo', component: SextoPeriodoComponent, pathMatch: 'full'},
  { path: 'oitavoPeriodo', component: OitavoPeriodoComponent, pathMatch: 'full'},
  { path: 'disciplinas', component: DisciplinasComponent, pathMatch: 'full'},
  { path: 'listaAlunos', component: ListadeAlunosComponent, pathMatch: 'full'},
  { path: 'lancamentoNotas', component: LancamentoNotasComponent, pathMatch: 'full'},
  { path: 'porBimestre', component: PorBimestreComponent, pathMatch: 'full'},
  { path: 'porAluno/:id', component: PorAlunoComponent, pathMatch: 'full'},
  { path: 'porAluno', component: AlunosParaBoletimComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
