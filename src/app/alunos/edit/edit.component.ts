import { Component, Inject, OnInit, SystemJsNgModuleLoader } from '@angular/core';
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
      av1: new FormControl('', Validators.required),
      av2: new FormControl('', Validators.required),
      bonus: new FormControl('', Validators.required)
    });

    this.loadData();
  }

  loadData(){
    //retrieve ID from 'id' parameter
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      if(this.id){
    //Edit Mode

    //fetch the student from the server
    const url = this.baseUrl + "api/Alunos/" + this.id;
    this.http.get<Aluno>(url).subscribe(result =>{
      this.aluno = result;
      this.title = "Editando dados de " + this.aluno.Nome;

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

    aluno.Nome = this.form.get("nome").value;
    aluno.Periodo = this.form.get("periodo").value;
    aluno.Av1 = this.form.get("av1").value;
    aluno.Av2 = this.form.get("av2").value;
    aluno.Bonus = this.form.get("bonus").value;

    //Edit Mode
    if(this.id) {

      const url = this.baseUrl + "api/Alunos/" + this.id;
      this.http
        .put<Aluno>(url, aluno)
          .subscribe(result =>{
            console.log("Aluno " + aluno.Nome + " has been updated.");

            //go back to student view
            this.router.navigate(['./alunos']);
          }, error => console.log(error));
      }
      else {

      //Add new Mode
      const url = this.baseUrl + "api/Alunos/";
      this.http
        .post<Aluno>(url, aluno)
          .subscribe(result =>{
            console.log("Aluno " + result.id + " has been created.");

            this.router.navigate(['./alunos']);
          }, error => console.log(error));
      }
    }

}




