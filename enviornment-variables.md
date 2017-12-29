# Set environment variables

> [Environment variables](http://en.wikipedia.org/wiki/Environment_variable) are a set of dynamic named values that can affect the way running processes will behave on a computer.

> They are part of the operating environment in which a process runs. For example, a running process can query the value of the TEMP environment variable to discover a suitable location to store temporary files, or the HOME or USERPROFILE variable to find the directory structure owned by the user running the process.


## AMAZON EC2 Linux AMI:
READ the [README.md](README.md) for complete details on installation.


set the following enviornment variables into you ec2 instances .bashrc file or create a seperate file '.prod.env' an import it into the .bashrc file.
 
    GOOGLE_CLIENT_ID : Get this from credentials you create from the Google OAUth 2.0 API
    GOOGLE_CLIENT_SECRET : : Get this from credentials you create from the Google OAUth 2.0 API
    COOKIE_KEY : Make sure you keep this a large random string, it is used to encrypt the cookies
    DYNAMODB_USER_TABLE: Name of User Table you set in AWS Dynamo DB
    DYNAMODB_SURVEYS_TABLE: Name of User Table you set in AWS Dynamo DB
    STRIPE_PUBLISHABLE_KEY : From the Stripe Website
    STRIPE_SECRET_KEY: From Stripe Website
    SENDGRID_API_KEY : From SendGrid Website
    REDIRECT_DOMAIN: your-ec2instance-ip/surveys/feedback
    NODE_ENV: 'production'

    Dont forget to set the Stripe Publishable Key in the client/.env.production file.