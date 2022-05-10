import { Disciplinas } from "./Disciplinas";

export interface Professor {
  id: number;
  nomeCompleto: string;
  descricaoProfessor: string;
  data_Nascimento: Date;
  nomeFoto: string;
  email: string;
  telefone: string;
  ativo: boolean;
  disciplinas: Disciplinas;
}
