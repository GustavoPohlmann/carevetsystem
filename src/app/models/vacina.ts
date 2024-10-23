import { CadernetaVacina } from "./cadernetaVacina";

export interface Vacina {
    idVacina?: any;
	nome: string;
	cadernetaVacina: CadernetaVacina;
	idadeVacina: number;
	numeroDose: number;
	aplicada: boolean;
	observacao: string;
}