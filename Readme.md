# Simple Bitbucket API wrapper for [Meteor](http://meteor.com/)

Handles OAuth signatures for [Bitbucket API ](https://confluence.atlassian.com/display/BITBUCKET/Use+the+Bitbucket+REST+APIs)
calls on the server, and runs synchronously, as expected in Meteor server code.
Works well with the package tarang:accounts-bitbucket, that handles the OAuth
flow.

    meteor add npaton:bitbucket

## Usage

```js
// Given a Meteor 'user'
var user = Meteor.user();

// Get a Bitbucket API client
var client = Bitbucket.forUser(user);

// which is equivalent to:
var bbinfo = user.services.bitbucket,
    client = new Bitbucket(bbinfo.accessToken, bbinfo.accessTokenSecret);

// You can use both v1 and v2 of the API indifferently
var user = client.get("/1.0/user").user,
    identity = client.get("/2.0/user/" + user.username);

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
