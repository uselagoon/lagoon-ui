# FROM uselagoon/api:latest
FROM timmclifford/lagoon-api:feature-insights-tab

COPY api_run.sh /app/services/api
RUN chmod +x /app/services/api/api_run.sh

CMD mkdir -p /mock-data && \
    yarn init --cwd /mock-data --yes && \
    yarn add --cwd /mock-data -D graphql@^14.5.8 graphql-tools@^4.0.6 faker@^4.1.0 && \
    cp -R /app/services/api/src/data/ /mock-data && \
    cp /app/services/api/src/mocks.js /mock-data && \
    /app/services/api/api_run.sh && \
    /app/node_modules/.bin/tsc-watch --build --incremental --onSuccess "node -r dotenv-extended/config dist/index"
