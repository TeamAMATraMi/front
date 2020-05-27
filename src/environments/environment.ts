// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: '127.0.0.1',
        port: '28080',
        endpoints: {
            auth: {
                login: '/login',
                signup: '/sign-up'
            },
            apprenants: {
                allApprenants: '/api/apprenants',
                oneApprenant: '/api/apprenants/:id',
                grpApprenant: '/api/apprenantsG/:idGroupe',
                existApprenant: '/api/apprenantsExist/:nom/:prenom'
            },
            formateurs: {
                allFormateurs: '/api/formateurs',
                oneFormateur: '/api/formateurs/:id',
                siteFormateur: '/api/formateursSite/:id',
                existFormateur: '/api/formateursExist/:nom/:prenom'
            },
            seances: {
                oneSeance: '/api/seances/:id',
                allSeancesByCours: '/api/seancesC/:id',
            },
            cours: {
                allCours: '/api/cours',
                oneCours: '/api/cours/:id',
                addSeance: '/api/cours/:id/addSeance',
            },
            sites: {
                allSites: '/api/sites',
                oneSite: '/api/sites/:id',
		       siteExist :'/api/siteExist/:ville'
            },
            groupes: {
                allGroupes: '/api/groupes',
                oneGroupe: '/api/groupes/:id',
                clearGroupe: '/api/groupesClear/:id'
            },
            associations: {
                allAssociations: '/api/associations',
                oneAssociation: '/api/associations/:id'
            },
            quartiers: {
                allQuartiers: '/api/quartiers',
                oneQuartier: '/api/quartiers/:id'
            },
            statistiques: {
                sexeStatistiques: '/api/sexe/:nom/:dateDebut/:dateFin',
                ageStatistiques: '/api/age/:nom/:dateDebut/:dateFin',
                siteStatistiques: '/api/site/:nom/:dateDebut/:dateFin',
                nationaliteStatistiques: '/api/nationalite/:nom/:dateDebut/:dateFin',
                titreSejourStatistiques: '/api/titreSejour/:nom/:dateDebut/:dateFin',
                quartierPrioStatistiques: '/api/quartierPrio/:nom/:dateDebut/:dateFin',
                niveauScolStatistiques: '/api/niveauScol/:nom/:dateDebut/:dateFin',
                statutProStatistiques: '/api/statutPro/:nom/:dateDebut/:dateFin',
                priseChargeStatistiques: '/api/priseCharge/:nom/:dateDebut/:dateFin',
                niveauLangueStatistiques: '/api/niveauLangue/:nom/:dateDebut/:dateFin',
                primoArrivantStatistiques: '/api/primoArrivant/:nom/:dateDebut/:dateFin',
		presencesStatistiques: '/api/presence/:nom'
            },
            presences: {
                allPresences: '/api/presences',
                onePresence: '/api/presence/:id',
                idCoursPresence: '/api/presencesC/:id',
                fichePresences: '/api/presencesF',
                fichePresenceByIdSeance: 'api/presencesIDSeance/:idSeance'
            }
        }
    }

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
