import { Usuario } from "./usuario";

export interface InformacaoPessoal {
    idInformacaoPessoal?: any;
	usuario: Usuario;
	nomeCompleto: string;
	dataNascimento: Date;
	cpf: string;
	rg: string;
	sexo: string;
	endereco: string;
	telefone: string;
	email: string;
	fotoPerfil: string;
	numeroCrmv: string;
	especialidade: string;
}