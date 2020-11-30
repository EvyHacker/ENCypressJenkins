FROM cypress/base:10
RUN node --version
RUN npm --version
COPY package.json package-lock.json ./
COPY cypress.json cypress ./
COPY cypress ./cypress
RUN npm ci