Bitbucket = function(accessToken, accessTokenSecret) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
};

// To not break the 'bitbucket' or 'accounts-bitbucket' packages
Bitbucket.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};


Bitbucket.forUser = function(user) {
    var token = Bitbucket.credentialsForUser(user);
    if (!token) return;

    return new Bitbucket(token.accessToken, token.accessTokenSecret);
};

Bitbucket.credentialsForUser = function(user) {
    if (!user.services || !user.services.bitbucket) return;
    var bitbucket = user.services.bitbucket;
    if (!bitbucket.accessToken || !bitbucket.accessTokenSecret) return;
    return {
        accessToken: bitbucket.accessToken,
        accessTokenSecret: bitbucket.accessTokenSecret
    };
};

Bitbucket.serviceConfiguration = function() {
    if (Bitbucket._serviceConfigurationCache)
        return Bitbucket._serviceConfigurationCache;

    Bitbucket._serviceConfigurationCache =
        Bitbucket._serviceConfiguration &&
        Bitbucket._serviceConfiguration.fetch()[0];
    return Bitbucket._serviceConfigurationCache;
};

Meteor.startup(function() {
    Deps.autorun(function() {
        Bitbucket._serviceConfiguration =
            ServiceConfiguration.configurations.find( {
                'service': 'bitbucket' } );
        Bitbucket._serviceConfigurationCache = null;
    });
});




Bitbucket.basePath = 'https://bitbucket.org/api';
Bitbucket.prototype = {
    constructor: Bitbucket,

    call: function(method, path, params) {
        path = Bitbucket.basePath + path.replace(Bitbucket.basePath, "");
        params = _.extend({}, params || {});
        method = method.toUpperCase();
        var response = this._oauthBinding().call(method, path, params);
        if (response.statusCode !== 200)
            throw new BitbucketError(response.statusCode, response.data);
        return response.data;
    },

    post: function(path, params) {
        return this.call("post", path, params);
    },

    put: function(path, params) {
        return this.call("put", path, params);
    },

    get: function(path) {
        return this.call("get", path);
    },

    delete: function(path) {
        return this.call("delete", path);
    },

    _oauthBinding: function() {
        var config = this._config();
        var oauthBinding = new OAuth1Binding({
            consumerKey: config.consumerKey,
            secret: config.secret
        });
        oauthBinding.accessToken = this.accessToken;
        oauthBinding.accessTokenSecret = this.accessTokenSecret;
        return oauthBinding;
    },

    _config: function() {
        var config = Bitbucket.serviceConfiguration();
        if (!config|| !config.consumerKey || !config.secret)
            throw new ServiceConfiguration.ConfigError('Bitbucket');

        return config;
    }
};




function BitbucketError(code, messageOrError) {
    this.code = code;
    if (typeOf(messageOrError) === "Error") {
        this.name = "BitbucketError " + code + " (" + messageOrError.name + ")";
        this.message = messageOrError.message;
        return;
    }

    this.name = "BitbucketError";
    this.message = message || "Bitbucket API method call failed.  " + code;
}
BitbucketError.prototype = new Error();
BitbucketError.prototype.constructor = BitbucketError;
