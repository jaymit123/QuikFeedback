const credentials = require("../config/keys");
const uuid = require('uuid/v1');
const CreateSurvey = (user,title,body,subject,recipients,dateSent) => {
    return {
    TableName : credentials.SurveysTable,
    Item : {
      id: uuid() ,
      title,
      body,
      subject,
      recipients,
      yes:0,
      no:0,
      _user:user,
      dateSent,
      lastResponded:dateSent
    }};
}


module.exports = {
    CreateSurvey
}