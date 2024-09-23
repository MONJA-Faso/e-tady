CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(100) NOT NULL,
    rôle VARCHAR(20)
);

CREATE TABLE Propriétaire (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    contact VARCHAR(100)
);

CREATE TABLE Maison (
    id SERIAL PRIMARY KEY,
    adresse VARCHAR(255),
    prix DECIMAL(10, 2),
    description TEXT,
    disponibilité BOOLEAN DEFAULT TRUE,
    propriétaire_id INT REFERENCES Propriétaire(id)
);

CREATE TABLE Réservation (
    id SERIAL PRIMARY KEY,
    date_debut DATE,
    date_fin DATE,
    maison_id INT REFERENCES Maison(id),
    utilisateur_id INT REFERENCES Utilisateur(id)
);
