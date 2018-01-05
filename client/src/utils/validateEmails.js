//returns a list of invalid emails.
import _ from 'lodash';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (emails) => {
    let invalidEmails = emails
                                .split(',')
                                .map(email => email.trim())
                                .filter(email => (email.length && emailRegex.test(email) === false));
    invalidEmails = _.compact(invalidEmails);

    if (invalidEmails.length) {
        return `These Emails are invalid ${invalidEmails}`;
    }
    return null;
}