
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

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'alunos', component: AlunosComponent, pathMatch: 'full'},
  { path: 'detalhamento/:id', component: DetalhamentoComponent, pathMatch: 'full'},
  { path: 'aluno/:id', component: EditComponent},
  { path: 'aluno', component: EditComponent},
  { path: 'primeiroPeriodo', component: PrimeiroPeriodoComponent, pathMatch: 'full'},
  { path: 'segundoPeriodo', component: SegundoPeriodoComponent, pathMatch: 'full'},
  { path: 'sextoPeriodo', component: SextoPeriodoComponent, pathMatch: 'full'},
  { path: 'oitavoPeriodo', component: OitavoPeriodoComponent, pathMatch: 'full'},
  { path: 'disciplinas', component: DisciplinasComponent, pathMatch: 'full'},
  { path: 'listaAlunos', component: ListadeAlunosComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
