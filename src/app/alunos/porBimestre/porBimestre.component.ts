import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunosService } from '../../../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-porBimestre',
  templateUrl: './porBimestre.component.html',
  styleUrls: ['./porBimestre.component.scss']
})
export class PorBimestreComponent implements OnInit {
  public radioGroupForm: FormGroup;
  alunos: Aluno[];
  active = 1;


  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunosService) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
    this.loadData();
  }

  loadData(){
    this.alunoService.getAlunos()
    .subscribe(result => {
      this.alunos = result
    }, (error: any) => console.log(error));
  }
}
