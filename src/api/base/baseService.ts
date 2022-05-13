import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

    protected UrlService: string = "http://cadsto.com/api/";


    protected ObterHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="cadSto"',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    public obterUsuario() {
      return JSON.parse(localStorage.getItem('app.user') || null);
    }

    protected obtemImagemAssociadaAoUsuario(){
      return JSON.parse(localStorage.getItem('imagemUsuario') || null);
    }

    protected obterTokenUsuario(): string {
        return localStorage.getItem('app.token');
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }
}
