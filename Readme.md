# [Bitbucket API](https://confluence.atlassian.com/display/BITBUCKET/Use+the+Bitbucket+REST+APIs) wrapper for [Meteor.js](http://meteor.com/)

Handles OAuth signed calls to the Bitbucket API on the server and responds
synchronously as expected in Meteor. Works well with the packages
tarang:accounts-bitbucket that handles the OAuth flow.

    meteor add npaton:bitbucket

## Usage

```js
var client = Bitbucket.forUser(user)
// which does:
var credentials = user.services.bitbucket;
var client = new Bitbucket(credentials.accessToken, credentials.accessTokenSecret)

// v1 and v2 of the APIs do not give the same data back and might need to
// be combined such as for user information:
var user = client.get("/1.0/user").user;
var identity = client.get("/2.0/user/"+user.username);

var fork = client.post("/1.0/repositories/supersoft/superapp/fork", {
    name: "myrepo"
});

var newRepo = client.post("/2.0/repositories/myname/mynewrepo", {
    scm: "git",
    is_private: true,
    fork_policy: "no_public_forks"
});

client.delete("/2.0/repositories/myname/mynewrepo");
```

## WARNING

Only get requests have been actively used so far, there has been no significant
testing done on post, put, delete requests. And no unit tests whatsoever at the
moment. Pull requests are welcome!
