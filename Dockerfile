FROM node:18

WORKDIR /app

COPY --chown=node:node package.json .

RUN npm install
RUN npm run dev

COPY --chown=node:node . .
USER node

COPY . .

EXPOSE 3000

CMD ["npm", "run","dev" ]