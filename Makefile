include config

build:
	npm run build

zip: build
	rm -f functions.zip
	zip -q -r functions.zip -x@.funcignore .

deploy: zip
	az functionapp deployment source config-zip --resource-group ${RESOURCE_GROUP} --name ${FUNCTION_APP_NAME} --src functions.zip

configure-prod: build
	#az functionapp config appsettings set --resource-group ${RESOURCE_GROUP} --name ${FUNCTION_APP_NAME} --settings "TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}"
	TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN} WEBHOOK_ADDRESS=${WEBHOOK_ADDRESS} node register.js

local-run: build
	TELEGRAM_BOT_TOKEN_DEV=${TELEGRAM_BOT_TOKEN_DEV} node QuiMiDicis/index.js