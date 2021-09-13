FROM uselagoon/api:latest

# RUN mkdir -p /mock-data && cd /mock-data && \
#     yarn add -D graphql@^14.5.8 graphql-tools@^4.0.6 faker@^4.1.0 && \
#     cp -R /app/services/api/src/data/ /mock-data && \
#     cp /app/services/api/src/mocks.js /mock-data

# WORKDIR /app/services/api

# CMD cp -R /mock-data /app/mock-data/src && \
#     node -r dotenv-extended/config "dist/index"

COPY api_run.sh /app/services/api
RUN chmod +x /app/services/api/api_run.sh

CMD /app/services/api/api_run.sh && \
    /app/node_modules/.bin/tsc-watch --build --incremental --onSuccess "node -r dotenv-extended/config dist/index"