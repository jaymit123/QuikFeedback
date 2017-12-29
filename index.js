// Loading Dependencies
const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const credentials = require('./config/keys');
const passport = require('passport');


//Assigning middleware to express app
const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [credentials.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

//Setup Authentication and Assigning Routes to Express App
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/paymentRoutes')(app);
require('./routes/surveyRoutes')(app);


if (process.env.NODE_ENV === 'production') {

    //Express serves production assets
    app.use(express.static('client/build'));

    //Express serves index.html file if no url found
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(PORT); });