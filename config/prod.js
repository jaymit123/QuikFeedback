module.exports = {
    "OAuthCredentials": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET
    },

    "AWSCredentials": null,

    "cookieKey": process.env.COOKIE_KEY,
    "UserTable": process.env.DYNAMODB_USER_TABLE,
    "SurveysTable": process.env.DYNAMODB_SURVEYS_TABLE,
    "stripePublishableKey" : process.env.STRIPE_PUBLISHABLE_KEY,
    "stripeSecretKey": process.env.STRIPE_SECRET_KEY,
    "sendGridAPIKey": process.env.SENDGRID_API_KEY,
    "redirectDomain" : process.env.REDIRECT_DOMAIN


};