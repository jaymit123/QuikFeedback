const uuid = require("uuid/v1");
const credentials = require("../config/keys");


const CreateUser = (googleId,email) => {
    return {
    TableName : credentials.UserTable,
    Item : {
      id: {
        S: uuid()
      },
      googleId: {
        S: googleId
      },
      email: {
        S: email
      },
      credits: {
        N: "0"
      }
    }};
}


const UpdateUser = (googleId,credits) => {
  return  {
        TableName: credentials.UserTable,
        Key: {
          googleId: {
            S: googleId
          }
        },
        ExpressionAttributeValues: {
          ":u1": {
            N: String(credits)
          }
        },
        UpdateExpression: "ADD credits :u1",
        ReturnValues: "ALL_NEW"
      };
}

const UserByGoogleId = (googleId) => {
    return {
        TableName: credentials.UserTable,
        Key: {
          googleId: {
            S: googleId
          }
        }
      };
}


const UserByUID = (id) => {
    return {
        TableName: credentials.UserTable,
        IndexName: "id-index",
        KeyConditionExpression: "id = :v1",
    
        ExpressionAttributeValues: {
          ":v1": {
            S: id
          }
        }
      };
}

module.exports = {
    CreateUser,UpdateUser,UserByGoogleId,UserByUID
}