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
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
  'notaFinal', 'status'];
  alunos: Aluno[];

  constructor(
    private http: HttpClient,
    @Inject ('BASE_URL') private baseUrl: string,
    private alunosService: AlunosService,
    private spinner: NgxSpinnerService)
    {
      this.alunosService = alunosService;
    }

  ngOnInit() {
    this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.Periodo == "6º")))
    .subscribe(result =>
        this.alunos = result),
        (error: any) => console.error(error);
        () => this.spinner.hide();

  }

  media(a: number, b: number, c?: number) {
    let resultado = a+b+c;
    return resultado > 10 ? resultado = 10 : resultado;
  }

  status(media){
    if(!media)
    return '-';
    if(media >= 6){
      return 'APROVADO';
    } else {
      return 'REPROVADO';
    }
  }
}
