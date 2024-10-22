import { Usuario } from "./usuario";

export interface Anotacao {
    idAnotacao?: any;
	usuario: Usuario;
	anotacao: string;
}