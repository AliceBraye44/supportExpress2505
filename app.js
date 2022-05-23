const connection = require("./db-config");
const express = require("express");
const app = express();

const port = process.env.PORT ?? 3000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());

/*  Créé une route en get ("/api/movies") qui affiche tous les films en format JSON.
 si il y a une erreur retourne un status 500 avec un message explicatif */ 


/*  Créé une route en post ("/api/movies") qui permet d'enregistrer un nouveau film dans la bdd .
utilise req.body pour sécuriser ta demande
si il y a une erreur retourne un status 500 avec un message explicatif 
si la requête est complété, renvoie un status 200 avec un message explicatif*/ 




/*  Créé une route en put ("/api/movies//id") qui permet de modifier un film dans la bdd .
utilise req.body pour sécuriser ta demande
utilise req.params.id pour récupérer l'id en paramètre 
si il y a une erreur retourne un status 500 avec un message explicatif 
si la requête est complété, renvoie un status 200 avec un message explicatif*/ 


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
