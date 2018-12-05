export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '4443',
    endpoints: {
      apprenants: {
        allApprenants: '/api/apprenants',
        oneApprenant: '/api/apprenants/:id'
      },
      formateurs: {
        allFormateurs: '/api/apprenants',
        oneFormateur: '/api/apprenants/:id'
      },
      sites: {
        allSites: '/api/sites',
        oneSite: '/api/sites/:id'
      }
    }
  }
};
