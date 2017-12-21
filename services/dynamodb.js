const AWS = require("aws-sdk");
const User = require("../models/User");
const credentials = require("../config/keys");



if (credentials.AWSCredentials) {
  AWS.config.update(
    new AWS.Config({
      accessKeyId: credentials.AWSCredentials.accessKeyId,
      secretAccessKey: credentials.AWSCredentials.secretAccessKey,
      region: credentials.AWSCredentials.region
    })
  );
}


dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateUser(googleId, credits) {
  let user_entry = User.UpdateUser(googleId,credits);
  let result = await dynamodb.update(user_entry).promise();
  return result.Attributes;
}

async function insertUser(googleId, email) {
  let user_entry = User.CreateUser(googleId,email);
  let result = await dynamodb
    .put(user_entry)
    .promise();
  return user_entry;
}

async function getUserByGoogleId(googleId) {
  let user_entry = User.UserByGoogleId(googleId); 
  let result = await dynamodb
    .get(user_entry)
    .promise()
    .then(entry => entry.Item);
  return result;
}

async function getUserByUID(id) {
  let user_entry = User.UserByUID(id);
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
      let user_entry = await insertUser(googleId, email);
      done(null, user_entry.Item);
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

