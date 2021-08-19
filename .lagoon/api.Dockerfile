FROM timmclifford/lagoon-api:facts-search

CMD cp /app/services/api/src/mocks.js /local-dev/api && \
    cp -R /app/services/api/src/data/ /local-dev/api && \
    node -r dotenv-extended/config "dist/index"