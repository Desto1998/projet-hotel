-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 août 2021 à 22:03
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
-- Base de données : `hotel`
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_chambre`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id_chambre`, `code_chambre`, `categorie`, `prix`, `status`, `created_at`, `updated_at`) VALUES
(1, 'A003', 'salle de reunion', 150000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(2, 'A005', 'salle de reunion', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(101, 'A001', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(102, 'A002', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(103, 'A0015', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(104, 'A0018', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(105, 'A0014', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(107, 'A0013', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(109, 'A006', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(201, 'A007', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(202, 'A007', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(203, 'A0019', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(204, 'A007', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(205, 'A008', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(206, 'A009', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(207, 'A0010', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(208, 'A0011', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-04 10:33:27'),
(209, 'A0012', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-06 23:58:08'),
(210, 'A0020', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(212, 'A0021', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(214, 'A0022', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(301, 'A0023', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(302, 'A0029', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-06 23:38:32'),
(303, 'A0026', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(304, 'A0027', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(305, 'A0028', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-04 10:33:27'),
(306, 'A0016', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(307, 'A0024', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-06 23:48:52'),
(308, 'A0025', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-06 23:58:08'),
(309, 'A0030', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(310, 'A0031', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-04 10:33:27');

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
  `montant` float DEFAULT NULL,
  `date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idchambreClient`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

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
  `date_del` date DEFAULT NULL,
  `lieu_del` varchar(100) DEFAULT NULL,
  `date_nais` varchar(40) DEFAULT NULL,
  `lieu_nais` varchar(100) DEFAULT NULL,
  `date_ajout` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `tel` (`tel`,`cni`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

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
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `id_client` int(11) NOT NULL,
  `date_commande` datetime NOT NULL,
  `nombre` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_commande`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `nom_commande`, `lieu`, `montant`, `status`, `id_client`, `date_commande`, `nombre`, `created_at`, `updated_at`) VALUES
(36, '', 'Restaurant', 700, 0, 28, '2021-07-13 14:04:44', 2, '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(37, '', 'Linge', 10000, 0, 28, '2021-07-13 14:04:59', 1, '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(38, '', 'Restaurant', 500, 0, 28, '2021-07-13 14:05:26', 1, '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(39, '', 'Restaurant', 700, 0, 27, '2021-07-13 14:08:01', 2, '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(40, '', 'Divers', 500, 0, 27, '2021-07-13 14:09:53', 2, '2021-08-03 11:52:05', '2021-08-03 11:52:05');

-- --------------------------------------------------------

--
-- Structure de la table `entree`
--

DROP TABLE IF EXISTS `entree`;
CREATE TABLE IF NOT EXISTS `entree` (
  `id_entree` int(11) NOT NULL AUTO_INCREMENT,
  `bar` int(45) NOT NULL,
  `restaurant` int(11) NOT NULL,
  `divers` int(11) NOT NULL,
  `hebergement` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_entree`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_facture`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id_facture`, `reporter`, `reglement`, `total`, `id_client`, `created_at`, `updated_at`) VALUES
(21, 16200, 10000, 6200, 27, '2021-08-03 11:52:06', '2021-08-03 11:52:06'),
(22, 24700, 0, 24700, 28, '2021-08-03 11:52:06', '2021-08-03 11:52:06'),
(23, 0, 0, 0, 29, '2021-08-03 11:52:06', '2021-08-03 11:52:06');

-- --------------------------------------------------------

--
-- Structure de la table `infosclient`
--

DROP TABLE IF EXISTS `infosclient`;
CREATE TABLE IF NOT EXISTS `infosclient` (
  `id_infosclient` int(11) NOT NULL AUTO_INCREMENT,
  `pays` varchar(100) DEFAULT NULL,
  `nationalite` varchar(100) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `provenance` varchar(100) DEFAULT NULL,
  `matricule` varchar(100) DEFAULT NULL,
  `transport` varchar(255) DEFAULT NULL,
  `nbpersonne` int(11) DEFAULT NULL,
  `date_arrive` date DEFAULT NULL,
  `date_depart` date DEFAULT NULL,
  `date_ajout` datetime NOT NULL,
  `nb_jour` int(11)  NULL,
  `id_client` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_infosclient`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `action` varchar(100) COLLATE utf16_german2_ci NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_commande` int(11) DEFAULT NULL,
  `id_sortie` int(11) DEFAULT NULL,
  `id_entree` int(11) DEFAULT NULL,
  `id_infos` int(11) DEFAULT NULL,
  `id_chambre` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=146 DEFAULT CHARSET=utf16 COLLATE=utf16_german2_ci;

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id_profil` int(11) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id_profil`, `role`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'admin', 1, '2021-08-03 11:52:07', '2021-08-03 11:52:07'),
(2, 'receptioniste', 2, '2021-08-03 11:52:07', '2021-08-03 11:52:07');

-- --------------------------------------------------------

--
-- Structure de la table `sortie`
--

DROP TABLE IF EXISTS `sortie`;
CREATE TABLE IF NOT EXISTS `sortie` (
  `id_sortie` int(11) NOT NULL AUTO_INCREMENT,
  `bar` int(45) NOT NULL,
  `restaurant` int(11) NOT NULL,
  `charge` int(11) NOT NULL,
  `divers` int(11) NOT NULL,
  `hebergement` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sortie`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

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
  `email` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_user`, `nom`, `password`, `tel`, `cni`, `email`, `created_at`, `updated_at`) VALUES
(1, 'russelle', 'cool', 698375118, 0, '', '2021-08-03 11:52:08', '2021-08-03 11:52:08'),
(2, 'chritelle', 'cool', 658312548, 0, '', '2021-08-03 11:52:08', '2021-08-03 11:52:08');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
