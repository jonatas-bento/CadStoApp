import { Aluno } from "../alunos/aluno";
import { Notas } from "./Notas";

export interface Boletim{
  alunos: Aluno[];
  notas: Notas[];
}
