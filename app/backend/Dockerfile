FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001 

CMD ["npm", "start"]