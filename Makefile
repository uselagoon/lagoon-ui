.PHONY: all
all:
	docker-compose up -d

.PHONY: ui
ui:
	docker-compose up -d ui

.PHONY: logs
logs:
	docker-compose logs -f

# Local api data watcher pusher setup
.PHONY:	local-api-data-watcher-pusher
local-api-data-watcher-pusher:
	export LOCAL_DEV_DIR=$$(mkdir -p ./local-dev/api-data-watcher-pusher) \
		&& cd "$$LOCAL_DEV_DIR" \
		&& git remote add lagoon git@github.com:amazeeio/lagoon.git \
		&& git config pull.rebase false \
    && git pull lagoon main \
		&& git checkout lagoon feature/facts-search-api-changes

.PHONY: setup-mocks
setup-mocks:
	yarn --cwd local-dev/api install

.PHONY: build-storybook
build-storybook: setup-mocks
	yarn --cwd services/ui build-storybook

.PHONY: storybook
storybook: build-storybook
	yarn --cwd services/ui storybook