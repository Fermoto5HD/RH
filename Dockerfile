FROM node:latest

COPY . /usr/src/RH
WORKDIR /usr/src/RH

RUN npm install --production
ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]