import { Prontuario } from "./prontuario";

export interface TeleAtendimento {
    idTeleAtendimento?: any;
	idDayliCall: string;
	url: string;
	prontuario: Prontuario;
}