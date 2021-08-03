-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 août 2021 à 22:41
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
(208, 'A0011', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-04 00:39:04'),
(209, 'A0012', 'chambre standart', 27000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(210, 'A0020', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(212, 'A0021', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(214, 'A0022', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(301, 'A0023', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(302, 'A0029', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(303, 'A0026', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(304, 'A0027', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(305, 'A0028', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(306, 'A0016', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(307, 'A0024', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-04 00:39:04'),
(308, 'A0025', 'chambre confort', 35000, 'libre', '2021-08-03 11:52:05', '2021-08-04 00:39:04'),
(309, 'A0030', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(310, 'A0031', 'suite', 60000, 'libre', '2021-08-03 11:52:05', '2021-08-04 00:39:04');

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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chambreclient`
--

INSERT INTO `chambreclient` (`idchambreClient`, `id_client`, `id_chambre`, `status_ch`, `montant`, `date`, `created_at`, `updated_at`) VALUES
(27, 27, 20, 0, NULL, '2021-07-13 09:30:31', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(28, 27, 21, 0, NULL, '2021-07-13 09:30:31', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(29, 27, 7, 0, NULL, '2021-07-13 09:30:54', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(30, 28, 8, 0, NULL, '2021-07-13 14:04:14', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(31, 29, 1, 0, NULL, '2021-07-13 14:40:19', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(32, 29, 1, 0, NULL, '2021-07-13 14:40:19', '2021-08-03 11:52:05', '2021-08-03 11:52:05');

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
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `tel`, `cni`, `date_del`, `lieu_del`, `date_nais`, `lieu_nais`, `date_ajout`, `created_at`, `updated_at`) VALUES
(27, 'CHOMBONG', 'Russelle', 698375118, 123456, NULL, NULL, NULL, NULL, '2021-07-13 09:30:31', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(28, 'simeu', 'Thibaut', 789456123, 3366995, NULL, NULL, NULL, NULL, '2021-07-13 14:04:14', '2021-08-03 11:52:05', '2021-08-03 11:52:05'),
(29, 'totos', 'tatas', 456321789, 157963, NULL, NULL, NULL, NULL, '2021-07-13 14:40:19', '2021-08-03 11:52:05', '2021-08-03 11:52:05');

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
  `nom` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_entree`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entree`
--

INSERT INTO `entree` (`id_entree`, `nom`, `prix`, `date`, `created_at`, `updated_at`) VALUES
(1, 'reglement', 500, '2021-07-25 18:01:23', '2021-08-03 11:52:06', '2021-08-03 11:52:06'),
(2, 'reglement', 500, '2021-07-25 18:03:51', '2021-08-03 11:52:06', '2021-08-03 11:52:06'),
(3, 'reglement', 500, '2021-07-25 18:05:13', '2021-08-03 11:52:06', '2021-08-03 11:52:06');

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
  `transport` varchar(255) DEFAULT NULL,
  `nbpersonne` int(11) DEFAULT NULL,
  `date_arrive` date DEFAULT NULL,
  `date_depart` date DEFAULT NULL,
  `date_ajout` datetime NOT NULL,
  `id_client` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_infosclient`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `infosclient`
--

INSERT INTO `infosclient` (`id_infosclient`, `pays`, `nationalite`, `profession`, `destination`, `transport`, `nbpersonne`, `date_arrive`, `date_depart`, `date_ajout`, `id_client`, `created_at`, `updated_at`) VALUES
(56, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-12', '2021-08-21', '2021-08-03 22:48:33', 29, '2021-08-03 20:48:33', '2021-08-03 22:48:33'),
(55, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-26', '2021-08-21', '2021-08-03 22:44:59', 44, '2021-08-03 20:44:59', '2021-08-03 22:44:59'),
(54, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-21', '2021-08-21', '2021-08-03 22:40:02', 43, '2021-08-03 20:40:02', '2021-08-03 22:40:02'),
(53, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-19', '2021-08-29', '2021-08-03 22:37:03', 42, '2021-08-03 20:37:03', '2021-08-03 22:37:03'),
(52, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-11', '2021-08-19', '2021-08-03 22:35:24', 41, '2021-08-03 20:35:24', '2021-08-03 22:35:24'),
(51, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-21', '2021-08-29', '2021-08-03 22:32:11', 40, '2021-08-03 20:32:11', '2021-08-03 22:32:11'),
(57, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-09-04', '2021-08-28', '2021-08-03 22:53:20', 45, '2021-08-03 20:53:20', '2021-08-03 22:53:20'),
(58, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-22', '2021-08-28', '2021-08-03 22:58:21', 45, '2021-08-03 20:58:21', '2021-08-03 22:58:21'),
(59, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 2, '2021-08-21', '2021-08-27', '2021-08-03 23:00:22', 46, '2021-08-03 21:00:22', '2021-08-03 23:00:22'),
(60, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-20', '2021-09-03', '2021-08-03 23:05:12', 47, '2021-08-03 21:05:12', '2021-08-03 23:05:12'),
(61, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-20', '2021-08-27', '2021-08-03 23:06:48', 48, '2021-08-03 21:06:48', '2021-08-03 23:06:48'),
(62, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 45, '2021-08-21', '2021-09-05', '2021-08-03 23:12:24', 49, '2021-08-03 21:12:24', '2021-08-03 23:12:24'),
(63, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 2, '2021-08-18', '2021-08-28', '2021-08-03 23:15:44', 50, '2021-08-03 21:15:44', '2021-08-03 23:15:44'),
(64, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-20', '2021-08-28', '2021-08-03 23:33:33', 51, '2021-08-03 21:33:33', '2021-08-03 23:33:33'),
(65, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-19', '2021-08-20', '2021-08-03 23:42:05', 51, '2021-08-03 21:42:05', '2021-08-03 23:42:05'),
(66, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-13', '2021-08-21', '2021-08-03 00:06:38', 51, '2021-08-03 22:06:38', '2021-08-04 00:06:38'),
(67, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-13', '2021-08-21', '2021-08-03 00:07:40', 51, '2021-08-03 22:07:40', '2021-08-04 00:07:40'),
(68, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-28', '2021-09-04', '2021-08-03 00:16:17', 52, '2021-08-03 22:16:17', '2021-08-04 00:16:17'),
(69, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-28', '2021-08-22', '2021-08-03 00:17:24', 53, '2021-08-03 22:17:24', '2021-08-04 00:17:24'),
(70, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-28', '2021-08-21', '2021-08-03 00:23:23', 53, '2021-08-03 22:23:23', '2021-08-04 00:23:23'),
(71, 'cameroun', 'camerounaise', 'enseignant', 'bafoussam', 'voiture', 1, '2021-08-28', '2021-08-27', '2021-08-03 00:25:52', 54, '2021-08-03 22:25:52', '2021-08-04 00:25:52');

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
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf16 COLLATE=utf16_german2_ci;

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
  `libelle` varchar(45) NOT NULL,
  `prix` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sortie`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `sortie`
--

INSERT INTO `sortie` (`id_sortie`, `libelle`, `prix`, `date`, `created_at`, `updated_at`) VALUES
(1, 'Bar', 500, '2021-07-25 18:05:47', '2021-08-03 11:52:07', '2021-08-03 11:52:07');

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
