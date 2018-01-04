/**
 * Add Survey routes to express App
 */

//Load Dependencies
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const dynamodb = require('../services/DynamoDB');
const Mailer = require('../services/Mailer');
const Survey = require('../models/Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

module.exports = app => {
    //Redirect to this path when recipients completes survey
    app.get('/api/surveys/:surveyid/:choice', (req, res) => res.send("Thanks for your feedback!"));






    //Authenticate user, deduct user credits and send mails to recipients of survey
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        var { title, subject, body, recipients } = req.body;
        recipients = recipients.split(",");
        let survey = Survey.CreateSurvey(req.user.id, title, body, subject, new Date().toUTCString());
        const mailer = new Mailer(survey, recipients, surveyTemplate(survey));
        try {
            await mailer.send();
            await dynamodb.insertSurvey(survey);
            let user = await dynamodb.deductCredits(req.user.googleId, 1);
            res.send(user);
        } catch (e) {
            res.status(422).send(e);
        }
    });

    //Get List of Surveys Created by a User
    app.get('/api/surveys', requireLogin, async (req, res) => {
        let surveyQuery = Survey.SurveysByUser(req.user.id);
        const response = await dynamodb.getSurveysByUser(surveyQuery);
        return res.send(response);
    });

    //Handles the responses of feedback sent by sendgrid
    app.post('/api/surveys/webhooks', (req, res) => {
        const pathHelper = new Path('/api/surveys/:surveyid/:choice');
        _.chain(req.body)
            .map(({ url, email }) => {
                const match = pathHelper.test(new URL(url).pathname);
                if (match) return { email, surveyid: match.surveyid, choice: match.choice };
            })
            .compact()
            .uniqBy('email', 'surveyid')
            .each(event => {
                console.log(event);
                const surveyQuery = Survey.UpdateSurveyById(event);
                dynamodb.updateSurvey(surveyQuery);
            }).value();

        res.send("Done");
    });



}