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

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;

INSERT INTO `address` (`id`, `street`, `street2`, `state`, `postal_code`)
VALUES
	(9001,'111 Pain Way','N/A','MD',21078),
	(9002,'2 Ouch Ave','N/A','DE',21001),
	(9003,'333 Ouchie Apts','APT D','MD',21014),
	(9004,'4444 Impale Road','N/A','PA',22393),
	(9005,'55 Enflamed Way','N/A','NJ',41853),
	(9006,'666 Ouchie Apts','APT F','PA',33155),
	(9007,'777 Hypo Road','N/A','DE',21001),
	(9008,'8 Oof Apts','APT 3F','DE',21001),
	(9009,'999999 Nein Blvd','N/A','MD',21078),
	(9010,'10101 Binary St','N/A','MD',21014),
	(9011,'111 Pain Way','N/A','MD',21078),
	(9012,'223 Electric Apts','APT B','CA',21014),
	(9013,'333 Ouchie Apts','APT D','MD',21014),
	(9014,'4478 Fourth Ave','N/A','PA',21014),
	(9015,'55 Enflamed Way','N/A','NJ',41853),
	(9016,'6655 Road','N/A','MD',21014),
	(9017,'777 Hypo Road','N/A','DE',21001),
	(9018,'888888 8th St','N/A','VA',22158),
	(9019,'999999 Nein Blvd','N/A','MD',21078),
	(9020,'10101 Binary St','N/A','MD',21014),
	(9021,'2121 Business Way','N/A','MD',21111),
	(9022,'22 Pharmacy Street','N/A','DE',22222),
	(9023,'3345 Binary St','N/A','MD',21014),
	(9024,'44 Fourth Ave','N/A','NJ',22333),
	(9025,'55 Fiverr Way','N/A','DE',78956);

/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bill
# ------------------------------------------------------------

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;

INSERT INTO `bill` (`id`, `amount`, `date`, `patient_id`)
VALUES
	(7001,110011,'2019-01-11',1001),
	(7002,2008,'2019-02-02',1002),
	(7003,300000,'2016-03-30',1003),
	(7004,40,'2019-04-24',1004),
	(7005,556,'2018-04-15',1005),
	(7006,6000667,'2003-02-26',1006),
	(7007,70001,'2018-12-17',1007),
	(7008,8001,'2017-08-18',1008),
	(7009,10,'2019-07-24',1009),
	(7010,10101011,'1999-01-01',1010);

/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table check_in
# ------------------------------------------------------------

LOCK TABLES `check_in` WRITE;
/*!40000 ALTER TABLE `check_in` DISABLE KEYS */;

INSERT INTO `check_in` (`id`, `patient_id`, `receptionist_id`, `room_number`, `date`, `notes`)
VALUES
	(14001,1001,3001,101,'2019-01-11 00:00:00','Patient Belligerent'),
	(14002,1002,3002,102,'2019-01-26 00:00:00','Patient Disagreeable'),
	(14003,1003,3002,302,'2016-03-25 00:00:00','Patient is a Cutie'),
	(14004,1004,3003,124,'2019-04-01 00:00:00','Patient Seems Idiotic'),
	(14005,1005,3005,472,'2018-03-25 00:00:00','Patient Has Swollen Mouth'),
	(14006,1006,3001,102,'2003-02-01 00:00:00','Patient is Unintelligible'),
	(14007,1007,3001,8,'2018-11-04 00:00:00','Patient is Limping'),
	(14008,1008,3002,472,'2017-07-15 00:00:00','Patient Cant See'),
	(14009,1009,3004,4,'2019-06-28 00:00:00','Patient Might Not Make It'),
	(14010,1010,3004,123,'1998-12-31 00:00:00','Holy Crap');

/*!40000 ALTER TABLE `check_in` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table check_out
# ------------------------------------------------------------

LOCK TABLES `check_out` WRITE;
/*!40000 ALTER TABLE `check_out` DISABLE KEYS */;

