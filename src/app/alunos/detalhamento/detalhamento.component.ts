import { DisciplinasService } from './../../../services/disciplinas.service';
import { Notas } from './../../interfaces/Notas';
import { AlunosComponent } from './../alunos.component';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Aluno } from '../aluno';
import { AlunosService } from '../../../alunos.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotasService } from '../../../services/notas.service';
import { Disciplinas } from '../../interfaces/Disciplinas';


@Component({
  selector: 'app-detalhamento',
  templateUrl: './detalhamento.component.html',
  styleUrls: ['./detalhamento.component.scss']
})
export class DetalhamentoComponent implements OnInit {
  aluno: Aluno;
  id?: number;
  nome: string;
  periodo: string;
  nomeFoto: string;
  disciplina: Disciplinas;
  nomeDisciplina: string;
  nota: Notas;
  av1: number;
  av2: number;
  av3: number;
  notaFinal: number;
  status: string;
  posArr: number;


  constructor(
    private alunosService: AlunosService,
    private notasService: NotasService,
    private disciplinasService: DisciplinasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

   }


  ngOnInit() {

      this.loadData();
      this.disciplinasAvailable();
  }
loadData(){
  this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.alunosService.getAlunosById(this.id)
    .subscribe(result =>{
      this.aluno = result;
      this.nome = this.aluno.nome;
      this.periodo = this.aluno.periodo;
      this.nomeFoto = this.aluno.nomeFoto;
    }, error => console.log(error));
}

notasAvailable(){
  debugger;
  this.notasService.getAllNotas()
  .subscribe((result) =>{
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.posArr = this.id;
    this.nota = result;
    this.av1 = this.nota[this.posArr].av1;
    this.av2 = this.nota[this.posArr].av2;
    this.av3 = this.nota[this.posArr].av3;
    this.notaFinal = this.av1+this.av2+this.av3;
    this.status = (this.notaFinal >= 6) ?
          "Aprovado"  :
          "Reprovado";
    });
  }

  disciplinasAvailable(){
    this.disciplinasService.getAllDisciplinas()
    .subscribe((result) =>{
      this.disciplina = result;
      //find the best way to capture the id number from de discipline
      this.nomeDisciplina = this.disciplina[this.id].nome;
    })
  }
}
