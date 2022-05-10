import { AlunosService } from './../../../alunos.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-terceiroPeriodo',
  templateUrl: './terceiroPeriodo.component.html',
  styleUrls: ['./terceiroPeriodo.component.css']
})
export class TerceiroPeriodoComponent implements OnInit {
  public displayedColumns: string[] = ['nome', 'periodo', 'acoes'];
  alunos: Aluno[];
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
    .pipe(map(alunos => alunos.filter(aluno => aluno.periodo == "3º")))
    .subscribe(result =>{
      debugger;
      console.log(result);
      if (result.length == 0){
        this.naoContemAlunos = true;
      } else{
        this.alunos = result;
      }
    });
  }

}