INSERT INTO `check_out` (`id`, `patient_id`, `receptionist_id`, `date`, `notes`)
VALUES
	(15001,1001,3003,'2019-01-12 00:00:00','Patient Seems Grateful'),
	(15002,1002,3004,'2019-01-28 00:00:00','Patient Slightly More Agreeable'),
	(15003,1003,3005,'2016-04-10 00:00:00','Patient Still a Cutie'),
	(15004,1004,3001,'2019-04-27 00:00:00','Patient has no Change in Intelligence'),
	(15005,1005,3002,'2018-04-20 00:00:00','Patient Now Only Has Big Mouth'),
	(15006,1006,3004,'2003-02-27 00:00:00','Patient Is Understandable'),
	(15007,1007,3002,'2018-12-03 00:00:00','Patient is Skipping'),
	(15008,1008,3003,'2017-07-29 00:00:00','Patient Can now See'),
	(15009,1009,3004,'2019-07-27 00:00:00','Patient Somehow Pulled Through'),
	(15010,1010,3003,'2000-12-15 00:00:00','He ded');

/*!40000 ALTER TABLE `check_out` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table diagnosis
# ------------------------------------------------------------

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;

INSERT INTO `diagnosis` (`id`, `diagnosis`, `date`, `patient_id`)
VALUES
	(10001,'Crybaby Sydrome','2019-01-11',1001),
	(10002,'Crybaby Sydrome','2019-01-27',1002),
	(10003,'Hurt Feelings','2016-03-30',1003),
	(10004,'Injured Butt','2019-04-03',1004),
	(10005,'Impacted Wisdom Tooth','2018-04-02',1005),
	(10006,'Crybaby Sydrome','2003-02-15',1006),
	(10007,'Ingrown Toenail','2018-11-28',1007),
	(10008,'Blindness','2017-07-21',1008),
	(10009,'Hurt Feelings','2019-07-01',1009),
	(10010,'Totally F@#*-ed','1999-01-01',1010);

/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table doctor
# ------------------------------------------------------------

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;

INSERT INTO `doctor` (`id`, `name`, `speciality`)
VALUES
	(5001,'Grylls_Bear','Urologist'),
	(5002,'Coff_Turnheadn','Proctologist'),
	(5003,'Seven_Threetoa','Plastic Surgery');

/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table guardian
# ------------------------------------------------------------

LOCK TABLES `guardian` WRITE;
/*!40000 ALTER TABLE `guardian` DISABLE KEYS */;

INSERT INTO `guardian` (`id`, `patient_id`, `name`, `phone_number`, `address_id`)
VALUES
	(2001,1001,'Doe_Misses','1101101110',9011),
	(2002,1002,'Doe_Mister','2202202220',9012),
	(2003,1003,'Smoth_Jane','3303303330',9013),
	(2004,1004,'Butz_Fixed','4404404440',9014),
	(2005,1005,'N/A','N/A',9015),
	(2006,1006,'Pain_Wasin','6606606660',9016),
	(2007,1007,'Shorts_Danny','7707707770',9017),
	(2008,1008,'Doe_John','8808808880',9018),
	(2009,1009,'Eye_White','9909901199',9019),
	(2010,1010,'N/A','N/A',9020);

/*!40000 ALTER TABLE `guardian` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table insurance
# ------------------------------------------------------------

LOCK TABLES `insurance` WRITE;
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;

INSERT INTO `insurance` (`id`, `patient_id`, `provider_name`, `member_id`, `group_id`)
VALUES
	(8001,1001,'FixU','1234','4321'),
	(8002,1002,'Hurtless','2345','5432'),
	(8003,1003,'FixU','3456','6543'),
	(8004,1004,'GreenCross','4567','7654'),
	(8005,1005,'Hurtless','5678','8765'),
	(8006,1006,'FixU','6789','9876'),
	(8007,1007,'Cheapskate','7890','0987'),
	(8008,1008,'FixU','8910','1098'),
	(8009,1009,'GreenCross','9101','1019'),
	(8010,1010,'GreenCross','1010','1010');

/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table law_enforcement_officer
# ------------------------------------------------------------

LOCK TABLES `law_enforcement_officer` WRITE;
/*!40000 ALTER TABLE `law_enforcement_officer` DISABLE KEYS */;

