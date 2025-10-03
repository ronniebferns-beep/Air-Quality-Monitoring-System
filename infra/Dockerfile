FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY backend ./
RUN pnpm build
CMD ["node", "dist/server.js"]