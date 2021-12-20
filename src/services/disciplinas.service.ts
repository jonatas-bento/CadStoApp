import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Disciplinas } from '../app/interfaces/Disciplinas';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

constructor(private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { }

  public getAllDisciplinas(): Observable<any>{
    return this.http.get<Disciplinas[]>(this.baseUrl + 'api/disciplinas')
  }

  public getDisciplinaById(id: number): Observable<Disciplinas>{
    return this.http.get<Disciplinas>(this.baseUrl + 'api/disciplinas/' + id);
  }


}


