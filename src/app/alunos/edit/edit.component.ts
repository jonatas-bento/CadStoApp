import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Aluno } from './../aluno';
import { AlunosService } from '../../../alunos.service';

import { BaseFormComponent } from '../../base.form.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends BaseFormComponent implements OnInit {

  title: string;
  form: FormGroup;

  aluno: Aluno;
  id?: number;

  constructor(
    private alunosService: AlunosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
      super();
     }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      periodo: new FormControl('', Validators.required),
      nomeFoto: new FormControl('', Validators.required)
    });

    this.loadData();
  }

  loadData(){
    debugger;
    //retrieve ID from 'id' parameter
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      if(this.id){
    //Edit Mode

    //fetch the student from the server
    this.alunosService.getAlunosById(this.id).subscribe(result =>{
      this.aluno = result;
      this.title = "Editando dados de " + this.aluno.nome;

      //update the form with the student value
      this.form.patchValue(this.aluno);
    }, error => console.error(error));

  }
  else {

    //Add new mode

    this.title = "Inserir novo Aluno"

  }
}
  onSubmit(){

    const aluno = (this.id) ? this.aluno: <Aluno>{};

    aluno.nome = this.form.get("nome").value;
    aluno.periodo = this.form.get("periodo").value;
    aluno.nomeFoto = this.form.get("nomeFoto").value;

    //Edit Mode
    if(this.id) {

      const url = this.baseUrl + "api/Alunos/" + this.id;
      this.alunosService.editAluno(aluno, this.id)
          .subscribe(result =>{
            console.log("Aluno " + result.nome + " has been updated.");

            //go back to student view
            this.router.navigate(['./listaAlunos']);
          }, error => console.log(error));
      }
      else {

      //Add new Mode
      debugger;
      this.alunosService.addAluno(aluno)
          .subscribe(result =>{
            console.log("Aluno " + result.id + " has been created.");

            this.router.navigate(['./listaAlunos']);
          }, error => console.log(error));
      }
    }

}




