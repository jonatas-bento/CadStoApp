import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { User } from './user';
import { BaseService } from '../../base/baseService';
import { Router } from "@angular/router";


@Injectable()
export class UserService extends BaseService {
  helper = new JwtHelperService();
    constructor(private http: HttpClient,
      private router: Router) { super() }

    login(user: User): Observable<User> {
        return this.http
            .post(this.UrlService + 'auth/entrar', user, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)

            );

    }

    logout(){
      localStorage.removeItem('app.token');
      localStorage.removeItem('app.user');
      this.router.navigateByUrl('/entrar');
    }

    persistirUserApp(response: any){
      debugger;
        localStorage.setItem('app.token', response.accessToken);
        localStorage.setItem('app.user', JSON.stringify(response.userToken));
    }

}
