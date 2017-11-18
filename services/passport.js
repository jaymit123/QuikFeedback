const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credential = require('../config/keys');
const dynamodb = require('./dynamodb');


passport.serializeUser((user, done) => {
    done(null, user.Item.id.S);
});

passport.deserializeUser((id, done) => {
    dynamodb.getUserByUID(id, (err, data) => {
        if (data) {
            done(null, data);
        } else {
            console.log("hi" + err);
        }
    })
});





passport.use(new GoogleStrategy({
        clientID: credential.OAuthCredentials.clientID,
        clientSecret: credential.OAuthCredentials.clientSecret,
        callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        let email = profile.emails[0]['value'];
        let googleId = profile.id;
        dynamodb.accountCreate(googleId, email, done);

    }
));