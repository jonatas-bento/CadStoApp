import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { Aluno } from "./aluno";
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { concatMap, filter, map } from "rxjs/operators";
import { AlunosService } from "../../alunos.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
   'notaFinal', 'status', 'acoes'];
  public alunos: Aluno[];
  faEdit = faEdit;

  constructor(
    private http: HttpClient,
    private alunosService: AlunosService,
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService) {  }


  ngOnInit() {
    this.loadData();

}

loadData(){
this.spinner.show();
this.alunosService.getAlunos()
.subscribe(result =>
  this.alunos = result)
, (error: any) => console.log(error);
this.spinner.hide();
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
