import express from 'express';
import spotify from 'spotify-web-api-node';

const app = express();

const spotifyApi = new spotify({
    clientId : '4ea54ce3001542bdb54efbff4e75c91b',
    clientSecret : '439a3df9136e40498848a538105924a0',
    redirectUri : 'http://localhost:3000/cb'
});

const scopes = ['user-read-currently-playing' ,'user-read-playback-state'],
    redirectUri = 'http://localhost:3000/cb',
    clientId = '4ea54ce3001542bdb54efbff4e75c91b',
    state = 'test';

let code = null;

app.get('/', (req, res) => {

    if (!code) {
        let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
        res.redirect(authorizeURL);
        // res.send(`<a href="${authorizeURL}">Login with spotify</a>`);
        return;
    }

    spotifyApi.authorizationCodeGrant(code)
        .then(function(data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);

            spotifyApi.getMyCurrentPlaybackState()
                .then((data) => {
                    console.log(data);
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });

        }, function(err) {
            console.log('Something went wrong!', err);
            code = null;
            res.redirect('/');_
        });
});

app.get('/cb', (req, res) => {
    code = req.query.code;
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.send("Error");
});

app.listen(3000, () => {
	console.log(`Serving site on port 3000`);
});