# Synthetic Tests Pings

[![CircleCI](https://circleci.com/gh/NYULibraries/synthetic-tests-pings.svg?style=shield)](https://circleci.com/gh/NYULibraries/synthetic-tests-pings)

Runs a series of AWS Lambda synthetic tests against NYU Libraries Web Services applications and vendor applications.

Synthetic tests run on a schedule and report based on availability and response time.

Each `function` is a series of pings using the same handler but with different environments defining the expected URL endpoint, the expected response code and acceptable response times.

Each test can be scheduled on its own cron schedule and reports out about failed tests after each run.

## Reporting

Reports via a Slack hook to `libtechnyu` via the `#synthetic-tests` channel. Report with response code and time.

## Deployment

Deploys via [https://github.com/NYULibraries/web-lambdas-terraform](https://github.com/NYULibraries/web-lambdas-terraform). See the README for deployment instructions.

### To create

```
# Create all defined in deploy.yml
docker-compose -f docker-compose.deploy.yml run fn_create
# Create a single function
docker-compose -f docker-compose.deploy.yml run fn_create [name_of_function]
```

### To destroy

```
# Destroy all defined in deploy.yml
docker-compose -f docker-compose.deploy.yml run fn_destroy
# Destroy a single function
docker-compose -f docker-compose.deploy.yml run fn_destroy [name_of_function]
```

## Testing

### Unit

Using Jest to unit-test the JavaScript

```
docker-compose run test
```

### Integration 

Test that the lambdaci container returns successfully before deploying the function

```
docker-compose run dev
```

To run this test in different contexts (i.e. how the production lambda would work) change the variables in the docker-compose `environment` 

## Roadmap

- ~~Deploy via CircleCI - see [other serverless functions](https://github.com/NYULibraries/bobcat-linker/blob/master/.circleci/config.yml) for example~~
- Create badges for [coverage](https://www.npmjs.com/package/jest-coverage-badges) ~~and CI~~ in this README
- ~~Include functionality tests using [WebDriver IO](https://webdriver.io/), or the like~~ [Done in its own repo: synthetic-tests-e2e](https://github.com/NYULibraries/synthetic-tests-e2e)
- Prettifying of messages in Slack
- Update this README to reflect the actualy usage and functionality.
