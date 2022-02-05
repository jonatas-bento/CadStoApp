import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notas } from '../app/interfaces/Notas';
import { BaseService } from '../api/base/baseService';

@Injectable({
  providedIn: 'root'
})

export class NotasService extends BaseService {
notas: Notas[];

constructor(
  private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { super()
}

public getAllNotas(): Observable<any>{
  return this.http.get<Notas[]>(this.baseUrl + 'api/notas', super.ObterAuthHeaderJson());
}

public getNotasById(id: number): Observable<Notas>{
  return this.http.get<Notas>(this.baseUrl + 'api/notas/' + id, super.ObterAuthHeaderJson());
}

}

