import { Disciplinas } from './../../interfaces/Disciplinas';
import { Aluno } from './../../alunos/aluno';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotasService } from '../../../services/notas.service';
import { Notas } from '../../interfaces/Notas';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunosService } from '../../../alunos.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { DisciplinasService } from '../../../services/disciplinas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
form: FormGroup;
id: number;
nota: Notas;
alunoIdChanged: number;
myDataArray: any;
studentName: any;
disciplineName: any;
studentId: number;
students: Aluno[];
disciplinas: Disciplinas[];
@Output() dataSent = new EventEmitter();

public newNotaAluno = {alunoId: 0, disciplinaId: 1, av1: 0, av2: 0, av3: 0, bimestre: 1};

constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
  private activatedRoute: ActivatedRoute,
  private alunosService: AlunosService,
  private disciplinasService: DisciplinasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notasService: NotasService,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    public fb: FormBuilder) { }
    registrationForm = this.fb.group({
      studentName: ['', [Validators.required]],
    });


  ngOnInit() {
    this.getStudents();
    this.getDisciplinas();
    this.form = new FormGroup({
      alunoId: new FormControl('', Validators.required),
      disciplinaId: new FormControl('', Validators.required),
      av1: new FormControl('', Validators.required),
      av2: new FormControl('', Validators.required),
      av3: new FormControl('', Validators.required),
      bimestre: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    }


    getStudents(){
      this.alunosService.getAlunos()
      .subscribe(result => this.students = result);
    }

    getDisciplinas(){
      this.disciplinasService.getAllDisciplinas()
      .subscribe(result => this.disciplinas = result);
    }

    changeStudent(e: any){
      this.studentName?.setValue(e.target.value, {
        onlySelf: true,
      });
      this.newNotaAluno.alunoId = e.target.value;
    }

    changeDiscipline(e: any){
      this.disciplineName?.setValue(e.target.value, {
        onlySelf: true,
      });
      this.newNotaAluno.disciplinaId = e.target.value;
    }

    onSubmit(){

          const nota = (this.id) ? this.nota: <Notas>{};

          nota.alunoId = this.form.get("alunoId").value;
          nota.disciplinaId = this.form.get("disciplinaId").value;
          nota.av1 = this.form.get("av1").value;
          nota.av2 = this.form.get("av2").value;
          nota.av3 = this.form.get("av3").value;
          nota.Bimestre = this.form.get("bimestre").value;

          //Edit Mode
          if(this.id) {

            const url = this.baseUrl + "api/Notas/" + this.id;
            this.notasService.editNota(nota, this.id)
                .subscribe(result =>{
                  console.log("Nota do aluno " + result.alunoId + " has been updated.");

                  //go back to student view
                  this.router.navigate(['./notas']);
                }, error => console.log(error));
            }
            else {

            //Add new Mode

            this.notasService.addNota(nota)
                .subscribe(result =>{
                  // console.log("Nota do" + result.alunoId + " para a " + result.disciplinaId + "has been created.");
                  this.myDataArray = result;
                  // this.router.navigate(['./notas']);
                }, error => console.log(error));
                Swal.fire('Nota Adcionada com sucesso..!')
            }
            this.dialogRef.close();
          }

}



