FROM node

WORKDIR /netman-web-app-crm

COPY package.json /netman-web-app-crm

RUN npm install 

COPY . .

ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "start"]