/**
 * Add passport authentication routes to express App
 */

 //Load dependencies
const passport = require("passport");


module.exports = app => {
  //Get profile and email info of user that logs in using Google OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //Redirect user to the /auth/google/callback url once logged in using Google OAuth
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );


  //Log out user and clear cookies.
  app.get("/api/logout", (req, res, next) => {
    req.logout();
    res.send("Logged Out");
  });


  //Get logged in user information
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
