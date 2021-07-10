-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 10 juil. 2021 à 10:53
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hotels`
--

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

DROP TABLE IF EXISTS `chambre`;
CREATE TABLE IF NOT EXISTS `chambre` (
  `id_chambre` int(11) NOT NULL AUTO_INCREMENT,
  `code_chambre` varchar(50) NOT NULL,
  `categorie` varchar(45) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id_chambre`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id_chambre`, `code_chambre`, `categorie`, `prix`, `status`) VALUES
(1, 'A001', 'climatise', 35000, 'libre'),
(2, 'A002', 'chambre standart', 27000, 'libre'),
(3, 'A003', 'salle de reunion', 16000, 'libre'),
(4, 'A004', 'chambre double', 3000, 'occupé'),
(5, 'A005', 'salle de reunion', 16000, 'libre'),
(6, 'A006', 'chambre standart', 27000, 'libre'),
(7, 'A007', 'chambre standart', 27000, 'libre'),
(8, 'A007', 'chambre standart', 27000, 'libre'),
(9, 'A007', 'chambre standart', 27000, 'libre'),
(10, 'A008', 'chambre standart', 27000, 'libre'),
(11, 'A009', 'chambre standart', 27000, 'libre'),
(12, 'A0010', 'chambre standart', 27000, 'libre'),
(13, 'A0011', 'chambre standart', 27000, 'libre'),
(14, 'A0012', 'chambre standart', 27000, 'libre'),
(15, 'A0013', 'chambre standart', 27000, 'libre'),
(16, 'A0014', 'chambre standart', 27000, 'libre'),
(17, 'A0015', 'chambre standart', 27000, 'libre'),
(18, 'A0016', 'chambre standart', 27000, 'libre'),
(19, 'A0017', 'chambre standart', 27000, 'libre'),
(20, 'A0018', 'climatise', 35000, 'libre'),
(21, 'A0019', 'climatise', 35000, 'libre'),
(22, 'A0020', 'climatise', 35000, 'libre'),
(23, 'A0021', 'climatise', 35000, 'libre'),
(24, 'A0022', 'climatise', 35000, 'libre'),
(25, 'A0023', 'climatise', 35000, 'libre'),
(26, 'A0024', 'climatise', 35000, 'libre'),
(27, 'A0025', 'climatise', 35000, 'libre'),
(28, 'A0026', 'climatise', 35000, 'libre'),
(29, 'A0027', 'climatise', 35000, 'libre'),
(30, 'A0028', 'climatise', 35000, 'libre'),
(31, 'A0029', 'appartement', 16000, 'libre'),
(32, 'A0030', 'appartement', 16000, 'libre'),
(33, 'A0031', 'appartement', 16000, 'libre');

-- --------------------------------------------------------

--
-- Structure de la table `chambreclient`
--

DROP TABLE IF EXISTS `chambreclient`;
CREATE TABLE IF NOT EXISTS `chambreclient` (
  `idchambreClient` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `id_chambre` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`idchambreClient`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chambreclient`
--

INSERT INTO `chambreclient` (`idchambreClient`, `id_client`, `id_chambre`, `date`) VALUES
(6, 9, 1, '2021-06-20 14:33:55'),
(7, 10, 4, '2021-06-20 14:34:31'),
(8, 11, 5, '2021-06-20 14:42:02'),
(9, 12, 2, '2021-06-20 14:44:14'),
(11, 12, 1, '2021-06-29 01:22:50');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `tel` int(11) NOT NULL,
  `cni` int(11) NOT NULL,
  `date_ajout` datetime NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `tel`, `cni`, `date_ajout`) VALUES
(11, 'Russelle', 'SILATCHA CHOMBONG', 699552886, 336618, '2021-06-20 14:42:02'),
(10, 'Sila', 'Russelle', 698375118, 33661, '2021-06-20 14:34:31'),
(9, 'CHOMBONG', 'Russelle', 698375118, 123456, '2021-06-20 14:33:55'),
(12, 'simeu', 'Thibaut', 661860171, 5646, '2021-06-29 14:44:14');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int(11) NOT NULL AUTO_INCREMENT,
  `nom_commande` varchar(255) DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id_client` int(11) NOT NULL,
  `date_commande` datetime NOT NULL,
  `nombre` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_commande`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `nom_commande`, `lieu`, `montant`, `status`, `id_client`, `date_commande`, `nombre`) VALUES
(1, 'whisky', 'Restaurant', 40000, 0, 10, '2021-06-20 01:01:18', 4),
(2, 'poisson', 'chambre', 1000, 0, 11, '2021-06-20 11:10:35', 3),
(3, 'habit', 'Linge', 3000, 0, 12, '2021-06-20 11:10:35', 3),
(4, 'ampoule', 'Divers', 500, 0, 9, '2021-06-20 11:12:35', 1),
(16, '', 'divers', 700, 0, 9, '2021-06-09 04:02:46', 2);

-- --------------------------------------------------------

--
-- Structure de la table `entree`
--

DROP TABLE IF EXISTS `entree`;
CREATE TABLE IF NOT EXISTS `entree` (
  `id_entree` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_entree`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

DROP TABLE IF EXISTS `facture`;
CREATE TABLE IF NOT EXISTS `facture` (
  `id_facture` int(11) NOT NULL AUTO_INCREMENT,
  `reporter` float NOT NULL,
  `reglement` float NOT NULL,
  `total` float NOT NULL,
  `id_client` int(11) NOT NULL,
  PRIMARY KEY (`id_facture`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id_facture`, `reporter`, `reglement`, `total`, `id_client`) VALUES
(1, 2400, 4, 2398, 9);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
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

DROP TABLE IF EXISTS `sortie`;
CREATE TABLE IF NOT EXISTS `sortie` (
  `id_sortie` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_sortie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
