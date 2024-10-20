import { Tutor } from "./tutor";

export interface Animal {
    idAnimal?: any;
	nome: string;
	tutor: Tutor;
	idade: number;
	peso: number;
	especie: string;
	sexo: string;
	pelagem: string;
	cor: string;
	alergias: string;
	observacao: string;
}