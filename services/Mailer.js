/**
 * Provides ability to send mail and recieve alerts using sendgrid api
 */
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const credentials = require('../config/keys');

class Mailer extends helper.Mail {

    // Setup email with all details   
    constructor({ Item: { subject, recipients } }, content) {
        super();
        this.sgApi = sendgrid(credentials.sendGridAPIKey);
        this.from_email = new helper.Email('no-reply@quikfeedback.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    // Adds ability to track when user makes click to answer feedback
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        })
        this.addPersonalization(personalize);

    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;
    }
}






module.exports = Mailer;