# Synthetic Tests

Runs a series of AWS Lambda synthetic tests against NYU Libraries Web Services applications and vendor applications.

Synthetic tests run on a schedule and report based on availability and response time.

Each `function` is a series of pings using the same handler but with different environments defining the expected URL endpoint, the expected response code and acceptable response times.

Each test can be scheduled on its own cron schedule and reports out about failed tests after each run.

## Reporting

Report via a Slack hook to `libtechnyu` via the `#synthetic-tests` channel. Report with response code and time.

## Testing the tests

Using Jest to unit-test the JavaScript

## Serverless

[Serverless]() should be able to deploy all these functions with schedules and without API Gateway

## Roadmap

- Deploy via CircleCI - see [other serverless functions](https://github.com/NYULibraries/bobcat-linker/blob/master/.circleci/config.yml) for example
- Create badges for [coverage](https://www.npmjs.com/package/jest-coverage-badges) and CI in this README
- Include functionality tests using [WebDriver IO](https://webdriver.io/), or the like
- Update this README to reflect the actualy usage and functionality.