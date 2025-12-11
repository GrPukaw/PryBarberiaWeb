# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src
COPY prisma ./prisma

# Compilar aplicación
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar cliente de Prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copiar código compilado
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]
