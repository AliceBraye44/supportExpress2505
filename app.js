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
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

/*  Créé une route en post ("/api/movies") qui permet d'enregistrer un nouveau film dans la bdd .
utilise req.body pour sécuriser ta demande
si il y a une erreur retourne un status 500 avec un message explicatif 
si la requête est complété, renvoie un status 200 avec un message explicatif*/ 

app.post("/api/movies", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
    [title, director, year, color, duration],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the movie");
      } else {
        res.status(200).send("Movie successfully saved");
      }
    }
  );
});


/*  Créé une route en put ("/api/movies//id") qui permet de modifier un film dans la bdd .
utilise req.body pour sécuriser ta demande
utilise req.params.id pour récupérer l'id en paramètre 
si il y a une erreur retourne un status 500 avec un message explicatif 
si la requête est complété, renvoie un status 200 avec un message explicatif*/ 

app.put("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const moviePropsToUpdate = req.body;
  connection.query(
    "UPDATE movies SET ? WHERE id = ?",
    [moviePropsToUpdate, movieId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating a movie");
      } else {
        res.status(200).send("Movie updated successfully 🎉");
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
