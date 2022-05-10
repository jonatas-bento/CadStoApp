import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../api/base/baseService';
import { Professor } from '../app/interfaces/Professor';

@Injectable()
export class ProfessoresService extends BaseService{
professores: Professor[];

constructor(
  private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { super()
}

public addProfessor(professor: any): Observable<Professor>{
  return this.http.post<Professor>(this.baseUrl + 'api/Professores', professor, super.ObterAuthHeaderJson());
}

public editProfessor(professor: any, id: number): Observable<Professor>{
  return this.http.put<Professor>(this.baseUrl + 'api/Professores/' + id, professor, super.ObterAuthHeaderJson());
}

public getProfessores(): Observable<any>{
  return this.http.get<Professor[]>(this.baseUrl + 'api/Professores', super.ObterAuthHeaderJson());
}

public getProfessoresById(id: number): Observable<Professor>{
  return this.http.get<Professor>(this.baseUrl + 'api/Professores/' + id, super.ObterAuthHeaderJson());
}

}


