import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { Aluno } from "./aluno";
import { faEdit, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { concatMap, filter, map } from "rxjs/operators";
import { AlunosService } from "../../alunos.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NotasService } from "../../services/notas.service";
import { Notas } from '../interfaces/Notas';
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
  faAddressBook = faAddressBook;
  id: number;
  posArr: number;
  notas: Notas[];
  statusFinal: any;
  constructor(
    private http: HttpClient,
    private alunosService: AlunosService,
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService,
    private notasService: NotasService,
    private activatedRoute: ActivatedRoute) {  }


  ngOnInit() {
    this.loadData();
    this.notasAvailable();

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

status(media: any){
  if(!media)
  return '-';
  if(media >= 6){
    return 'APROVADO';
  } else {
    return 'REPROVADO';
  }
}

notasAvailable(){
  this.notasService.getAllNotas()
  .subscribe((result) =>{
    debugger;
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.posArr = this.id-1;
    this.notas = result;
     this.statusFinal = this.notas.forEach((nota)=> {
      let media = nota.av1 + nota.av2 + nota.av3;
      if (media >=6){
        return "Aprovado";
      } else{
        return "Reprovado";
      }
    });
    });
  }

}
