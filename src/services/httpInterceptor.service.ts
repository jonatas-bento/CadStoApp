import { environment } from './../environments/environment';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private toastrService: ToastrService){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(tap(()=>{}, (err:any)=>{
        if (err instanceof HttpErrorResponse){
          debugger;
          if([400, 401].some(c => c === err.status)){
            this.toastrService.error("Usuário não está cadastrado!", "Usuário não logado");
            setTimeout(()=>{
              window.location.href = environment.unauthorizedRedirectURL;
            }, 2000);

          } else if([403].some(e => e === err.status)){
            this.toastrService.error("Usuário não está autorizado a acessar", "Usuário não autorizado");
            window.location.href = environment.unauthorizedRedirectURL;
          } else if ([500].some(i => i === err.status)){
            this.toastrService.error("Erro interno, verifique o banco de dados ou a conexão com o servidor!", "Erro interno")
            setTimeout(()=>{
              window.location.href = environment.unauthorizedRedirectURL;
            }, 2000);
          } else{
            this.toastrService.error("Servidor não está ativado!", "Erro interno");
            setTimeout(()=>{
              window.location.href = environment.homePageWithoutLogged;
            }, 2000);
          }
        }
      })
      );
    }
  }
