
export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '92.222.9.74',
        port: '8080',
        endpoints: {
            apprenants: {
                allApprenants: '/apprenants',
                oneApprenant: '/apprenants/:id',
                grpApprenant: '/apprenantsG/:idGroupe'
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
