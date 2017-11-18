const express = require('express');
const cookieSession = require('cookie-session');

const credentials = require('./config/keys');
const passport = require('passport');
const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [credentials.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');
require('./routes/authroutes')(app);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(PORT); });