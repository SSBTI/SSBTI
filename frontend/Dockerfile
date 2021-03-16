FROM node

WORKDIR /home/jenkins/workspace/ssbti/frontend

COPY package*.json ./

RUN npm i -y

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]
