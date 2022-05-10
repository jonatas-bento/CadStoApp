import { NgxSpinnerService } from 'ngx-spinner';
import { ProfessoresService } from './../../services/professores.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from '../interfaces/Professor';
import { Disciplinas } from '../interfaces/Disciplinas';
import { faAddressBook, faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {
  professor: Professor;
  public displayedColumns: string[] = ['id','nome', 'descricao', 'acoes', 'detalhes'];
  disciplinas: Disciplinas;
  id: number;
  faEdit = faEdit;
  faAdressBook = faAddressBook;
  constructor(private professorService: ProfessoresService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.professorService.getProfessores()
    .subscribe((result: any) =>{
      debugger;
      this.professor = result;
      console.log(result);
    })
    this.spinner.hide();
  }

}
