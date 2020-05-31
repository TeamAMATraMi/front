
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
            		         siteExist :'/api/siteExist/:ville',
                            siteByVille: '/api/siteByVille/:ville'
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