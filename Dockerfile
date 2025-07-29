
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/db.sqlite ./db.sqlite

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
