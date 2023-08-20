FROM node

WORKDIR /dev/FMS/api-gateway

COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]