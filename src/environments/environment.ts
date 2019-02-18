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
            allApprenants: '/apprenants',
            oneApprenant: '/apprenants/:id',
            grpApprenant: '/apprenantsG/:idGroupe'
        },
        formateurs: {
            allFormateurs: '/formateurs',
            oneFormateur: '/formateurs/:id',
            siteFormateur: '/formateursSite/:id'
        },
        cours: {
            allCours: '/cours',
            oneCours: '/cours/:id',
        },
        sites: {
            allSites: '/sites',
            oneSite: '/sites/:id'
        },
        groupes: {
            allGroupes: '/groupes',
            oneGroupe: '/groupes/:id'
        },
        associations: {
            allAssociations: '/associations',
            oneAssociation: '/associations/:id'
        },
        quartiers: {
            allQuartiers: '/quartiers',
            oneQuartier: '/quartiers/:id'
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
