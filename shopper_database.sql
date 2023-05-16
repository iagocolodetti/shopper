CREATE DATABASE  IF NOT EXISTS `shopper` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopper`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: shopper
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `packs`
--

DROP TABLE IF EXISTS `packs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pack_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `qty` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pack_id` (`pack_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `packs_ibfk_1` FOREIGN KEY (`pack_id`) REFERENCES `products` (`code`),
  CONSTRAINT `packs_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packs`
--

LOCK TABLES `packs` WRITE;
/*!40000 ALTER TABLE `packs` DISABLE KEYS */;
INSERT INTO `packs` VALUES (1,1000,18,6),(2,1010,24,1),(3,1010,26,1),(4,1020,19,3),(5,1020,21,3);
/*!40000 ALTER TABLE `packs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `code` bigint NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost_price` decimal(9,2) NOT NULL,
  `sales_price` decimal(9,2) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (16,'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',18.44,20.49),(18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99),(19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29),(20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79),(21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71),(22,'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',6.74,7.49),(23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39),(24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99),(26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79),(1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94),(1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78),(1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-13 17:20:39
