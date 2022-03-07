import { Notas } from './../interfaces/Notas';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lancamentoNotas',
  templateUrl: './lancamentoNotas.component.html',
  styleUrls: ['./lancamentoNotas.component.scss']
})
export class LancamentoNotasComponent implements OnInit {

  idAluno: number;
  public displayedColumns: string[] = ['alunoId', 'disciplinaId', 'av1', 'av2', 'av3', 'acoes'];


  public USER_DATA: Notas[] = [];

  public newNotaAluno = {alunoId: 0, disciplinaId: 1, av1: 0, av2: 0, av3: 0};

  public myDataArray: any;


  constructor(public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<Notas>([...this.USER_DATA]);
  }

  ngOnInit() {
  }

  addNota() {
    debugger;
  const newUsersArray = this.USER_DATA;
  newUsersArray.push(this.newNotaAluno);
  this.myDataArray = [...newUsersArray];
  this.newNotaAluno = {alunoId:1, disciplinaId:1, av1: 2, av2: 3, av3: 2};
  }

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
    return value.alunoId != row_obj.alunoId;
    });
    this.myDataArray = [...this.USER_DATA];//refresh the dataSource
    Swal.fire('Deleted successfully..!')
    }

    openDialog(row_obj:any): void {
      let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { alunoId: this.idAluno }
      });

      dialogRef.afterClosed().subscribe(result => {
      this.idAluno = result;
      if(this.idAluno!=undefined){
      if(this.idAluno==null){
      Swal.fire('Id do aluno não pode ser nulo..!')
      }else{
      row_obj.alunoId = this.idAluno
      const newNotaAluno = this.USER_DATA;
      this.myDataArray = [...newNotaAluno];
      Swal.fire('Updated successfully..!')
      }
      }
      });

      }

}
