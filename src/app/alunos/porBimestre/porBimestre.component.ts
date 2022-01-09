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

@Component({
  selector: 'app-porBimestre',
  templateUrl: './porBimestre.component.html',
  styleUrls: ['./porBimestre.component.scss']
})
export class PorBimestreComponent implements OnInit {
  public radioGroupForm: FormGroup;
  public displayedColumns: string[] = ['id', 'nome', 'periodo', 'av1', 'av2', 'bonus',
   'notaFinal', 'status', 'acoes'];
   faEdit = faEdit;
   faAddressBook = faAddressBook;
  id?: number;
  idAluno: number;
  nome: string;
  periodo: string;
  nomeFoto: string;
  idDisciplina: number;
  active = 1;
  data: any;
  av1: number;
  av2: number;
  av3: number;
  notaFinal: number;
  status: string;
  posArr: number;
  alunos: Aluno[];
  notas: Notas[];
  segundoBimestre: boolean = false;
  primeiroBimestre: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private notasService: NotasService,
    private boletimService: BoletimService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
    this.gerarBoletim();
    this.loadData();
    // this.notasAvailable();
  }

  loadData(){
    this.alunoService.getAlunos()
    .subscribe(result => {
      this.alunos = result
    }, (error: any) => console.log(error));
  }

  gerarBoletim(){

    this.boletimService.getAllBoletins()
    .subscribe((result: any) => {
      console.log(result);
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.posArr = this.id;
      this.data = result;

      this.av1 = result[this.posArr].notas.av1
      this.av2 = result[this.posArr].notas.av2;
      this.av3 = result[this.posArr].notas.av3;

      this.idAluno = result[this.posArr].alunos.id;
      this.nome = result[this.posArr].alunos.nome;
      this.nomeFoto = result[this.posArr].alunos.nomeFoto;
      this.periodo = result[this.posArr].alunos.periodo;
      this.idDisciplina =  result[this.posArr].alunos.disciplinaId
      debugger;
      if(result[this.posArr].notas.bimestre == 2){
        this.segundoBimestre = true;
      } else {
        this.primeiroBimestre = true;
      }
      });

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
