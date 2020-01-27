# Example of a Telegram bot built with Azure Function Apps in node.js

First deployment:

- Create a new Azure Resource Group or use an existing one. 
- Create a new Azure Function App
- Create two bots in Telegram (see https://core.telegram.org/bots) One will be used in production from Azure, the other one will be used locally for testing.
- Create a file named `config` based on `config-example` with the Azure and Telegram info. Note: `WEBHOOK_ADDRESS` will be completed later
- Execute `make deploy`
- Using "Get function url" for the deployed function in the Azure portal complete the `WEBHOOK_ADDRESS` in `config`
- Execute `make configure-prod`

Next deployments:

- Change code
- Execute `make deploy`

Local execution:

- Execute `make local-run`
