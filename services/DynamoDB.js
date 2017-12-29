/**
 * Provides methods to interact with User and Survey Databases in AWS Document DB
 */

// Loading dependencies
const AWS = require("aws-sdk");
const User = require("../models/User");
const credentials = require("../config/keys");


//Setup AWS Configuration
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

// Insert a Survey Record
async function insertSurvey(survey) {
  await dynamodb
                .put(survey)
                .promise();
}

// Add Credits to User Record
async function addCredits(googleId, credits) {
  let user_entry = User.AddCredits(googleId, credits);
  let result = await dynamodb
                            .update(user_entry)
                            .promise();
  return result.Attributes;
}

//Deduct Credits from User Record
async function deductCredits(googleId, credits) {
  let user_entry = User.DeductCredits(googleId, credits);
  let result = await dynamodb
                            .update(user_entry)
                            .promise();
  return result.Attributes;
}

// Add new User Record
async function insertUser(googleId, email) {
  let user_entry = User.CreateUser(googleId, email);
  let result = await dynamodb
                            .put(user_entry)
                            .promise();
  return user_entry;
}

// Get User Record by Google ID
async function getUserByGoogleId(googleId) {
  let user_entry = User.UserByGoogleId(googleId);
  let result = await dynamodb
                            .get(user_entry)
                            .promise()
                            .then(entry => entry.Item);
  return result;
}

// Get User Record by UID
async function getUserByUID(id) {
  let user_entry = User.UserByUID(id);
  let result = await dynamodb
                            .query(user_entry)
                            .promise()
                            .then(entry => entry.Items[0]);
  return result;
}

// Check if User Record exist then return the record else create a new record
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
  addCredits,
  insertSurvey,
  deductCredits
};

