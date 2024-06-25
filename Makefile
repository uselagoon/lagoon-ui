# upstream
CI_BUILD_TAG ?= lagoon-ui
CORE_REPO=https://github.com/uselagoon/lagoon.git
CORE_TREEISH=make-export-refactoring
CYPRESS_BASE=cypress/base:20.13.1

LAGOON_CORE_IMAGE_REPO=testlagoon
LAGOON_CORE_IMAGE_TAG=main

.PHONY: yarn-start-ui
yarn-start-ui:
	export GRAPHQL_API=http://localhost:3000/graphql \
	&& export KEYCLOAK_API=http://localhost:8088/auth \
	&& yarn install \
    && yarn build \
    && yarn start \

# run-cypress:
.PHONY: start-ui
start-ui: development-api
	export GRAPHQL_API=http://localhost:3000/graphql \
	&& export KEYCLOAK_API=http://localhost:8088/auth \
	&& export NODE_ENV=production \
	&& export NODE_PORT=3003 \
	&& export LAGOON_UI_TOURS_ENABLED=disabled \
	&& docker compose -p $(CI_BUILD_TAG) --compatibility up --build -d ui

.PHONY: development-api
development-api:
	export LAGOON_CORE=$$(mktemp -d ./lagoon-core.XXX) \
	&& export GRAPHQL_API=http://localhost:3000/graphql \
	&& export KEYCLOAK_API=http://localhost:8088/auth \
	&& git clone $(CORE_REPO) "$$LAGOON_CORE" \
	&& cd "$$LAGOON_CORE" \
	&& git checkout $(CORE_TREEISH) \
	&& IMAGE_REPO=$(LAGOON_CORE_IMAGE_REPO) IMAGE_REPO_TAG=$(LAGOON_CORE_IMAGE_TAG) COMPOSE_STACK_NAME=core-$(CI_BUILD_TAG) docker compose -p core-$(CI_BUILD_TAG) pull \
	&& IMAGE_REPO=$(LAGOON_CORE_IMAGE_REPO) IMAGE_REPO_TAG=$(LAGOON_CORE_IMAGE_TAG) COMPOSE_STACK_NAME=core-$(CI_BUILD_TAG) $(MAKE) compose-api-logs-development

.PHONY: run-cypress-with-development-api
run-cypress-with-development-api: start-ui
	$(MAKE) run-cypress

.PHONY: run-cypress
run-cypress:
	export GRAPHQL_API=http://localhost:3000/graphql \
	&& export KEYCLOAK_API=http://localhost:8088/auth \
	&& export UI_URL=http://localhost:3003 \
	&& docker run --rm -it --network host --name ct-$(CI_BUILD_TAG) \
		--volume "$$(pwd):/workdir" -w /workdir \
		-e cypress_api=$$GRAPHQL_API \
		-e cypress_keycloak=$$KEYCLOAK_API \
		-e cypress_url=$$UI_URL \
		--entrypoint=/bin/bash $(CYPRESS_BASE) ./cypress/run.sh

.PHONY: development-api-down
development-api-down:
	docker compose -p core-$(CI_BUILD_TAG) --compatibility down -v --remove-orphans

.PHONY: down
down:
	$(MAKE) development-api-down
	docker compose -p $(CI_BUILD_TAG) --compatibility down -v --remove-orphans