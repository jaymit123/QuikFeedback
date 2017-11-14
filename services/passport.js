const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credential = process.env.GoogleOAuth || require('../config/devs');



passport.use(new GoogleStrategy({
        clientID: credential.OAuthCredentials.clientID,
        clientSecret: credential.OAuthCredentials.clientSecret,
        callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(done);
    }
));