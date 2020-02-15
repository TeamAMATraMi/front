import {Cours} from './cours';

export interface Seance {
  id?: number;
  idPresence: number;
  cours: Cours;
  date: Date;
  horaire: String;
}
