import { Animal } from "./animal";
import { Usuario } from "./usuario";

export interface Prontuario {
    idProntuario?: any;
	dataCadastro: Date;
	anamnese: string;
	prescrisaoOrientacao: string;
	exames: string;
	procedimentoRealizado: string;
	procedimento: string;
	usuario: Usuario;
	animal : Animal;
	dataAgendamento: Date;
}