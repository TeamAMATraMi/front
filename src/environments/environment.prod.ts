
export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '92.222.9.74',
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
                allQuartiers: '/quartiersPrio',
                oneQuartier: '/quartiersPrio/:id'
            },
            statistiques: {
                sexeStatistiques: '/sexe',
                nationaliteStatistiques: '/nationalite',
                ageStatistiques: '/age',
                siteStatistiques: '/site',
                titreSejourStatistiques: '/titreSejour/:nom'
            },
            presences: {
                allPresences: '/presences',
                onePresence: '/presence/:id',
                idCoursPresence: '/presencesC/:id'
            }
        }
    }
};
