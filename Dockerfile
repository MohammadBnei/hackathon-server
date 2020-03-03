FROM node
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "/usr/src/app/"]
RUN cd /usr/src/app/ && npm install --silent 