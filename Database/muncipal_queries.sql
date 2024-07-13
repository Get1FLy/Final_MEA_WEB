-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: muncipal
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `queries`
--

DROP TABLE IF EXISTS `queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `queries` (
  `msg_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `text` varchar(300) DEFAULT NULL,
  `ask_date` date DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queries`
--

LOCK TABLES `queries` WRITE;
/*!40000 ALTER TABLE `queries` DISABLE KEYS */;
INSERT INTO `queries` VALUES (1,105,'Who is developing this website ? ','2024-03-08',1),(2,105,'Which Company ? ','2024-03-08',1),(3,105,'Good Night','2024-03-08',1),(4,100,'How are you ? ','2024-03-08',1),(5,100,'New Query is asked ?','2024-03-09',1),(6,105,'How is looking ? ','2024-03-09',1),(7,105,'Just Added the react sonnar','2024-03-09',1),(8,109,'I am new here','2024-03-09',1),(9,100,'Regarding checking the query ','2024-03-09',1),(10,101,'How are you ? ','2024-05-03',1),(11,105,'I want to know about the new system ??','2024-06-03',1),(12,105,'Another test Query','2024-06-07',1),(13,105,'How are you ? ','2024-06-07',1),(14,105,'Another test Query 2','2024-06-07',1),(15,105,'new doubt','2024-06-07',0),(16,105,'here is my first doubt about these website ? ','2024-06-07',0),(17,105,'here is my first doubt about these website ? ','2024-06-07',0),(18,105,'Another test Query','2024-06-07',0),(19,105,'here is my first doubt about these website ? ','2024-06-07',0),(20,105,'new doubt','2024-06-07',0),(21,105,'here is my first doubt about these website ? ','2024-06-07',0),(22,105,'here is my first doubt about these website ? ','2024-06-07',0),(23,105,'ff','2024-06-07',0),(24,105,'Another test Query','2024-06-07',0),(25,105,'Another last query','2024-06-07',0),(26,105,'Another test Query','2024-06-07',0),(27,105,'Who has developed this wonderful website ? ','2024-06-07',0),(28,105,'new doubt','2024-06-07',0),(29,105,'Who is developing this website ? ','2024-06-07',0),(30,105,'Another test Query','2024-06-07',0),(31,105,'Who is developing this website ? ','2024-06-07',0),(32,105,'Who is developing this website ? ','2024-06-07',0);
/*!40000 ALTER TABLE `queries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-13 20:27:33
