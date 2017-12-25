
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const dynamodb = require('../services/dynamodb');
const Mailer = require('../services/Mailer');
const Recipient = require('../models/Recipient');
const Survey = require('../models/Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = app => {

    app.get('/api/surveys/feedback',(req,res) => res.send("Thanks for your feedback!"));



    app.post('/api/surveys', requireLogin, requireCredits,async (req, res) => {
        var { title, subject, body, recipients } = req.body;
        recipients = recipients.split(",").map(email => Recipient(email, false));
        let survey = Survey.CreateSurvey(req.user.id, title, body, subject, recipients,  new Date().toUTCString());
        const mailer = new Mailer(survey,surveyTemplate(survey),surveyTemplate(survey));
        try{
        await  mailer.send();
        await dynamodb.insertSurvey(survey);
        let user = await dynamodb.deductCredits(req.user.googleId,1);
        res.send(user);
        }catch(e){
            res.status(422).send(e);
        }
    });
    


}