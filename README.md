# Football-score
Une application de football réalisée en Nuxt 4, qui exploite l'API de api-football.com.

## Initialiser le projet pour le développement
- Cloner le repository avec : `git clone https://github.com/WilliammCorreia/Football-Score`
- Se déplacer dans le dossier ajouté : `cd football-score`
- Créer un fichier `.env` vierge : `touch .env`
- Lancer le daemon de Docker ou lancer Docker Desktop
- Lancer le projet en développement avec : `docker compose up -d --build`

## Extensions Visual Studio Code recommandées pour le développement
- **Vue (Official)** de Vue, pour la prise en charge des extensions `.vue`
- **Tailwind CSS IntelliSense** de Tailwind Labs, pour les suggestions et auto-complétions tailwindcss
- **ESLint** de Microsoft, pour avoir le linter à chaque sauvegarde du code en direct
    - REMARQUE : `npm install` requis à la racine du dossier `football-score` pour le bon fonctionnement de l'extension