FROM node

WORKDIR /FMS/api-gateway

COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]