# Utiliser Node.js 22 comme image de base
FROM node:22-alpine

# Installer npm
RUN apk add --no-cache npm

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port 3000 pour l'application React
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
