const express = require('express');
const { Pool } = require('pg');  // Importation de Pool pour gérer les connexions
const app = express();




// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'monja',
  host: 'db', // nom du service Docker
  database: 'e_tady',
  password: 'monja',
  port: 5432, // ou 5433 si c'est configuré ainsi
});



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! node 22');
});








app.post('/utilisateurs', async (req, res) => {
  const { nom, email, mot_de_passe, rôle } = req.body;
  try {
      const result = await pool.query(
          'INSERT INTO Utilisateur (nom, email, mot_de_passe, rôle) VALUES ($1, $2, $3, $4) RETURNING *',
          [nom, email, mot_de_passe, rôle]
      );
      res.json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/utilisateurs', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM Utilisateur');
      res.json(result.rows);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put('/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, mot_de_passe, rôle } = req.body;
  try {
      const result = await pool.query(
          'UPDATE Utilisateur SET nom = $1, email = $2, mot_de_passe = $3, rôle = $4 WHERE id = $5 RETURNING *',
          [nom, email, mot_de_passe, rôle, id]
      );
      res.json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.delete('/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM Utilisateur WHERE id = $1', [id]);
      res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});










app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
