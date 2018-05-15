FROM node:latest

COPY . /usr/src/RH
WORKDIR /usr/src/RH

RUN npm install --production
ENV NODE_ENV production

ENV PORT 3001

EXPOSE 3001

CMD ["npm", "start"]