const express = require('express');
const app = express();
require('./services/passport');
require('./routes/authroutes')(app);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(PORT); });