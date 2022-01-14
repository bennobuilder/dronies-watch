# Specify the image (Base Image) on which to base this image
FROM node:lts-alpine

# Create 'app' directory
# and specify it as working directory
# (RUN lets us execute commands inside of our Docker image working directory)
RUN mkdir -p /app
# (In the workingdirectory commands like 'RUN', 'CMD', .. will be executed)
# https://www.educative.io/edpresso/what-is-the-workdir-command-in-docker
WORKDIR /app

# Environment Variables
ENV APP_VERSION=v1

# Install app dependencies using yarn
# (With './' we reference the current working directory -> '/app')
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

# Move required app source into the working directory referenced with './'
COPY ./src ./src
COPY ./tsconfig.json ./

# For debugging:
# Lists all the files and folder that we have copied inside the working directory.
# Note: To actually see the output of this command we need to specify the flag '--progress=plain '
RUN ls -l

# Bundle app source
RUN yarn build

# Start Container
# (CMD specifies the default command that runs when your container starts)
# https://nickjanetakis.com/blog/docker-tip-7-the-difference-between-run-and-cmd
CMD [ "yarn", "start" ]

EXPOSE 5000
