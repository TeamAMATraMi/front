export interface Apprenant{
  id_apprenant: string;
  nom: string;
  prenom: string;
  telephone: number;
  adresse: string;
  code_postal: number;
  commune: string;
  id_groupe: number;
  date_inscription: number;
  auteur_dossier: number;
  majeur: number;
  date_naissance: number;
  genre: string;
  pays_origine: string;
  nationalité: number;
  date_arrivee: number;
  quartier_prioritaire: number;
  situation_personelle: string;
  prise_charge: string;
  rsa: boolean;
  temps_scolarisation: number;
  diplome: string;
  milieu_scolaire: boolean;
  niveau_langue: string;
  lire_langue: boolean;
  ecrire_langue: boolean;
  lire_alpha_latin: boolean;
  ecrire_alpha_latin: boolean;
  cotisation_payee: boolean;
  remarques: string;
}