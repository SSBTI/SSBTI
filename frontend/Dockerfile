FROM node

WORKDIR /home/ubuntu/field-team3/frontend

COPY package*.json ./

RUN npm i -y

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]
