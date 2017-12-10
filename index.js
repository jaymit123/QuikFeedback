const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const credentials = require('./config/keys');
const passport = require('passport');
const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [credentials.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/paymentRoutes')(app);

if(process.env.NODE_ENV === 'production'){
//Express servers production assets
app.use(express.static('client/build'));

//Express servs index.html file if no url found

}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(PORT); });