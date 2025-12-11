# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY .eslintrc* ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente y archivos públicos
COPY src ./src
COPY public ./public

# Compilar aplicación Next.js
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copiar package.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar build de la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
