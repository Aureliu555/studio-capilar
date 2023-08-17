FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install date-fns vimeo crypto-js bootstrap-icons express express-handlebars express-session hbs mongodb node-fetch passport --omit=dev

COPY . .

CMD ["node", "server.mjs"]