/**
 * Setup Authentication for Client
 */

 //Load dependencies
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const credential = require("../config/keys");
const dynamodb = require("./DynamoDB");


//Make use of user's uid as cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Used to authenticate if user id is valid or not
passport.deserializeUser(async (id, done) => {
  try {
    let user_entry = await dynamodb.getUserByUID(id);
    done(null,user_entry);
  } catch (er) {
    console.log(er);
  }
});


//Setup Google OAuth Flow
passport.use(
  new GoogleStrategy(
    {
      clientID: credential.OAuthCredentials.clientID,
      clientSecret: credential.OAuthCredentials.clientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      let email = profile.emails[0]["value"];
      let googleId = profile.id;
      await dynamodb.accountCreate(googleId, email, done);
    }
  )
);
