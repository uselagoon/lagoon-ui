FROM uselagoon/node-16

# Copying files from our service
COPY . .

# Verify that all dependencies have been installed via the yarn-workspace-builder
RUN yarn install
# Making sure we run in production
ENV NODE_ENV=production

RUN yarn run build

CMD ["yarn", "start"]
