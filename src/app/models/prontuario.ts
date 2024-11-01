import { Agenda } from "./agenda";
import { Animal } from "./animal";
import { Usuario } from "./usuario";

export interface Prontuario {
    idProntuario?: any;
	dataCadastro: Date;
	anamnese: string;
	prescrisaoOrientacao: string;
	exames: string;
	procedimentoRealizado: string;
	usuario: Usuario;
	animal : Animal;
	agenda: Agenda;
}