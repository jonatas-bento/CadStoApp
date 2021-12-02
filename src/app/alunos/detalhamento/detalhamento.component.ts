import { AlunosComponent } from './../alunos.component';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Aluno } from '../aluno';
import { AlunosService } from '../../../alunos.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  comentarios: string;
  notaFinal: number;
  av1: number;
  av2: number;
  bonus: number;
  status: string;
  resultado: number;
  disciplina: string;


  constructor(
    private alunosService: AlunosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

   }


  ngOnInit() {




      this.loadData();

  }
loadData(){
// debugger;
  this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    const url = this.baseUrl + 'api/Alunos/' + this.id;
    this.http.get<Aluno>(url)
    .subscribe(result =>{
      this.aluno = result;
      this.nome = this.aluno.Nome;
      this.periodo = this.aluno.Periodo;
      this.nomeFoto = this.aluno.NomeFoto;
      this.comentarios = this.aluno.Comentarios;
      this.av1 = this.aluno.Av1;
      this.av2 = this.aluno.Av2;
      this.bonus = this.aluno.Bonus;
      this.resultado = this.av1 + this.av2 + this.bonus;
      this.notaFinal = (this.resultado>10) ? 10 : this.resultado;
      this.status = (this.notaFinal>=6) ? 'Aprovado' : 'Reprovado';
      this.disciplina = (this.periodo === "2º" || this.periodo === "1º")
      ? this.disciplina = 'Teologia Bíblica do Antigo Testamento - Literatura Profética'
      : this.disciplina = 'Didática Geral';
    }, error => console.log(error));


}

}
