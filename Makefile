include config

build:
	npm build

zip: build
	rm functions.zip
	zip -q -r functions.zip -x@.funcignore .

deploy: zip
	az functionapp deployment source config-zip --resource-group ${RESOURCE_GROUP} --name ${FUNCTION_APP_NAME} --src functions.zip

-prod:
	az functionapp config appsettings set --resource-group ${RESOURCE_GROUP} --name ${FUNCTION_APP_NAME} --settings "TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}"
	az functionapp config appsettings set --resource-group ${RESOURCE_GROUP} --name ${FUNCTION_APP_NAME} --settings "WEBHOOK_ADDRESS=${WEBHOOK_ADDRESS}"

local-run:
	TELEGRAM_BOT_TOKEN_DEV=${TELEGRAM_BOT_TOKEN_DEV} node QuiMiDicis index.js