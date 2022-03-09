FROM alpine:3.13.5

RUN apk add --no-cache \
    bash \
    gettext \
    moreutils \
    py3-jwt \
    tini \
    git \
    wget

ENV JWTSECRET=super-secret-string \
    JWTAUDIENCE=api.dev

RUN git clone --no-checkout --filter=blob:none --sparse https://github.com/uselagoon/lagoon.git "./tmp/" \
    && cd "./tmp/" \
    && git sparse-checkout set local-dev/api-data-watcher-pusher \
    && git checkout main \
    && cd "/" && mv "./tmp/local-dev" "/"

CMD cp -R ./local-dev/api-data-watcher-pusher/api-data / && \
    cp ./local-dev/api-data-watcher-pusher/api-watch-push.sh /home/ && \
    cp ./local-dev/api-data-watcher-pusher/create_jwt.py /home/ && \
    tini -- "/home/api-watch-push.sh"