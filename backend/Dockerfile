FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build using your existing script
RUN npm run build

EXPOSE 4200

CMD ["node", "dist/server.js"]