import { AlunosService } from './../../../alunos.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-segundoPeriodo',
  templateUrl: './segundoPeriodo.component.html',
  styleUrls: ['./segundoPeriodo.component.scss']
})
export class SegundoPeriodoComponent implements OnInit {
  public displayedColumns: string[] = ['nome', 'periodo', 'acoes'];
  alunosSegundoPeriodo: Aluno[];
  naoContemAlunos = false;

  constructor(private http: HttpClient,
    @Inject ('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService,
    private alunosService: AlunosService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.periodo == "2º")))
    .subscribe(result =>{
      debugger;
      console.log(result);
      if (result.length == 0){
        this.naoContemAlunos = true;
      } else{
        this.alunosSegundoPeriodo = result;
      }
    });
  }

}
