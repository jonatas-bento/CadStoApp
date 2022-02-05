import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './app/alunos/aluno';
import { BaseService } from './api/base/baseService';

@Injectable()
export class AlunosService extends BaseService{
alunos: Aluno[];

constructor(
  private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { super()
}

public addAluno(aluno: any): Observable<Aluno>{
  return this.http.post<Aluno>(this.baseUrl + 'api/Alunos', aluno, super.ObterAuthHeaderJson());
}

public editAluno(aluno: any, id: number): Observable<Aluno>{
  return this.http.put<Aluno>(this.baseUrl + 'api/Alunos/' + id, aluno, super.ObterAuthHeaderJson());
}

public getAlunos(): Observable<any>{
  return this.http.get<Aluno[]>(this.baseUrl + 'api/Alunos', super.ObterAuthHeaderJson())
}

public getAlunosById(id: number): Observable<Aluno>{
  return this.http.get<Aluno>(this.baseUrl + 'api/Alunos/' + id, super.ObterAuthHeaderJson());
}

}


