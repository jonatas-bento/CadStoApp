import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Professor } from './../../interfaces/Professor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessoresService } from './../../../services/professores.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseFormComponent } from '../../base.form.component';

@Component({
  selector: 'app-editProfessores',
  templateUrl: './editProfessores.component.html',
  styleUrls: ['./editProfessores.component.scss']
})
export class EditProfessoresComponent extends BaseFormComponent implements OnInit {
id?: number;
professor: Professor;
form: FormGroup
title: string;
  constructor(private professoresService: ProfessoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
    ) {
      super();
     }

  ngOnInit() {

    this.form = new FormGroup({
      nomeCompleto: new FormControl('', Validators.required),
      descricaoProfessor: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
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
    this.professoresService.getProfessoresById(this.id).subscribe(result =>{
      this.professor = result;
      this.title = "Editando dados de " + this.professor.nomeCompleto;

      //update the form with the student value
      this.form.patchValue(this.professor);
    }, error => console.error(error));

  }
  else {

    //Add new mode

    this.title = "Inserir Novo Professor"

  }
}
  onSubmit(){

    const professor = (this.id) ? this.professor: <Professor>{};

    professor.nomeCompleto = this.form.get("nomeCompleto").value;
    professor.descricaoProfessor = this.form.get("descricaoProfessor").value;
    professor.email = this.form.get("email").value;
    professor.nomeFoto = this.form.get("nomeFoto").value;

    //Edit Mode
    if(this.id) {

      const url = this.baseUrl + "api/Professores/" + this.id;
      this.professoresService.editProfessor(professor, this.id)
          .subscribe(result =>{
            console.log("Professor " + result.nomeCompleto + " has been updated.");

            //go back to student view
            this.router.navigate(['./professores']);
          }, error => console.log(error));
      }
      else {

      //Add new Mode
      debugger;
      this.professoresService.addProfessor(professor)
          .subscribe(result =>{
            console.log("Professor " + result.id + " has been created.");

            this.router.navigate(['./professores']);
          }, error => console.log(error));
      }
    }
}
