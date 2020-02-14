import {Seance} from './seance';

export interface Cours {
  id?: number;
  seances: Seance[];
  idFormateur: number;
  idGroupe: number;
  matiere: string;
  duree: number;
}
