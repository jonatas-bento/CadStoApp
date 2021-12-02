import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Aluno } from '../aluno';
import { AlunosService } from '../../../alunos.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-oitavoPeriodo',
  templateUrl: './oitavoPeriodo.component.html',
  styleUrls: ['./oitavoPeriodo.component.scss']
})
export class OitavoPeriodoComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
  'notaFinal', 'status'];
  public alunos: Aluno[];


constructor(
  private http: HttpClient,
  @Inject('BASE_URL') private baseUrl: string,
  private alunosService : AlunosService,
  private spinner: NgxSpinnerService) {
}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.alunosService.getAlunos()
    .pipe(map(alunos => alunos.filter(aluno => aluno.Periodo == "8º")))
    .subscribe(result =>
      this.alunos = result),
      (error: any) => console.error(error);
    ()=>this.spinner.hide();
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
