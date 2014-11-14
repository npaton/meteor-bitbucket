Package.describe({
  name: 'npaton:bitbucket',
  summary: 'Bitbucket API helper. Signs GET and POST requests for API 1 and 2.',
  version: '0.1.0',
  git: 'https://github.com/npaton/meteor-bitbucket.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('oauth@1.1.2', "server");
  api.use('oauth1@1.1.2', "server");
  api.use('service-configuration@1.0.2', "server");
  api.addFiles('bitbucket.js', "server");
  api.export('Bitbucket', "server");
});
