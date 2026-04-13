# a. Utiliser l'image node:14 comme base [cite: 63]
FROM node:18

# b. Définir /app comme répertoire de travail [cite: 64]
WORKDIR /app

# c. Copier package.json [cite: 65]
COPY package.json .

# d. installer les dépendances [cite: 66]
RUN npm install

# e. copier le reste du projet [cite: 67]
COPY . .

# f. Exposer le serveur au port 3010 [cite: 68]
EXPOSE 3010

# g. Lancer le serveur avec CMD [cite: 69]
CMD ["node", "server.js"]