# FROM node:14
# WORKDIR /app

# # Supprimer node_modules s'il existe
# RUN rm -rf ./node_modules

# COPY package*.json ./
# RUN npm install --force

# COPY . .
# EXPOSE 5000
# CMD ["node", "index.js"]



# Utiliser Node.js 22 comme image de base
FROM node:22-alpine

 # Supprimer node_modules s'il existe
 RUN rm -rf ./node_modules

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "index.js"]
