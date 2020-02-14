import {Cours} from './cours';

export interface Seance {
  id?: number;
  cours: Cours;
  date: number;
  horaire: number;
}
