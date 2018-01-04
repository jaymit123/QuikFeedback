/**
 * Survey Model used to query dynamodb 
 */

//Load dependencies
const credentials = require("../config/keys");
const uuid = require('uuid/v1');

const CreateSurvey = (user, title, body, subject, dateSent) => {
    return {
        TableName: credentials.SurveysTable,
        Item: {
            id: uuid(),
            title,
            body,
            subject,
            recipientsResponded: [],
            yes: 0,
            no: 0,
            _user: user,
            dateSent,
            lastResponded: dateSent
        }
    };
}


const UpdateSurveyById = ({ email, surveyid, choice }) => {
    return {
        TableName: credentials.SurveysTable,
        Key: {
            id: surveyid
        },
        ConditionExpression: `NOT contains(#respondedlist,:email)`,
        ExpressionAttributeValues: {
            ':u1': [email],
            ':value': 1,
            ':email': email,
            ':lastresp': new Date().toUTCString()

        },
        ExpressionAttributeNames: {
            '#choice': choice.toLowerCase(),
            '#respondedlist': 'recipientsResponded',
            '#lastResponded': 'lastResponded'
        },
        UpdateExpression: `SET #respondedlist = list_append(#respondedlist,:u1), #lastResponded = :lastresp ADD #choice :value `,
        ReturnValues: 'UPDATED_NEW'
    };
}


const SurveysByUser = (id) => {
    return {
        TableName: credentials.SurveysTable,
        IndexName: '_user-id-index',
        KeyConditionExpression: '#user = :v1',
        ExpressionAttributeNames: {
            '#user': '_user',
            '#no': 'no'
        },
        ExpressionAttributeValues: {
            ':v1': id
        },
        ProjectionExpression: 'yes, #no, title, body, dateSent, lastResponded'
    };
}

module.exports = {
    CreateSurvey, UpdateSurveyById, SurveysByUser
}