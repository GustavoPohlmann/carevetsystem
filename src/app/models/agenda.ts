import { Animal } from "./animal";
import { Usuario } from "./usuario";

export interface Agenda {
    idAgenda?: any;
	dataInicioAgendamento: Date;
	dataFimAgendamento: Date;
	observacao: string;
	procedimento: string;
	usuario: Usuario;
	animal : Animal;
}