const AWS = require('aws-sdk');

const credentials = require('../config/keys');

const uuid = require('uuid/v1');



if (credentials.AWSCredentials) {
    AWS.config.update(new AWS.Config({
        accessKeyId: credentials.AWSCredentials.accessKeyId,
        secretAccessKey: credentials.AWSCredentials.secretAccessKey,
        region: credentials.AWSCredentials.region
    }));
}

dynamodb = new AWS.DynamoDB();

function insertUser(googleId, email, user_entry, callback) {
    user_entry.TableName = credentials.TableName;
    user_entry.Item = {
        "id": {
            S: uuid()
        },
        "googleId": {
            S: googleId
        },
        "email": {
            S: email
        }
    };


    dynamodb.putItem(user_entry, callback);
}


function getUserByGoogleId(googleId, callback) {
    let user_entry = {
        TableName: credentials.TableName,
        Key: {
            "googleId": {
                S: googleId
            },

        }
    };
    dynamodb.getItem(user_entry, callback);
}

function getUserByUID(id, callback) {
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
    dynamodb.query(user_entry, callback);
}




function accountCreate(googleId, email, done) {

    getUserByGoogleId(googleId, (err, user) => {

        if (!err && user.length > 0) {
            done(null, user);

        } else {
            var user_entry = {}
            insertUser(googleId, email, user_entry, (err, user) => {

                if (!err) {
                    done(null, user_entry);
                }
            });
        }

    });

}

exports.insertUser = insertUser;
exports.getUserByGoogleId = getUserByGoogleId;
exports.getUserByUID = getUserByUID;
exports.accountCreate = accountCreate;