FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY src/ ./src/
COPY tsconfig.json .

RUN npm install

RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/package*.json .

RUN npm install --only=production

EXPOSE 5173

CMD ["node", "dist/app.js"]
