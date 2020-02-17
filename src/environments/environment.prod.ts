
export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '92.222.9.74',
        port: '28080',
        endpoints: {
            auth: {
                login: '/login'
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
                sexeStatistiques: '/api/sexe',
                ageStatistiques: '/api/age',
                siteStatistiques: '/api/site',
                nationaliteStatistiques: '/api/nationalite/:nom',
                titreSejourStatistiques: '/api/titreSejour/:nom',
                quartierPrioStatistiques: '/api/quartierPrio/:nom',
                niveauScolStatistiques: '/api/niveauScol/:nom',
                statutProStatistiques: '/api/statutPro/:nom',
                priseChargeStatistiques: '/api/priseCharge/:nom',
                niveauLangueStatistiques: '/api/niveauLangue/:nom'
            },
            presences: {
                allPresences: '/api/presences',
                onePresence: '/api/presence/:id',
                idCoursPresence: '/api/presencesC/:id',
                fichePresences: '/api/presencesF',
                fichePresenceByIdSeance: 'api/presencesS/:idSeance'
            }
        }
    }
};
