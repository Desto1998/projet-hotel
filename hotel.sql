-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 16 juin 2021 à 16:45
-- Version du serveur :  10.4.16-MariaDB
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hotel`
--

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

CREATE TABLE `chambre` (
  `id_chambre` int(11) NOT NULL,
  `code_chambre` varchar(50) NOT NULL,
  `categorie` varchar(45) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id_chambre`, `code_chambre`, `categorie`, `prix`, `status`) VALUES
(2, 'A001', 'Vip', 5000, 'libre'),
(3, 'A002', 'Normal', 3000, 'occupé'),
(4, 'A001', 'Vip', 5000, 'libre'),
(5, 'A002', 'Normal', 3000, 'occupé');

-- --------------------------------------------------------

--
-- Structure de la table `chambreclient`
--

CREATE TABLE `chambreclient` (
  `idchambreClient` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_chambre` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chambreclient`
--

INSERT INTO `chambreclient` (`idchambreClient`, `id_client`, `id_chambre`, `date`) VALUES
(1, 27, 2, '2021-06-10'),
(2, 28, 4, '2021-06-11');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `tel` int(11) NOT NULL,
  `cni` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sexe` varchar(10) NOT NULL,
  `nombre_chambre` int(11) NOT NULL,
  `date_ajout` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `tel`, `cni`, `email`, `sexe`, `nombre_chambre`, `date_ajout`) VALUES
(27, 'Desto Tambu', 67690909, 9, 'desto@gmail.com', 'M', 1, '2021-06-10 17:08:46'),
(28, 'Desto Tambu', 67690909, 9, 'desto@gmail.com', 'M', 1, '2021-06-10 17:08:46');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `nom_commande` varchar(255) NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `montant` float NOT NULL,
  `etat` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `date_commande` datetime NOT NULL,
  `nombre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `nom_commande`, `lieu`, `montant`, `etat`, `statut`, `id_client`, `date_commande`, `nombre`) VALUES
(1, 'wisky', 'Bar', 6000, 1, 1, 27, '2021-06-10 17:10:18', 0);

-- --------------------------------------------------------

--
-- Structure de la table `entree`
--

CREATE TABLE `entree` (
  `id_entree` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE `facture` (
  `id_facture` int(11) NOT NULL,
  `nom_facture` varchar(255) NOT NULL,
  `reporter` float NOT NULL,
  `reglement` float NOT NULL,
  `total` float NOT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `id_profil` int(11) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id_profil`, `role`, `id_user`) VALUES
(1, 'admin', 1),
(2, 'receptioniste', 2);

-- --------------------------------------------------------

--
-- Structure de la table `sortie`
--

CREATE TABLE `sortie` (
  `id_sortie` int(11) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `tel` int(11) NOT NULL,
  `cni` int(11) NOT NULL,
  `email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_user`, `nom`, `password`, `tel`, `cni`, `email`) VALUES
(1, 'russelle', 'cool', 698375118, 0, ''),
(2, 'chritelle', 'cool', 658312548, 0, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD PRIMARY KEY (`id_chambre`);

--
-- Index pour la table `chambreclient`
--
ALTER TABLE `chambreclient`
  ADD PRIMARY KEY (`idchambreClient`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_chambre` (`id_chambre`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `entree`
--
ALTER TABLE `entree`
  ADD PRIMARY KEY (`id_entree`);

--
-- Index pour la table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`id_facture`),
  ADD KEY `fk_client` (`id_client`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id_profil`),
  ADD KEY `fr_user` (`id_user`);

--
-- Index pour la table `sortie`
--
ALTER TABLE `sortie`
  ADD PRIMARY KEY (`id_sortie`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chambre`
--
ALTER TABLE `chambre`
  MODIFY `id_chambre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `chambreclient`
--
ALTER TABLE `chambreclient`
  MODIFY `idchambreClient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `entree`
--
ALTER TABLE `entree`
  MODIFY `id_entree` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `facture`
--
ALTER TABLE `facture`
  MODIFY `id_facture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `profil`
--
ALTER TABLE `profil`
  MODIFY `id_profil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `sortie`
--
ALTER TABLE `sortie`
  MODIFY `id_sortie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chambreclient`
--
ALTER TABLE `chambreclient`
  ADD CONSTRAINT `chambreclient_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `chambreclient_ibfk_2` FOREIGN KEY (`id_chambre`) REFERENCES `chambre` (`id_chambre`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
