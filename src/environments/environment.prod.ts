
export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: '0.0.0.0',
        port: '8080',
        endpoints: {
            apprenants: {
                allApprenants: '/apprenants',
                oneApprenant: '/apprenants/:id'
            },
            formateurs: {
                allFormateurs: '/formateurs',
                oneFormateur: '/formateurs/:id'
            },
            sites: {
                allSites: '/sites',
                oneSite: '/sites/:id'
            }
        }
    }
};