INSERT INTO `law_enforcement_officer` (`id`, `name`, `phone_number`, `precinct`)
VALUES
	(11001,'Selleck_Tom','1011111001','State Trooper'),
	(11002,'Estrada_Erik','2022222002','State Trooper'),
	(11003,'Chief_Big','3033333003','Sherriffs Office');

/*!40000 ALTER TABLE `law_enforcement_officer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lawyer
# ------------------------------------------------------------

LOCK TABLES `lawyer` WRITE;
/*!40000 ALTER TABLE `lawyer` DISABLE KEYS */;

INSERT INTO `lawyer` (`id`, `name`, `law_office`, `phone_number`)
VALUES
	(6001,'U_Sue','Goldberg and Ginsberg','1001111000'),
	(6002,'Schwarz_Dan','Schwarz, Schwartz, and Schwarz','2002222000'),
	(6003,'Law_Johnny','Goldberg and Ginsberg','3003333000'),
	(6004,'Howard_Moe','Howard, Fine, and Howard','4004444000'),
	(6005,'Goodman_Saul','Honest Jimmys','5005555000');

/*!40000 ALTER TABLE `lawyer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table nurse
# ------------------------------------------------------------

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;

INSERT INTO `nurse` (`id`, `name`)
VALUES
	(4001,'Prod_Pokenn'),
	(4002,'Em_Stick'),
	(4003,'Letter_Blood'),
	(4004,'Tootight_Scrubs'),
	(4005,'Mann_Mister');

/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table patient
# ------------------------------------------------------------

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;

INSERT INTO `patient` (`id`, `name`, `phone_number`, `address_id`, `primary_insurance_id`)
VALUES
	(1001,'Doe_John','1111111111',9001,8001),
	(1002,'Doe_Jimmy','222222222',9002,8002),
	(1003,'Smith_Jane','333333333',9003,8003),
	(1004,'Butz_Injured','444444444',9004,8004),
	(1005,'Toof_Sore','5555555555',9005,8005),
	(1006,'Pain_Imman','6666666666',9006,8006),
	(1007,'Toh_Stubbed','7777777777',9007,8007),
	(1008,'Eye_Black','8888888888',9008,8008),
	(1009,'Ded_Mostly','9999999999',9009,8009),
	(1010,'Ded_Allthaway','0100101010',9010,8010);

/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pharmacy
# ------------------------------------------------------------

LOCK TABLES `pharmacy` WRITE;
/*!40000 ALTER TABLE `pharmacy` DISABLE KEYS */;

INSERT INTO `pharmacy` (`id`, `address_id`, `name`, `phone_number`)
VALUES
	(12001,9021,'Drugs R Us','1001001111'),
	(12002,9022,'Pharm-Ex','2002002222'),
	(12003,9023,'Best In Town','3003003333'),
	(12004,9024,'Your Local Dealer','4004004444'),
	(12005,9025,'Feel Good Inc.','5005005555');

/*!40000 ALTER TABLE `pharmacy` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table prescription
# ------------------------------------------------------------

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;

INSERT INTO `prescription` (`id`, `name`, `patient_id`, `doctor_id`, `pharmacy_id`)
VALUES
	(13001,'Liquid Spine',1001,5001,12003),
	(13002,'Liquid Spine',1002,5002,12005),
	(13003,'Hydrocodone',1003,5002,12004),
	(13004,'Healing Suppository',1004,5003,12002),
	(13005,'Hydrocodone',1005,5003,12001),
	(13006,'Hydrocodone',1006,5003,12001),
	(13007,'Antivirals',1007,5003,12002),
	(13008,'Eye Drops',1008,5003,12005),
	(13009,'Vicoden',1008,5001,12005),
	(13010,'N/A',10010,5002,12003);

/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table receptionist
# ------------------------------------------------------------

LOCK TABLES `receptionist` WRITE;
/*!40000 ALTER TABLE `receptionist` DISABLE KEYS */;

INSERT INTO `receptionist` (`id`, `name`)
VALUES
	(3001,'Johnson_Loretta'),
	(3002,'Longnails_Sarah'),
	(3003,'Smacker_Gum'),
	(3004,'Break_Isonn'),
	(3005,'Job_Notmy');

/*!40000 ALTER TABLE `receptionist` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
