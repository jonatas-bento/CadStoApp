import { Disciplinas } from './../../interfaces/Disciplinas';
import { ActivatedRoute } from '@angular/router';
import { ProfessoresService } from './../../../services/professores.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from '../../interfaces/Professor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhamentoProfessor',
  templateUrl: './detalhamentoProfessor.component.html',
  styleUrls: ['./detalhamentoProfessor.component.scss']
})
export class DetalhamentoProfessorComponent implements OnInit {
  professor: Professor;
  nome: string;
  nomeFoto: string;
  descricao: string;
  data: string;
  id?: number;
  disciplinas: Disciplinas[];

  constructor(private professoresService: ProfessoresService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.professoresService.getProfessoresById(this.id)
    .subscribe((result: any) =>{
      this.professor = result;
      this.descricao = this.professor.descricaoProfessor;
      this.nome = this.professor.nomeCompleto;
      this.nomeFoto = this.professor.nomeFoto;
      let dateNotConverted = this.professor.data_Nascimento;
      this.data = this.datePipe.transform(dateNotConverted, 'dd/MM/YYYY');

      this.disciplinas = this.disciplinaAtiva(result.disciplinas);
      console.log(this.disciplinas);
    });
  }

  disciplinaAtiva(disciplinas: Disciplinas[]){
    debugger;
    let monthIndex: number = new Date().getMonth();
    if ((monthIndex >= 1 && monthIndex <= 3) || (monthIndex >= 7 && monthIndex <= 9)){
     return disciplinas.filter(disciplina => disciplina.bimestre == 1);
    } else {
     return disciplinas.filter(disciplina => disciplina.bimestre == 2);
    }
  }

}
