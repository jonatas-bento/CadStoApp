import { environment } from './../environments/environment';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(tap(()=>{}, (err:any)=>{
        if (err instanceof HttpErrorResponse){
          if([400, 401].some(c => c === err.status)){
            alert("Usuário não está cadastrado!");
            window.location.href = environment.unauthorizedRedirectURL;
          } else if([403].some(e => e === err.status)){
            alert("Usuário não está autorizado a acessar");
            window.location.href = "http://localhost:4200";
          }
        }
      })
      );
    }
  }
