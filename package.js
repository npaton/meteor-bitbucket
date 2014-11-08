Package.describe({
  name: 'npaton:bitbucket',
  summary: 'Bitbucket API helper. Signs GET and POST requests for API 1 and 2.',
  version: '0.1.0',
  git: ''
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('bitbucket.js', "server");
  api.export('Bitbucket', "server");
});
