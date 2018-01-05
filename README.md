# QuikFeedback

This App lets buisnesses create surveys for their endusers to take and gather results to be used for analysis and further feature developement of their website. It has features of accepting payments and sending surveys via emails to end users. The result of surveys are collected and can be used to provide 
important information to users.

- Google OAuth 2.0 to handle user login
- Stripe Api to handle payments
- SendGrid API to send emails
- AWS Code Pipeline to automate code deployment 

* Back End : Passport JS, AWS SDK, sendgrid, stripe
* Front End: React JS, Redux, React-Redux, React-Router, Axios, Stripe API, ReduxForm ,

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
node v8 or greater 
concurrent - latestest version
create-react-app - latest version
pm2 - latest version
```

### Installing
Install the following in your AWS EC2 Linux AMI Instance:

First, install `node js`:

```sh
Install from node official website
```

Next, install `concurrent`:

```sh
 npm install -g concurrently
```


Next, install `create-react-app `:

```sh
 npm install -g create-react-app
```

Last, install `pm2`:

```sh
 npm install -g pm2
```

## Deployment 
### Details on what enviornment variables to set are mentioned in the [enviornment-variables.md](enviornment-variables.md) file.

1. Create a AWS EC2 Linux AMI Instance and assign following policies to its IAM roles : `AmazonEC2RoleforAWSCodeDeploy` & `AmazonDynamoDBFullAccess`.

2. Create 2 Dynamo DB tables:
     1. User Table - googleId is partition key & id is secondary key named id-index. 
     2. Survey Table - id is partition key. and _user , id is the secondary key named _user-id-index
     3. Set Both Tables names in the enviornment variables.

3. Assign an Elastic IP to your ec2 instance.

4. Create your credentials for Google OAuth 2.0 Api 
    1. Assign `Javascript Authorized Origins` as your ec2 instances public ip: `http://ec2-instance-public-ip`
    2. Assign `Authorized Redirect URL's` as `http://ec2-instance-public-ip/auth/google/callback`
    3. Copy Client ID and Client secret from the credentials you created and set it into enviornment variables.

5. Create your Stripe Free Account. Copy the Stripe Publishable Key and Stripe Secret Key and set it into enviornment variables.

6. Create sendgrid Free Account. Copy the SendGrid API Key and set it into enviornment variables..

7. Set NODE_ENV enviornemnt variable to `production`, set redirectDomain to                                     `ec2-instance-public-ip/surveys/feedback` and set PORT to `5000` and Generate a good `cookieKey` as          enviornment variable.

8. set your STRIPE Publishable Key in `client/.env.production` file.

9. Run the following lines on your ec2 instance to run the app.
```sh
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 5000
cd /home/ec2-user/QuikFeedback
pm2 start npm -- start
```
To forward all requests from port 80 to port 5000 internally and to start the server on startup

10. Install CodeDeploy Agent in your Ec2 Instance. Create a new AWS Code Pipeline, Link it to this project       on github and Code Build should use the `buildspec.yml` provided in the root of the project. Code Deploy     should use the `appspec.yml` in the root of the project. (It will auto deploy the project to your ec2        instance and start it, using the scripts in scripts directory).


## Built With

* [NodeJS](https://nodejs.org/en/) - The web framework used
* [NVM](https://github.com/creationix/nvm) - Dependency Management

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* Jaymit Desai



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

