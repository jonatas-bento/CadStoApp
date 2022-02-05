import { UserService } from './../../api/base/user/userService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nomeUsuario: string;
  nomeFoto: string;
  atribuicoes: string;
  informacaoUsuario: string;
  _user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.carregaDadosUsuario();
  }

  carregaDadosUsuario(){
    debugger;
    const user = this.userService.obterUsuario();
    this._user = user;
    this.nomeUsuario = user.nome;
    this.nomeFoto = user.nomeFoto;
    this.atribuicoes = user.atribuicoes;
  }
}
