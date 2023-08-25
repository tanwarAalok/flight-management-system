FROM node

WORKDIR /FMS/flight-service

COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]