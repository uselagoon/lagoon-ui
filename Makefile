.PHONY: all
all:
	docker-compose up -d

.PHONY: ui
ui:
	docker-compose up -d ui

.PHONY: logs
logs:
	docker-compose logs -f

get_creds:
	@echo "API token"
	@docker-compose exec local-api-data-watcher-pusher sh -c "/home/create_jwt.py"

# Local api data watcher pusher setup
## @timclifford Set --depth 1 when not testing and set to 'git checkout main'
.PHONY:	local-api-data-watcher-pusher
local-api-data-watcher-pusher:
	export LOCAL_DEV_DIR=$$(mkdir -p ./lagoon&& echo "./lagoon") \
		&& git clone --no-checkout --filter=blob:none --sparse https://github.com/uselagoon/lagoon.git "$$LOCAL_DEV_DIR" \
		&& cd "$$LOCAL_DEV_DIR" \
		&& git sparse-checkout set local-dev/api-data-watcher-pusher \
		&& git checkout feature/facts-search-api-changes

.PHONY: clean-local-dev
clean-local-dev: check_clean
	rm -rf ./local-dev	

.PHONY: check_clean
check_clean:
	@echo -n "Are you sure? This will remove the ./local-dev repo which you may have made local changes to [y/N] " && read ans && [ $${ans:-N} = y ]

.PHONY: setup-mocks
setup-mocks:
	yarn --cwd local-dev/api install

.PHONY: build-storybook
build-storybook: setup-mocks
	yarn --cwd services/ui build-storybook

.PHONY: storybook
storybook: build-storybook
	yarn --cwd services/ui storybook