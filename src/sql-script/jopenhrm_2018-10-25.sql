# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.30)
# Database: jopenhrm
# Generation Time: 2018-10-25 06:36:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `company_size` varchar(255) DEFAULT NULL,
  `created_date` datetime,
  `update_date` datetime,
  `primary_address_id` bigint(20) DEFAULT NULL,
  `establish_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_company_primary_address_id` (`primary_address_id`),
  CONSTRAINT `fk_company_primary_address_id` FOREIGN KEY (`primary_address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `name`, `logo`, `website`, `fax`, `phone_number`, `company_size`, `created_date`, `update_date`, `primary_address_id`, `establish_date`)
VALUES
	(1,'formos',NULL,NULL,NULL,NULL,'MORE_THAN_10_LESS_THAN_50','2018-10-25 01:12:00','2018-10-25 01:12:00',NULL,NULL),
	(2,'formos',NULL,NULL,NULL,NULL,'MORE_THAN_10_LESS_THAN_50','2018-10-25 01:12:00','2018-10-25 01:12:00',NULL,NULL),
	(3,'formos1',NULL,NULL,NULL,NULL,NULL,'2018-10-25 01:20:00','2018-10-25 01:20:00',NULL,NULL);

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;