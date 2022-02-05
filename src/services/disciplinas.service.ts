import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../api/base/baseService';
import { Disciplinas } from '../app/interfaces/Disciplinas';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService extends BaseService {

constructor(private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { super() }

  public getAllDisciplinas(): Observable<any>{
    return this.http.get<Disciplinas[]>(this.baseUrl + 'api/disciplinas', super.ObterAuthHeaderJson())
  }

  public getDisciplinaById(id: number): Observable<Disciplinas>{
    return this.http.get<Disciplinas>(this.baseUrl + 'api/disciplinas/' + id, super.ObterAuthHeaderJson());
  }


}


