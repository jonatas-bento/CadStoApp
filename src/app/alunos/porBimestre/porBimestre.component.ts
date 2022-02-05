import { ActivatedRoute } from '@angular/router';
import { NotasService } from './../../../services/notas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunosService } from '../../../alunos.service';
import { Aluno } from '../aluno';
import { Notas } from '../../interfaces/Notas';
import { BoletimService } from '../../../services/boletim.service';
import { Boletim } from '../../interfaces/Boletim';
import { faAddressBook, faEdit } from '@fortawesome/free-regular-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-porBimestre',
  templateUrl: './porBimestre.component.html',
  styleUrls: ['./porBimestre.component.scss']
})
export class PorBimestreComponent implements OnInit {
  public radioGroupForm: FormGroup;
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


  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private notasService: NotasService,
    private boletimService: BoletimService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.gerarBoletimPrimeiroBimestre();
    this.loadData();
    this.gerarBoletimSegundoBimestre();
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });

  }

  loadData(){
    this.alunoService.getAlunos()
    .subscribe(result => {
      this.alunos = result
    }, (error: any) => console.log(error));
  }

  gerarBoletimPrimeiroBimestre(){
    debugger;
    this.boletimService.getAllBoletins()
    .pipe(map(dados => dados.filter(dado => dado.bimestre == 1)))
    .subscribe((result: any) => {
      this.dataPrimeiro = result;
      this.primeiroBimestre = true;
      });
   }

   gerarBoletimSegundoBimestre(){
     debugger;
     this.boletimService.getAllBoletins()
    .pipe(map(dados => dados.filter(dado => dado.bimestre == 2)))
     .subscribe((result: any) => {
      this.dataSegundo = result;
      this.segundoBimestre = true;
    })
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
