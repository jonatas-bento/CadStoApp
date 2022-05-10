import { AlunosService } from './../../../../alunos.service';
import { Aluno } from './../../aluno';
import { Component, OnInit } from '@angular/core';
import { faEdit, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ListadeAlunos',
  templateUrl: './ListadeAlunos.component.html',
  styleUrls: ['./ListadeAlunos.component.scss']
})
export class ListadeAlunosComponent implements OnInit {
public alunos: Aluno[];
public displayedColumns: string[] = ['matricula', 'nome', 'periodo', 'acoes'];
faEdit = faEdit;
faAdressBook = faAddressBook;
  constructor(private alunosService: AlunosService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.loadData();

  }

  loadData(){
    this.spinner.show();
    this.alunosService.getAlunos().subscribe(result =>
      this.alunos = result)
    , (error: any) => console.log(error);
    ()=> this.spinner.hide();
  }

// media(a: number, b: number, c?: number) {
//   let resultado = a+b+c;
//   return resultado > 10 ? resultado = 10 : resultado;
// }

// status(media){
//   if(!media)
//   return '-';
//   if(media >= 6){
//     return 'APROVADO';
//   } else {
//     return 'REPROVADO';
//   }
// }

}
