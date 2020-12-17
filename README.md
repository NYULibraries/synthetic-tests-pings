# Synthetic Tests

Runs a series of AWS Lambda synthetic tests against NYU Libraries Web Services applications and vendor applications.

Synthetic tests run on a schedule and report based on availability and response time.

Each `function` is a series of pings using the same handler but with different environments defining the expected URL endpoint, the expected response code and acceptable response times.

Each test can be scheduled on its own cron schedule and reports out about failed tests after each run.

## Reporting

TODO: Report via a Slack hook to `libtechnyu` via the `#synthetic-tests` channel. Report with response code and time.

## Deployment

You must specify the following as environment variables either in the host environment or in a `.env` file:

```
LAMBDA_ROLE
S3_BUCKET
SERVERLESS_STAGE
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
SLACK_URL
PROM_URL
HTTP_AUTH_USER
HTTP_AUTH_PASSWORD
```

The `LAMBDA_ROLE` should be the ARN of an AWS IAM role with permissions defined by the `AWSLambdaBasicExecutionRole` policy. The `S3_BUCKET` should be the name of an AWS S3 bucket for deploying the lambda code. Keep in mind that S3 bucket names must be unique _across all accounts_, so for testing, you may want to use a name with an appended random hash.

Then run `docker-compose run deploy`

To invoke a function, run `docker-compose run invoke $FUNCTION_NAME`

## Unit-testing the tests

Using Jest to unit-test the JavaScript

```
docker-compose run test
```

## Integration testing

Test that the lambdaci container returns successfully before deploying the function

```
docker-compose run dev
```

## Serverless

[Serverless](https://github.com/serverless/serverless) should be able to deploy all these functions with schedules and _without API Gateway_

## Roadmap

- Deploy via CircleCI - see [other serverless functions](https://github.com/NYULibraries/bobcat-linker/blob/master/.circleci/config.yml) for example
- Create badges for [coverage](https://www.npmjs.com/package/jest-coverage-badges) and CI in this README
- Include functionality tests using [WebDriver IO](https://webdriver.io/), or the like
- Prettifying of messages in Slack
- Update this README to reflect the actualy usage and functionality.
