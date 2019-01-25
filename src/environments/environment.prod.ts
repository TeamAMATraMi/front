
export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: '0.0.0.0',
        port: '8181',
        endpoints: {
            apprenants: {
                allApprenants: '/apprenants',
                oneApprenant: '/apprenants/:id',
                grpApprenant: '/apprenantsG/:idgroupe'
            },
            formateurs: {
                allFormateurs: '/formateurs',
                oneFormateur: '/formateurs/:id'
            },
            sites: {
                allSites: '/sites',
                oneSite: '/sites/:id'
            },
            groupes: {
            allGroupes: '/groupes',
            oneGroupe: '/groupes/:id'
          }
        }
    }
};