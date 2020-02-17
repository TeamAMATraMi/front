export interface Apprenant {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  commune: string;
  idGroupe: number;
  dateInscription: number;
  auteurDossier: string;
  primoArrivant: boolean;
  majeur: boolean;
  dateNaissance: number;
  genre: string;
  paysOrigine: string;
  nationalite: string;
  dateArrivee: number;
  quartierPrioritaire: number;
  situationPersonnelle: string;
  priseCharge: string;
  rsa: boolean;
  tempsScolarisation: number;
  diplome: string;
  milieuScolaire: boolean;
  niveauLangue: string;
  lireLangue: boolean;
  ecrireLangue: boolean;
  lireAlphaLatin: boolean;
  ecrireAlphaLatin: boolean;
  cotisationPayee: boolean;
  remarques: string;
  statutSejour: string;
  dateCarteSejour: number;
  dateFinCarteSejour: number;
  statutPro: string;
  typeContrat: string;
}
