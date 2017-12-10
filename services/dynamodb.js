const AWS = require("aws-sdk");

const credentials = require("../config/keys");

const uuid = require("uuid/v1");

if (credentials.AWSCredentials) {
  AWS.config.update(
    new AWS.Config({
      accessKeyId: credentials.AWSCredentials.accessKeyId,
      secretAccessKey: credentials.AWSCredentials.secretAccessKey,
      region: credentials.AWSCredentials.region
    })
  );
}

dynamodb = new AWS.DynamoDB();

async function updateUser(googleId, credits) {
  let user_entry = {
    TableName: credentials.TableName,
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
  let result = await dynamodb.updateItem(user_entry).promise();
  return result.Attributes;
}

async function insertUser(googleId, email, user_entry) {
  user_entry.TableName = credentials.TableName;
  user_entry.Item = {
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
      N: 0
    }
  };

  let result = await dynamodb
    .putItem(user_entry)
    .promise()
    .then(entry => entry.Item);
  return result;
}

async function getUserByGoogleId(googleId) {
  let user_entry = {
    TableName: credentials.TableName,
    Key: {
      googleId: {
        S: googleId
      }
    }
  };
  let result = await dynamodb
    .getItem(user_entry)
    .promise()
    .then(entry => entry.Item);
  return result;
}

async function getUserByUID(id) {
  let user_entry = {
    TableName: credentials.TableName,
    IndexName: "id-index",
    KeyConditionExpression: "id = :v1",

    ExpressionAttributeValues: {
      ":v1": {
        S: id
      }
    }
  };
  let result = await dynamodb
    .query(user_entry)
    .promise()
    .then(entry => entry.Items);
  return result;
}

async function accountCreate(googleId, email, done) {
  try {
    let queryResult = await getUserByGoogleId(googleId);
    if (queryResult) {
      done(null, queryResult);
    } else {
      var user_entry = {};
      let isSuccess = await insertUser(googleId, email, user_entry);
      done(null, user_entry);
    }
  } catch (er) {
    console.log(er);
  }
}

module.exports = {
  insertUser,
  getUserByGoogleId,
  getUserByUID,
  accountCreate,
  updateUser
};
