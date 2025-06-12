# TP4 dev avancé + node
## Conseil et info

- Utilisez post man 
- Le tp4 se trouve dans le dossier ```tp3-express-nodejs-main```
- un .env est nécéssaire à ce formet : 
```
DATABASE = "url du cluster atlas mongo db"
JWT_KEY=pass_phrase
```
- Pour accéder aux routes protégés merci d'ajouter la key généré au login dans l'en-tête Authorization: Bearer <token>
## Liste des routes

| Méthode | URL                        | Accès         | Description                        |
|---------|----------------------------|---------------|------------------------------------|
| POST    | /api/v1/users/signup       | Public        | Inscription d'un nouvel utilisateur|
| POST    | /api/v1/users/login        | Public        | Connexion, retourne un JWT         |
| GET     | /api/v1/users/             | Authentifié   | Liste tous les utilisateurs        |
| GET     | /api/v1/users/admin        | Admin         | Liste tous les utilisateurs        |
| POST    | /api/v1/users/admin        | Admin         | Créer un utilisateur               |
| GET     | /api/v1/users/admin/:id    | Admin         | Obtenir un utilisateur par ID      |
| PUT     | /api/v1/users/admin/:id    | Admin         | Modifier un utilisateur par ID     |
| DELETE  | /api/v1/users/admin/:id    | Admin         | Supprimer un utilisateur par ID    |

## Contributors 

Baptiste Rousselot