import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AlunosService } from '../../../alunos.service';
import { Aluno } from '../aluno';
@Component({
  selector: 'app-primeiroPeriodo',
  templateUrl: './primeiroPeriodo.component.html',
  styleUrls: ['./primeiroPeriodo.component.scss']
})
export class PrimeiroPeriodoComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
  'notaFinal', 'status'];
  public alunos: Aluno[];

  constructor(private http: HttpClient,
    private alunosService: AlunosService,
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
   this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.Periodo == "1º")))
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
