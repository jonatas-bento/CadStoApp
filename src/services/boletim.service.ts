import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "../api/base/baseService";
import { Boletim } from "../app/interfaces/Boletim";

@Injectable({
  providedIn: 'root'
})
export class BoletimService extends BaseService {

constructor(private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  @Inject('BASE_URL') private baseUrl: string) { super()}

  public getAllBoletins(): Observable<any>{
    return this.http.get<Boletim[]>(this.baseUrl + 'api/boletim', super.ObterAuthHeaderJson())
  }

  public getBoletimByAlunoId(alunoId: number): Observable<Boletim>{
    return this.http.get<Boletim>(this.baseUrl + 'api/boletim/' + alunoId, super.ObterAuthHeaderJson());
  }


}
