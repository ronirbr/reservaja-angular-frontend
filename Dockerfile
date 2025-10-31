# -------------------------------
# Stage 1: Build Angular app
# -------------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build da aplicação Angular (modo produção)
RUN npm run build -- --configuration production

# -------------------------------
# Stage 2: Servir via Nginx
# -------------------------------
FROM nginx:alpine

# Copia os arquivos do build para o diretório padrão do Nginx
COPY --from=build /app/dist/reservaja-angular-frontend/browser /usr/share/nginx/html

# Copia configuração personalizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
