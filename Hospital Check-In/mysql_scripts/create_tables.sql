# ************************************************************
# Sequel Pro SQL dump
# Version 5102
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25-0ubuntu0.18.04.2)
# Database: cosc457_final
# Generation Time: 2019-05-01 18:48:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table address
# ------------------------------------------------------------

CREATE TABLE `address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(255) NOT NULL DEFAULT '',
  `street2` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(2) NOT NULL DEFAULT '',
  `postal_code` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table bill
# ------------------------------------------------------------

CREATE TABLE `bill` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,0) unsigned NOT NULL,
  `date` date NOT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table check_in
# ------------------------------------------------------------

CREATE TABLE `check_in` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `receptionist_id` int(10) unsigned NOT NULL,
  `room_number` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `receptionist_id` (`receptionist_id`),
  CONSTRAINT `check_in_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `check_in_ibfk_2` FOREIGN KEY (`receptionist_id`) REFERENCES `receptionist` (`id`) ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table check_out
# ------------------------------------------------------------

CREATE TABLE `check_out` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `receptionist_id` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `receptionist_id` (`receptionist_id`),
  CONSTRAINT `check_out_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `check_out_ibfk_2` FOREIGN KEY (`receptionist_id`) REFERENCES `receptionist` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table diagnosis
# ------------------------------------------------------------

CREATE TABLE `diagnosis` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `diagnosis` varchar(255) NOT NULL DEFAULT '',
  `date` date NOT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table doctor
# ------------------------------------------------------------

CREATE TABLE `doctor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `speciality` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table guardian
# ------------------------------------------------------------

CREATE TABLE `guardian` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone_number` varchar(10) NOT NULL DEFAULT '',
  `address_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `guardian_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `guardian_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table insurance
# ------------------------------------------------------------

CREATE TABLE `insurance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `provider_name` varchar(255) NOT NULL DEFAULT '',
  `member_id` varchar(255) NOT NULL DEFAULT '',
  `group_id` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table law_enforcement_officer
# ------------------------------------------------------------

CREATE TABLE `law_enforcement_officer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone_number` varchar(10) NOT NULL DEFAULT '',
  `precinct` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lawyer
# ------------------------------------------------------------

CREATE TABLE `lawyer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `law_office` varchar(255) NOT NULL DEFAULT '',
  `phone_number` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table nurse
# ------------------------------------------------------------

CREATE TABLE `nurse` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table patient
# ------------------------------------------------------------

CREATE TABLE `patient` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone_number` varchar(10) NOT NULL DEFAULT '',
  `address_id` int(10) unsigned NOT NULL,
  `primary_insurance_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `primary_insurance_id` (`primary_insurance_id`),
  CONSTRAINT `patient_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `patient_ibfk_3` FOREIGN KEY (`primary_insurance_id`) REFERENCES `insurance` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table pharmacy
# ------------------------------------------------------------

CREATE TABLE `pharmacy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone_number` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  CONSTRAINT `pharmacy_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table prescription
# ------------------------------------------------------------

CREATE TABLE `prescription` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `patient_id` int(10) unsigned DEFAULT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `pharmacy_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`id`) REFERENCES `doctor` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `prescription_ibfk_3` FOREIGN KEY (`id`) REFERENCES `pharmacy` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table receptionist
# ------------------------------------------------------------

CREATE TABLE `receptionist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
