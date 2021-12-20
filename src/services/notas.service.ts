import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notas } from '../app/interfaces/Notas';

@Injectable({
  providedIn: 'root'
})

export class NotasService {
notas: Notas[];

constructor(
  private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) {
}

public getAllNotas(): Observable<any>{
  return this.http.get<Notas[]>(this.baseUrl + 'api/notas')
}

public getNotasById(id: number): Observable<Notas>{
  return this.http.get<Notas>(this.baseUrl + 'api/notas/' + id);
}

}

