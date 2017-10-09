[![CircleCI](https://circleci.com/gh/CognizantStudio/trade-finance-client/tree/master.svg?style=svg&circle-token=94f403cac177feb611d4ff2be7f5bf639e11f8ad)](https://circleci.com/gh/CognizantStudio/trade-finance-client/tree/master)

# Trade and Supply Finance Client App

This app was bootstrapped using the Accelerator repo. Please look over this documentation as it is incredibly useful. Docs can be found [here](docs/accelerator-starter.md).

#### Getting up and running:
- Clone this repo
- `yarn`
- `npm start`

#### Testing
- `npm run test`

#### Linting
- JavaScript
  * `npm run lint`
- SCSS
  * `npm run sass-lint`

You can also have the JS linting update in real-time by running: `npm run lint:watch`

#### Continuous Integration
We are using CircleCI to run the linters and tests each time there is a new PR or merge.

## Deployment
- Currently, there are 4 applications deployed; one for each user type. The following sections contain the approprate URLs.

- To deploy:
  * First, set a git remote pointing at the appropriate Heroku git URL: `git remote add <remote name> <
Heroku Git URL>`
    * the Heroku Git URL can be found through the Heroku GUI under the Settings for an individual project.

### Staging
- Staging URLs:
  * Seller - http://lp01-team-i-sme-sellerbank.herokuapp.com/
  * Buyer - http://lp01-team-i-sme-buyerbank.herokuapp.com/
  * Seller Bank - http://lp01-team-i-banker-sellerbank.herokuapp.com/
  * Buyer Bank - http://lp01-team-i-banker-buyerbank.herokuapp.com/
- Deployment to staging happens automatically with a passing build on the master branch
- If needed, you can manually deploy from the command line using `git push <remote name> master`

### Production
- Production URLs:
  * Seller - http://lp01-team-i-sme-sb-prod.herokuapp.com/
  * Buyer - http://lp01-team-i-sme-bb-prod.herokuapp.com/
  * Seller Bank - http://lp01-team-i-banker-sb-prod.herokuapp.com/
  * Buyer Bank - http://lp01-team-i-banker-bb-prod.herokuapp.com/
- Production will need to be manually deployed. To deploy run: `git push <remote name> master` from the command line.
