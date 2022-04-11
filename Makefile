.PHONY: all
all: clean-local install get_creds

.PHONY: install
install: build-all install-packages

.PHONY: build-all
build-all: get_creds
	docker network inspect amazeeio-network >/dev/null 2>&1 || docker network create amazeeio-network
	docker-compose up -d

.PHONY: build-ui
build-ui:
	docker-compose up -d ui

.PHONY: clean-local
clean-local: check_clean
	rm -rf ./local-dev ./services/api ./services/mock-data

.PHONY: check_clean
check_clean:
	@echo -n "Are you sure? This will remove ./local-dev ./services/api and ./services/mock-data which you may have made local changes to [y/N] " && read ans && [ $${ans:-N} = y ]


.PHONY: logs
logs:
	docker-compose logs -f


## Syncing from Lagoon repo

.PHONY: re-sync-api
re-sync-api:
	@echo "Syncing local API src with container"
	@docker-compose exec api sh -c "/app/services/api/api_run.sh"
	@docker-compose exec api sh -c "touch /app/services/api/api_run.sh"

.PHONY: get_creds
get_creds:
	@echo "API token"
	@docker-compose exec local-api-data-watcher-pusher sh -c "/home/create_jwt.py"

# Local api data watcher pusher setup
## @timclifford Set --depth 1 when not testing and set to 'git checkout main'
## require git >=2.25
.PHONY:	update-local-api-data-watcher-pusher
update-local-api-data-watcher-pusher:
	export LOCAL_DEV_DIR=$$(mkdir -p ./tmp/ && echo "./tmp/") \
		&& git clone --no-checkout https://github.com/uselagoon/lagoon.git "$$LOCAL_DEV_DIR" \
		&& cd "$$LOCAL_DEV_DIR" \
		&& git sparse-checkout init --cone \
		&& git sparse-checkout set "local-dev/api-data-watcher-pusher/" "localdev/api-data/" \
		&& git checkout main \
		&& find ./local-dev -maxdepth 1 -type f -delete && mv ./local-dev ../ && cd ../ && rm -rf tmp/

.PHONY: install-packages
install-packages:
	yarn --cwd services/ui && yarn install

.PHONY: install-mocks
install-mocks:
	yarn --cwd services/api install

.PHONY: build-storybook
build-storybook: setup-mocks
	yarn --cwd services/ui build-storybook

.PHONY: storybook
storybook: build-storybook
	yarn --cwd services/ui storybook