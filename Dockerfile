# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install                # installs both deps & devDeps, including @nestjs/cli

COPY . .
RUN npm run build              # now 'nest' is in node_modules/.bin

# Stage 2: runtime
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/db.sqlite ./db.sqlite

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
