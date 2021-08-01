-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 25 juil. 2021 à 16:08
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
    `email` varchar(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  PRIMARY KEY (`id_chambre`),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id_chambre`, `code_chambre`, `categorie`, `prix`, `status`) VALUES
(1, 'A003', 'salle de reunion', 150000, 'libre'),
(2, 'A005', 'salle de reunion', 35000, 'libre'),
(102, 'A002', 'chambre standart', 27000, 'libre'),
(109, 'A006', 'chambre standart', 27000, 'libre'),
(201, 'A007', 'chambre standart', 27000, 'libre'),
(202, 'A007', 'chambre standart', 27000, 'libre'),
(204, 'A007', 'chambre standart', 27000, 'libre'),
(205, 'A008', 'chambre standart', 27000, 'libre'),
(206, 'A009', 'chambre standart', 27000, 'libre'),
(207, 'A0010', 'chambre standart', 27000, 'libre'),
(208, 'A0011', 'chambre standart', 27000, 'libre'),
(209, 'A0012', 'chambre standart', 27000, 'libre'),
(107, 'A0013', 'chambre standart', 27000, 'libre'),
(105, 'A0014', 'chambre standart', 27000, 'libre'),
(103, 'A0015', 'chambre standart', 27000, 'libre'),
(101, 'A001', 'chambre confort', 35000, 'libre'),
(104, 'A0018', 'chambre confort', 35000, 'libre'),
(203, 'A0019', 'chambre confort', 35000, 'libre'),
(210, 'A0020', 'chambre confort', 35000, 'libre'),
(212, 'A0021', 'chambre confort', 35000, 'libre'),
(214, 'A0022', 'chambre confort', 35000, 'libre'),
(301, 'A0023', 'chambre confort', 35000, 'libre'),
(307, 'A0024', 'chambre confort', 35000, 'libre'),
(308, 'A0025', 'chambre confort', 35000, 'libre'),
(303, 'A0026', 'chambre confort', 35000, 'libre'),
(304, 'A0027', 'chambre confort', 35000, 'libre'),
(305, 'A0028', 'chambre confort', 35000, 'libre'),
(306, 'A0016', 'chambre confort', 35000, 'libre'),
(302, 'A0029', 'suite', 60000, 'libre'),
(309, 'A0030', 'suite', 60000, 'libre'),
(310, 'A0031', 'suite', 60000, 'libre');

-- --------------------------------------------------------

--
-- Structure de la table `chambreclient`
--

DROP TABLE IF EXISTS `chambreclient`;
CREATE TABLE IF NOT EXISTS `chambreclient` (
  `idchambreClient` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `id_chambre` int(11) NOT NULL,
  `status_ch` int(11) NOT NULL,
  `montant` float  NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`idchambreClient`),
  `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chambreclient`
--

INSERT INTO `chambreclient` (`idchambreClient`, `id_client`, `id_chambre`, `date`,`id_user`) VALUES
(27, 27, 20, '2021-07-13 09:30:31',1),
(28, 27, 21, '2021-07-13 09:30:31',1),
(29, 27, 7, '2021-07-13 09:30:54',1),
(30, 28, 8, '2021-07-13 14:04:14',1),
(31, 29, 1, '2021-07-13 14:40:19',1),
(32, 29, 1, '2021-07-13 14:40:19',1);

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
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `tel` (`tel`,`cni`),
  `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `tel`, `cni`, `date_ajout`,`id_user`) VALUES
(27, 'CHOMBONG', 'Russelle', 698375118, 123456, '2021-07-13 09:30:31',1),
(28, 'simeu', 'Thibaut', 789456123, 3366995, '2021-07-13 14:04:14',1),
(29, 'totos', 'tatas', 456321789, 157963, '2021-07-13 14:40:19',1);

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
  PRIMARY KEY (`id_commande`),
  `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `nom_commande`, `lieu`, `montant`, `status`, `id_client`, `date_commande`, `nombre`,`id_user`) VALUES
(36, '', 'Restaurant', 700, 0, 28, '2021-07-13 14:04:44', 2,1),
(37, '', 'Linge', 10000, 0, 28, '2021-07-13 14:04:59', 1,1),
(38, '', 'Restaurant', 500, 0, 28, '2021-07-13 14:05:26', 1,1),
(39, '', 'Restaurant', 700, 0, 27, '2021-07-13 14:08:01', 2,1),
(40, '', 'Divers', 500, 0, 27, '2021-07-13 14:09:53', 2,1);

-- --------------------------------------------------------

--
-- Structure de la table `entree`
--

DROP TABLE IF EXISTS `entree`;
CREATE TABLE IF NOT EXISTS `entree` (
  `id_entree` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id_entree`),
    `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entree`
--

INSERT INTO `entree` (`id_entree`, `nom`, `prix`, `date`,`id_user`) VALUES
(1, 'reglement', 500, '2021-07-25 18:01:23',1),
(2, 'reglement', 500, '2021-07-25 18:03:51',1),
(3, 'reglement', 500, '2021-07-25 18:05:13',1);

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
  PRIMARY KEY (`id_facture`),
    `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id_facture`, `reporter`, `reglement`, `total`, `id_client`,`id_user`) VALUES
(21, 16200, 10000, 6200, 27,1),
(22, 24700, 0, 24700, 28,1),
(23, 0, 0, 0, 29,1);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id_profil` int(11) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  `date` datetime NOT NULL,
  PRIMARY KEY (`id_sortie`),
    `id_user` int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `sortie`
--

INSERT INTO `sortie` (`id_sortie`, `libelle`, `prix`, `date`,`id_user`) VALUES
(1, 'Bar', 500, '2021-07-25 18:05:47',1);

-- --------------------------------------------------------


ALTER TABLE `commande` CHANGE `status` `status` BOOLEAN NOT NULL DEFAULT TRUE;
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
