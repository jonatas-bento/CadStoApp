import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faAddressBook, faEdit } from '@fortawesome/free-regular-svg-icons';
import { map } from 'rxjs/operators';
import { AlunosService } from '../../../alunos.service';
import { BoletimService } from '../../../services/boletim.service';
import { Notas } from '../../interfaces/Notas';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-porAluno',
  templateUrl: './porAluno.component.html',
  styleUrls: ['./porAluno.component.scss']
})
export class PorAlunoComponent implements OnInit {
  public displayedColumns: string[] = ['aluno', 'disciplina', 'av1', 'av2', 'av3',
  'notaFinal', 'status', 'acoes'];
  faEdit = faEdit;
  faAddressBook = faAddressBook;
 id?: number;
 active = 3;
 dataPrimeiro: any;
 dataSegundo: any;

 alunos: Aluno[];
 notas: Notas[];
 notasPrimeiroBimestre: Notas[];
 notasSegundoBimestre: Notas[];
 segundoBimestre: boolean = false;
 primeiroBimestre: boolean = false;

  constructor(private boletimService: BoletimService,
    private alunoService: AlunosService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
    debugger;
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getBoletimPorAluno(this.id);
  }

  getBoletimPorAluno(idAluno: number){
    debugger;
    this.boletimService.getAllBoletins().pipe(map(dados => dados.filter(dado =>
      dado.id == idAluno)))
      .subscribe(result =>{
        this.dataPrimeiro = result;
      })
  }

  loadData(){
    this.alunoService.getAlunos()
    .subscribe(result => {
      this.alunos = result
    }, (error: any) => console.log(error));
  }

  media(a: number, b: number, c?: number) {
    let resultado = a+b+c;
    return resultado > 10 ? resultado = 10 : resultado;
  }

  statusFinal(media: any){
    if(!media)
    return '-';
    if(media >= 6){
      return 'APROVADO';
    } else {
      return 'REPROVADO';
    }
  }

}
