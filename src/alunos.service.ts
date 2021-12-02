import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './app/alunos/aluno';

@Injectable()
export class AlunosService {
alunos: Aluno[];

constructor(
  private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) {

}

public getAlunos(): Observable<any>{
  return this.http.get<Aluno[]>(this.baseUrl + 'api/Alunos')
}

public getAlunosById(id: number): Observable<Aluno>{
  return this.http.get<Aluno>(this.baseUrl + 'api/Alunos/' + id);
}

}


