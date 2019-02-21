// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: {
    protocol: 'http',
        host: '127.0.0.1',
    port: '8080',
    endpoints: {
      auth: {
          login: '/login'
      },
        apprenants: {
            allApprenants: '/api/apprenants',
            oneApprenant: '/api/apprenants/:id',
            grpApprenant: '/api/apprenantsG/:idGroupe'
        },
        formateurs: {
            allFormateurs: '/api/formateurs',
            oneFormateur: '/api/formateurs/:id',
            siteFormateur: '/api/formateursSite/:id'
        },
        cours: {
            allCours: '/api/cours',
            oneCours: '/api/cours/:id',
        },
        sites: {
            allSites: '/api/sites',
            oneSite: '/api/sites/:id'
        },
        groupes: {
            allGroupes: '/api/groupes',
            oneGroupe: '/api/groupes/:id'
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
            sexeStatistiques: '/api/sexe',
            nationaliteStatistiques: '/api/nationalite',
            ageStatistiques: '/api/age'
        },
        presences: {
            allPresences: '/api/presences',
            onePresence: '/api/presence/:id',
            idCoursPresence: '/api/presencesC/:id'
        }
    }
  },

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
