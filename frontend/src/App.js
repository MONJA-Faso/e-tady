// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('');

  // Charger les utilisateurs lors du montage du composant
  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://172.18.0.3:5000/utilisateurs');
      setUtilisateurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const ajouterUtilisateur = async () => {
    try {
      const response = await axios.post('http://172.18.0.3:5000/utilisateurs', {
        nom,
        email,
        mot_de_passe: motDePasse,
        rôle: role,
      });
      setUtilisateurs([...utilisateurs, response.data]);
      setNom('');
      setEmail('');
      setMotDePasse('');
      setRole('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  const supprimerUtilisateur = async (id) => {
    try {
      await axios.delete(`http://172.18.0.3:5000/utilisateurs/${id}`);
      setUtilisateurs(utilisateurs.filter((utilisateur) => utilisateur.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <p>Ato ilay izy e . YEEEEEEEE</p>
      
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rôle"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={ajouterUtilisateur}>Ajouter Utilisateur</button>

      <h2>Liste des Utilisateurs</h2>
      <ul>
        {utilisateurs.map((utilisateur) => (
          <li key={utilisateur.id}>
            {utilisateur.nom} ({utilisateur.email}) - {utilisateur.rôle}
            <button onClick={() => supprimerUtilisateur(utilisateur.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
