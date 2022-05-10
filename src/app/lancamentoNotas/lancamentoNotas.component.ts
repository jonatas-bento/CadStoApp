import { Notas } from './../interfaces/Notas';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import { Router } from '@angular/router';
import { BoletimService } from '../../services/boletim.service';

@Component({
  selector: 'app-lancamentoNotas',
  templateUrl: './lancamentoNotas.component.html',
  styleUrls: ['./lancamentoNotas.component.scss']
})
export class LancamentoNotasComponent implements OnInit {
  nota: Notas;
  id: number;
  status: string;
  idAluno: number;
  form: FormGroup;
  public displayedColumns: string[] = ['nome', 'disciplina', 'av1', 'av2', 'av3', 'status', 'bimestre'];
  notas: Notas[];
  public USER_DATA: Notas[] = [];

  public newNotaAluno = {alunoId: 0, disciplinaId: 1, av1: 0, av2: 0, av3: 0, bimestre: 1};

  public myDataArray: any;



  constructor(public dialog: MatDialog,
    private notasService: NotasService,
    private router: Router,
    private boletimService: BoletimService,
    @Inject('BASE_URL') private baseUrl: string) {
    this.myDataArray = new MatTableDataSource<Notas>([...this.USER_DATA]);
  }

  ngOnInit() {
    this.form = new FormGroup({
      alunoId: new FormControl('', Validators.required),
      disciplinaId: new FormControl('', Validators.required),
      av1: new FormControl('', Validators.required),
      av2: new FormControl('', Validators.required),
      av3: new FormControl('', Validators.required),
      bimestre: new FormControl('', Validators.required),
    });
    this.loadData();
  }

//   onSubmit(){
// debugger;
//     const nota = (this.id) ? this.nota: <Notas>{};

//     nota.alunoId = this.form.get("alunoId").value;
//     nota.disciplinaId = this.form.get("disciplinaId").value;
//     nota.av1 = this.form.get("av1").value;
//     nota.av2 = this.form.get("av2").value;
//     nota.av3 = this.form.get("av3").value;
//     nota.Bimestre = this.form.get("bimestre").value;

//     //Edit Mode
//     if(this.id) {

//       const url = this.baseUrl + "api/Notas/" + this.id;
//       this.notasService.editNota(nota, this.id)
//           .subscribe(result =>{
//             console.log("Nota do aluno " + result.alunoId + " has been updated.");

//             //go back to student view
//             this.router.navigate(['./notas']);
//           }, error => console.log(error));
//       }
//       else {

//       //Add new Mode
//       this.notasService.addNota(nota)
//           .subscribe(result =>{
//             this.myDataArray = result;
//             // this.router.navigate(['./notas']);
//           }, error => console.log(error));
//           Swal.fire('Nota Adcionada com sucesso..!')
//       }
//     }

  addNota() {
    debugger;
  const newUsersArray = this.USER_DATA;
  newUsersArray.push(this.newNotaAluno);
  this.myDataArray = [...newUsersArray];
  this.notasService.addNota(newUsersArray)
  .subscribe(result =>{
    debugger;
    this.nota = result;
    console.log(this.nota);
  });
  // this.newNotaAluno = {alunoId:1, disciplinaId:1, av1: 2, av2: 3, av3: 2};
  }

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
    return value.id != row_obj.id;
    });
    this.myDataArray = [...this.USER_DATA];//refresh the dataSource
    Swal.fire('Deleted successfully..!')
    }

    openDialog(row_obj:any): void {
      let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: { alunoId: this.idAluno }
      });

      // dialogRef.afterClosed().subscribe(result => {
      // this.idAluno = result;
      // if(this.idAluno!=undefined){
      // if(this.idAluno==null){
      // Swal.fire('Id do aluno não pode ser nulo..!')
      // }else{
      // row_obj.alunoId = this.idAluno
      // const newNotaAluno = this.USER_DATA;
      // this.myDataArray = [...newNotaAluno];
      // Swal.fire('Updated successfully..!')
      // }
      // }
      // });

      dialogRef.afterClosed().subscribe(result => {
        debugger;
        this.loadData();

      });
    }

      loadData(){
        this.boletimService.getAllBoletins()
        .subscribe(result => {
          this.myDataArray = result;
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
