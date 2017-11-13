const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

const credential = process.env.GoogleOAuth || require('./config/devs.json');




passport.use(new GoogleStrategy({
        clientID: credential.OAuthCredentials.clientID,
        clientSecret: credential.OAuthCredentials.clientSecret,
        callbackURL: "/auth/google/callback",
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(accessToken);
    }
));


app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
sta

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(PORT); });