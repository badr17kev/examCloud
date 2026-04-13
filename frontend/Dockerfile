# Utiliser l'image node comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copier le reste du projet React
COPY . .

# Exposer le port par défaut de React
EXPOSE 3000

# Lancer l'application React
CMD ["npm", "start"]