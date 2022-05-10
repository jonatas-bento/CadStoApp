import { NgxSpinnerService } from 'ngx-spinner';
import { AlunosService } from './../../../alunos.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-sextoPeriodo',
  templateUrl: './sextoPeriodo.component.html',
  styleUrls: ['./sextoPeriodo.component.scss']
})
export class SextoPeriodoComponent implements OnInit {
  public displayedColumns: string[] = ['nome', 'periodo', 'acoes'];
  alunos: Aluno[];
  naoContemAlunos = false;

  constructor(
    private http: HttpClient,
    @Inject ('BASE_URL') private baseUrl: string,
    private alunosService: AlunosService,
    private spinner: NgxSpinnerService)
    {
      this.alunosService = alunosService;
    }

  ngOnInit() {
    this.loadData();
  }

loadData(){
  this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.Periodo == "6º")))
    .subscribe(result =>{
      if (result.length == 0){
        this.naoContemAlunos = true;
      } else{
        this.alunos = result;
      }
    });
}
}
