# Etapa de build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción (usamos 'serve' para servir archivos estáticos)
FROM node:18 AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

# Render usará esta variable para exponer el puerto
ENV PORT=8080
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
