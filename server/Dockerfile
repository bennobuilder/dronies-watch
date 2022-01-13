FROM node:16

# Create 'app' directory
# and specify it as working directory
# (RUN lets you execute commands inside of your Docker image)
RUN mkdir -p /app
# (In the workingdirectory commands like 'RUN', 'CMD', .. will be executed)
# https://www.educative.io/edpresso/what-is-the-workdir-command-in-docker
WORKDIR /app

# Install app dependencies
COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn install

# Bundle app source
# (Not moving . (everything) as we don't need everything to execute our server)
COPY ./src /app
COPY ./tsconfig.json /app

# TODO Moving everything because of error:
#  'error TS18003: No inputs were found in config file '/app/tsconfig.json'. Specified 'include' paths were '["src"]' and 'exclude' paths were '["./dist"]'.'
COPY . /app

RUN yarn build

EXPOSE 5000

# CMD specifies the default command that runs when your container starts
# https://nickjanetakis.com/blog/docker-tip-7-the-difference-between-run-and-cmd
CMD [ "yarn", "start" ]
