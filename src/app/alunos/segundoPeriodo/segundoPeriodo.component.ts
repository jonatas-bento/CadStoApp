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
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
  'notaFinal', 'status'];
  alunos: Aluno[];

  constructor(private http: HttpClient,
    @Inject ('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService,
    private alunosService: AlunosService) { }

  ngOnInit() {
    this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.Periodo == "2º")))
    .subscribe(result =>
        this.alunos = result),
        (error: any) => console.error(error);
        () => this.spinner.hide();
  }

  media(a: number, b: number, c?: number) {
    let resultado = a+b+c;
    return resultado > 10 ? resultado = 10 : resultado;
  }

  status(media: number){
    if(!media)
    return '-';
    if(media >= 6){
      return 'APROVADO';
    } else {
      return 'REPROVADO';
    }
  }
}
