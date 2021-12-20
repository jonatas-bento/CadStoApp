import { ActivatedRoute } from '@angular/router';
import { NotasService } from './../../../services/notas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunosService } from '../../../alunos.service';
import { Aluno } from '../aluno';
import { Notas } from '../../interfaces/Notas';

@Component({
  selector: 'app-porBimestre',
  templateUrl: './porBimestre.component.html',
  styleUrls: ['./porBimestre.component.scss']
})
export class PorBimestreComponent implements OnInit {
  public radioGroupForm: FormGroup;
  id?: number;
  alunos: Aluno[];
  active = 1;
  nota: Notas;
  av1: number;
  av2: number;
  av3: number;
  notaFinal: number;
  status: string;
  posArr: number;


  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private notasService: NotasService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
    this.loadData();
    this.notasAvailable();
  }

  loadData(){
    this.alunoService.getAlunos()
    .subscribe(result => {
      this.alunos = result
    }, (error: any) => console.log(error));
  }

  notasAvailable(){
    this.notasService.getAllNotas()
    .subscribe((result) =>{
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.posArr = this.id-1;
      this.nota = result;
      this.av1 = this.nota[this.posArr].aV1;
      this.av2 = this.nota[this.posArr].aV2;
      this.av3 = this.nota[this.posArr].aV3;
      this.notaFinal = this.av1+this.av2+this.av3;
      this.status = (this.notaFinal >= 6) ?
            "Aprovado"  :
            "Reprovado";
      });
    }
}
