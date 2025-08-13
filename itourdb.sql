-- MySQL dump 10.13  Distrib 8.4.6, for Linux (x86_64)
--
-- Host: localhost    Database: itourdb
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `guide_id` bigint unsigned NOT NULL,
  `registration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cars_registration_unique` (`registration`),
  KEY `cars_guide_id_foreign` (`guide_id`),
  CONSTRAINT `cars_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,40,'17-CC-56','Mercedes','Tourer','Green','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(2,41,'37-TB-84','Land-Rover','Defender','Grey','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(3,42,'60-ZX-75','BMW','Sedan','Blue','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(4,43,'14-AL-69','BMW','X1 Drive','Green','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(5,44,'31-RF-40','SEAT','Alhambra','Blue','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(6,45,'32-EQ-75','BMW','X1 Drive','Red','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(7,46,'77-YL-85','BMW','X1 Drive','White','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(8,47,'61-WX-69','Mercedes-Benz','G-Class','Red','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(9,48,'45-PQ-75','BMW','X1 Drive','Blue','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(10,49,'82-XR-68','Mercedes','Cabrio','Grey','Premium','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(11,50,'31-TI-71','BMW','Sedan','Green','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(12,51,'81-QQ-93','Hyundai','Elantra','Blue','Economic','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(13,52,'36-PQ-56','Mercedes-Benz','G-Class','Blue','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(14,53,'11-GX-23','Dacia','Spring','Blue','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(15,54,'85-HV-23','Honda','Civic','White','Economic','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(16,55,'36-BN-14','Fiat','Grande Panda','White','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(17,56,'41-VA-20','Volvo','EX30','Black','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(18,57,'12-LI-26','SEAT','Alhambra','Red','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(19,58,'85-BZ-41','SEAT','Alhambra','Blue','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(20,59,'88-UX-24','BMW','X1 Drive','Black','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(23,81,'AA-22-22','Honda','Civic','Grey','',NULL,NULL,5,'Great car for everyone!'),(24,83,'AA-33-00','Mercedes','GLA','Blue','',NULL,NULL,5,'Perfect for your dream vacations!'),(25,84,'AA-44-44','Fiat','500','Grey','',NULL,NULL,5,'Awesome!'),(26,85,'AA-33-AA','Opel','Corsa','Blue','',NULL,NULL,5,'A great car for your and your family!'),(27,88,'AA-44-AA','Opel','Corsa','Blue','',NULL,NULL,5,''),(38,113,'RR-55-RR','Mercedes','GLA','Black','',NULL,NULL,5,'');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_07_24_124600_create_cars_table',1),(5,'2025_07_24_124609_create_places_table',1),(6,'2025_07_24_124615_create_tours_table',1),(7,'2025_07_24_124715_create_visits_table',1),(8,'2025_07_25_093423_create_works_table',1),(9,'2025_07_25_093547_create_reservations_table',1),(10,'2025_07_25_094138_create_stops_table',1),(11,'2025_07_29_082916_create_personal_access_tokens_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Fajã dos Padres',32.6569092,-17.0217725,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(2,'Cabo Girão',32.6554974,-17.0042461,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(3,'Paul da Serra',32.7333325,-17.05,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(4,'Miradouro Fonte do Bispo',32.7916168,-17.1813683,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(5,'PR6 - Levada das 25 Fontes',32.761631,-17.1343465,'Levada','2025-07-29 09:32:55','2025-07-29 09:32:55'),(6,'PR6.2 - Levada do Alecrim',32.7535642,-17.132658,'Levada','2025-07-29 09:32:55','2025-07-29 09:32:55'),(7,'Sé Catedral do Funchal',32.648131,-16.9082826,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(8,'Santuário de Nossa Senhora do Monte',32.6760681,-16.9025329,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(9,'Zona Histórica do Funchal',32.6481837,-16.9067224,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(10,'Jardim Botânico da Madeira',32.6624106,-16.8973293,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(11,'Monte Palace Madeira',32.6755872,-16.9030891,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(12,'Mercado dos Lavradores',32.6486355,-16.9066781,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(13,'Palácio de São Lourenço',32.6473681,-16.9121891,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(14,'Praia da Barreirinha',32.646777,-16.9000236,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(15,'Porto de Câmara de Lobos',32.6474273,-16.9775258,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(16,'Museu Etnográfico da Madeira',32.6729365,-17.0659599,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(17,'Miradouro do Cascalho',32.6831628,-17.0941049,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(18,'Praia da Calheta',32.7203533,-17.1808888,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(19,'Cascata dos Anjos',32.6866444,-17.1163981,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(20,'Paúl do Mar',32.7594054,-17.2403277,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(21,'Farol da Ponta do Pargo',32.8141632,-17.2629651,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(22,'Miradouro do Rabaçal',32.7555468,-17.1368435,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(23,'Praia do Porto do Seixal',32.8243261,-17.1191889,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(24,'Miradouro do Véu da Noiva',32.8161303,-17.0951768,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(25,'Lagoa do Vento',32.7599331,-17.1244598,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(26,'Praia do Garajau',32.6384505,-16.8554634,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(27,'Parque Florestal do Fanal',32.8096186,-17.1464375,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(28,'Cristo Rei do Garajau',32.6385112,-16.8505668,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(29,'Miradouro da Eira do Serrado',32.7101168,-16.968313,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(30,'Pico do Areeiro',32.7355555,-16.928889,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(31,'Miradouro do Ninho da Manta',32.73938,-16.9364293,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(32,'Ribeiro Frio',32.7333325,-16.883333,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(33,'PR11 - Levada dos Balcões',32.7355351,-16.8889498,'Levada','2025-07-29 09:32:56','2025-07-29 09:32:56'),(34,'Miradouro dos Balcões',32.741563,-16.8928561,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(35,'Ponta de São Lourenço',32.7433741,-16.7035143,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(36,'Miradouro da Ponta do Rosto',32.7504235,-16.7103563,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(37,'Prainha do Caniçal',32.7429043,-16.7366545,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(38,'Museu da Baleia da Madeira',32.7358335,-16.7430505,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(39,'Casas Típicas de Santana',32.8057436,-16.8864322,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(40,'Parque Florestal das Queimadas',32.7835011,-16.9084632,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(41,'PR9 - Levada do Caldeirão Verde',32.7823286,-16.904947,'Levada','2025-07-29 09:32:56','2025-07-29 09:32:56'),(42,'Praia do Faial',32.7923549,-16.8705636,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(43,'Ruínas de São Jorge',32.8298951,-16.9002617,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(44,'Miradouro da Beira da Quinta',32.8265907,-16.9415523,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(45,'Complexo Balnear da Ponta Delgada',32.8277861,-16.9874114,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(46,'Capela dos Reis Magos',32.8269424,-16.9889235,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(47,'Solar do Aposento',32.8222849,-16.9915008,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(48,'Piscinas Naturais do Porto Moniz',32.8682755,-17.1712129,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(49,'Funchal',32.6669,-16.9241,'other',NULL,NULL),(50,'Santa Cruz',32.6874768,-16.7912062,'other',NULL,NULL),(51,'Machico',32.7169,-16.7669,'other',NULL,NULL),(52,'Santana',32.8019,-16.8819,'other',NULL,NULL),(53,'São Vicente',32.8022756,-17.0472397,'other',NULL,NULL),(54,'Porto Moniz',32.8669,-17.1319,'other',NULL,NULL),(55,'Calheta',32.7219,-17.1719,'other',NULL,NULL),(56,'Ponta do Sol',32.6919,-17.1019,'other',NULL,NULL),(57,'Ribeira Brava',32.6769,-17.0669,'other',NULL,NULL),(58,'Câmara de Lobos',32.6483323,-16.9763096,'other',NULL,NULL);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tour_id` bigint unsigned NOT NULL,
  `guide_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `rating_tour` int DEFAULT NULL,
  `rating_guide` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selected_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservations_tour_id_foreign` (`tour_id`),
  KEY `reservations_guide_id_foreign` (`guide_id`),
  KEY `reservations_user_id_foreign` (`user_id`),
  CONSTRAINT `reservations_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_tour_id_foreign` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_rating_guide` CHECK ((`rating_guide` between 0 and 50)),
  CONSTRAINT `chk_rating_tour` CHECK ((`rating_tour` between 0 and 50))
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (2,12,59,1,39,46,'2025-03-07 23:18:51','0000-00-00 00:00:00','confirmed','2025-04-28 07:09:52'),(3,7,60,1,37,35,'2025-02-02 03:34:37','0000-00-00 00:00:00','confirmed','2025-02-28 06:02:18'),(4,10,49,2,41,50,'2025-03-27 14:02:54','0000-00-00 00:00:00','confirmed','2025-04-21 09:20:19'),(5,3,58,2,47,39,'2025-01-19 01:01:21','0000-00-00 00:00:00','confirmed','2025-02-17 09:06:41'),(6,12,48,2,39,47,'2025-02-08 18:41:11','0000-00-00 00:00:00','confirmed','2025-04-28 22:11:05'),(7,2,41,3,40,36,'2025-02-03 19:48:15','0000-00-00 00:00:00','confirmed','2025-05-30 16:19:07'),(8,6,50,3,43,50,'2025-01-06 09:00:51','0000-00-00 00:00:00','confirmed','2025-07-08 10:29:37'),(9,7,60,3,48,47,'2025-01-22 23:19:25','0000-00-00 00:00:00','confirmed','2025-06-18 18:38:21'),(10,8,85,3,49,39,'2025-05-27 14:20:01','0000-00-00 00:00:00','confirmed','2025-07-14 04:29:58'),(11,4,44,4,39,50,'2025-06-21 04:18:15','0000-00-00 00:00:00','confirmed','2025-07-05 17:08:13'),(12,4,47,4,48,44,'2025-01-07 01:08:00','0000-00-00 00:00:00','confirmed','2025-05-21 04:54:15'),(13,11,54,4,46,48,'2025-01-30 21:07:42','0000-00-00 00:00:00','confirmed','2025-05-13 12:53:47'),(14,4,48,5,35,43,'2025-02-01 21:01:30','0000-00-00 00:00:00','confirmed','2025-04-15 10:38:25'),(15,2,60,5,45,38,'2025-04-22 03:22:37','0000-00-00 00:00:00','confirmed','2025-04-22 20:33:34'),(16,3,84,5,43,44,'2025-06-16 15:58:16','0000-00-00 00:00:00','confirmed','2025-07-26 23:10:06'),(17,4,44,5,50,50,'2025-03-18 17:42:18','0000-00-00 00:00:00','confirmed','2025-07-14 20:55:37'),(18,1,52,6,48,39,'2025-07-01 17:08:39','0000-00-00 00:00:00','confirmed','2025-08-03 14:58:23'),(19,6,41,6,48,48,'2025-02-10 19:37:12','0000-00-00 00:00:00','confirmed','2025-07-25 18:28:48'),(20,9,42,7,47,45,'2025-01-25 05:52:54','0000-00-00 00:00:00','confirmed','2025-03-11 03:19:35'),(21,3,58,7,42,36,'2025-01-09 06:28:16','0000-00-00 00:00:00','confirmed','2025-06-02 19:43:00'),(22,2,41,8,38,36,'2025-01-28 13:42:24','0000-00-00 00:00:00','confirmed','2025-05-02 13:10:41'),(23,4,47,8,44,43,'2025-03-15 23:45:23','0000-00-00 00:00:00','confirmed','2025-03-23 19:20:19'),(24,9,45,8,36,45,'2025-06-30 19:49:37','0000-00-00 00:00:00','confirmed','2025-07-28 00:51:33'),(25,1,52,9,47,47,'2025-07-09 18:44:42','0000-00-00 00:00:00','confirmed','2025-07-27 17:30:41'),(26,8,55,9,38,43,'2025-06-26 08:50:48','0000-00-00 00:00:00','confirmed','2025-07-24 05:26:18'),(27,10,54,9,44,48,'2025-03-07 17:48:00','0000-00-00 00:00:00','confirmed','2025-04-05 17:54:45'),(28,11,57,10,45,35,'2025-05-27 11:11:22','0000-00-00 00:00:00','confirmed','2025-06-30 02:19:05'),(29,11,54,10,35,47,'2025-04-09 21:11:14','0000-00-00 00:00:00','confirmed','2025-06-05 13:12:16'),(30,2,60,10,36,45,'2025-01-04 12:34:09','0000-00-00 00:00:00','confirmed','2025-08-09 03:25:27'),(31,11,52,11,46,43,'2025-08-01 19:21:35','0000-00-00 00:00:00','confirmed','2025-08-08 15:01:05'),(32,7,85,11,35,36,'2025-06-25 18:36:28','0000-00-00 00:00:00','confirmed','2025-08-05 02:46:17'),(33,5,83,11,46,43,'2025-02-18 08:02:38','0000-00-00 00:00:00','confirmed','2025-07-09 21:35:02'),(34,8,55,12,45,40,'2025-04-07 14:12:18','0000-00-00 00:00:00','confirmed','2025-08-03 18:12:57'),(35,1,52,12,45,46,'2025-03-03 06:19:57','0000-00-00 00:00:00','confirmed','2025-06-11 19:09:34'),(36,7,60,12,44,47,'2025-05-20 19:16:37','0000-00-00 00:00:00','confirmed','2025-06-21 08:30:38'),(37,4,44,12,39,44,'2025-06-07 04:39:43','0000-00-00 00:00:00','confirmed','2025-06-28 17:50:23'),(38,12,48,13,43,42,'2025-01-27 15:46:02','0000-00-00 00:00:00','confirmed','2025-05-06 09:35:14'),(39,12,51,13,48,38,'2025-05-04 07:17:51','0000-00-00 00:00:00','confirmed','2025-05-22 16:59:44'),(40,8,44,13,45,42,'2025-03-16 02:30:23','0000-00-00 00:00:00','confirmed','2025-07-28 23:14:12'),(41,8,55,13,37,45,'2025-05-31 13:26:27','0000-00-00 00:00:00','confirmed','2025-07-27 05:38:46'),(42,2,81,14,49,43,'2025-05-04 07:22:24','0000-00-00 00:00:00','confirmed','2025-05-06 10:06:35'),(43,3,48,14,36,41,'2025-05-03 17:06:40','0000-00-00 00:00:00','confirmed','2025-07-04 08:42:20'),(44,12,51,14,43,45,'2025-05-06 21:57:21','0000-00-00 00:00:00','confirmed','2025-06-18 09:10:43'),(45,2,81,14,46,39,'2025-05-12 19:13:30','0000-00-00 00:00:00','confirmed','2025-06-30 15:49:03'),(46,6,50,15,49,46,'2025-02-23 07:06:00','0000-00-00 00:00:00','confirmed','2025-05-08 16:23:57'),(47,4,81,15,44,48,'2025-06-22 04:09:39','0000-00-00 00:00:00','confirmed','2025-07-29 19:03:59'),(48,11,59,15,36,48,'2025-04-27 01:48:41','0000-00-00 00:00:00','confirmed','2025-07-29 15:17:46'),(49,3,47,16,50,48,'2025-01-27 01:07:21','0000-00-00 00:00:00','confirmed','2025-07-15 09:58:19'),(50,1,58,16,36,49,'2025-03-23 03:39:54','0000-00-00 00:00:00','confirmed','2025-07-04 16:53:43'),(51,8,85,17,44,45,'2025-08-04 18:56:31','0000-00-00 00:00:00','confirmed','2025-08-06 04:21:40'),(52,3,48,17,44,38,'2025-04-27 23:43:20','0000-00-00 00:00:00','confirmed','2025-06-21 08:25:54'),(53,3,48,17,36,41,'2025-02-18 22:48:21','0000-00-00 00:00:00','confirmed','2025-05-18 00:30:52'),(54,10,54,17,35,50,'2025-07-18 01:02:34','0000-00-00 00:00:00','confirmed','2025-08-08 11:54:02'),(55,4,44,18,44,42,'2025-06-08 18:00:47','0000-00-00 00:00:00','confirmed','2025-07-04 08:35:39'),(56,5,83,18,48,36,'2025-03-07 07:07:32','0000-00-00 00:00:00','confirmed','2025-06-15 00:22:11'),(57,2,60,18,45,39,'2025-03-12 07:48:29','0000-00-00 00:00:00','confirmed','2025-06-16 16:51:56'),(58,12,49,18,36,46,'2025-04-19 11:17:42','0000-00-00 00:00:00','confirmed','2025-05-22 22:14:08'),(59,3,47,19,38,40,'2025-06-15 18:30:29','0000-00-00 00:00:00','confirmed','2025-07-08 17:57:20'),(60,4,48,19,39,35,'2025-03-16 18:13:37','0000-00-00 00:00:00','confirmed','2025-08-07 22:51:33'),(61,4,81,20,36,43,'2025-08-05 18:09:16','0000-00-00 00:00:00','confirmed','2025-08-06 09:02:22'),(62,4,48,20,48,36,'2025-04-05 19:13:37','0000-00-00 00:00:00','confirmed','2025-06-12 17:05:51'),(63,7,56,20,35,36,'2025-01-29 08:14:59','0000-00-00 00:00:00','confirmed','2025-02-06 23:28:09'),(64,9,42,21,36,37,'2025-07-10 21:00:10','0000-00-00 00:00:00','confirmed','2025-07-29 14:05:21'),(65,2,56,21,37,50,'2025-04-26 09:01:28','0000-00-00 00:00:00','confirmed','2025-07-31 23:19:08'),(66,5,46,22,37,46,'2025-05-10 23:50:45','0000-00-00 00:00:00','confirmed','2025-05-31 15:46:59'),(67,11,53,22,44,46,'2025-01-25 23:51:21','0000-00-00 00:00:00','confirmed','2025-06-13 07:54:58'),(68,10,49,22,45,48,'2025-07-05 10:28:06','0000-00-00 00:00:00','confirmed','2025-07-22 12:50:52'),(69,9,45,23,35,47,'2025-07-02 23:41:57','0000-00-00 00:00:00','confirmed','2025-08-03 10:06:54'),(70,2,43,23,36,46,'2025-05-10 07:08:48','0000-00-00 00:00:00','confirmed','2025-07-31 10:39:12'),(71,7,60,24,36,48,'2025-01-31 08:07:30','0000-00-00 00:00:00','confirmed','2025-06-06 18:43:40'),(72,9,42,24,50,45,'2025-07-20 04:07:45','0000-00-00 00:00:00','confirmed','2025-08-03 03:36:28'),(73,11,54,24,49,35,'2025-01-20 10:09:04','0000-00-00 00:00:00','confirmed','2025-03-11 06:37:47'),(74,4,47,25,37,48,'2025-04-21 15:50:02','0000-00-00 00:00:00','confirmed','2025-07-20 03:34:26'),(75,4,48,25,39,35,'2025-03-03 16:33:22','0000-00-00 00:00:00','confirmed','2025-03-16 23:49:19'),(76,11,52,26,43,38,'2025-06-17 14:14:28','0000-00-00 00:00:00','confirmed','2025-07-30 16:58:22'),(77,8,55,26,47,38,'2025-03-04 16:56:02','0000-00-00 00:00:00','confirmed','2025-07-30 22:16:43'),(78,7,85,26,38,35,'2025-07-30 12:52:41','0000-00-00 00:00:00','confirmed','2025-08-04 09:06:40'),(79,1,45,27,47,36,'2025-03-23 06:08:12','0000-00-00 00:00:00','confirmed','2025-03-28 20:14:52'),(80,11,57,27,38,47,'2025-05-14 06:56:50','0000-00-00 00:00:00','confirmed','2025-05-16 08:22:25'),(81,5,46,27,45,38,'2025-07-31 14:37:45','0000-00-00 00:00:00','confirmed','2025-08-02 13:02:32'),(82,8,44,28,44,44,'2025-06-17 17:04:42','0000-00-00 00:00:00','confirmed','2025-07-08 01:26:37'),(83,2,43,28,42,38,'2025-02-17 06:01:57','0000-00-00 00:00:00','confirmed','2025-04-13 14:56:39'),(84,5,85,29,36,45,'2025-06-09 10:24:09','0000-00-00 00:00:00','confirmed','2025-08-01 05:20:16'),(85,2,59,29,37,42,'2025-01-13 16:09:44','0000-00-00 00:00:00','confirmed','2025-06-25 11:43:13'),(86,5,46,29,49,47,'2025-04-10 20:04:29','0000-00-00 00:00:00','confirmed','2025-08-01 09:34:17'),(87,12,49,29,47,46,'2025-02-21 12:57:47','0000-00-00 00:00:00','confirmed','2025-03-06 19:35:08'),(88,10,54,30,47,42,'2025-04-19 06:45:55','0000-00-00 00:00:00','confirmed','2025-06-20 12:17:47'),(89,10,54,30,48,50,'2025-06-11 23:53:00','0000-00-00 00:00:00','confirmed','2025-06-23 00:06:24'),(90,9,45,30,47,39,'2025-04-18 06:49:10','0000-00-00 00:00:00','confirmed','2025-08-08 21:44:27'),(91,5,46,30,50,50,'2025-07-03 02:47:25','0000-00-00 00:00:00','confirmed','2025-08-06 09:26:10'),(92,11,57,31,40,39,'2025-07-04 07:50:13','0000-00-00 00:00:00','confirmed','2025-07-09 12:10:25'),(93,10,49,31,39,45,'2025-04-12 00:37:45','0000-00-00 00:00:00','confirmed','2025-07-13 11:55:58'),(94,12,48,31,44,48,'2025-04-30 20:29:05','0000-00-00 00:00:00','confirmed','2025-05-26 08:28:42'),(95,7,60,31,41,44,'2025-08-06 13:45:23','0000-00-00 00:00:00','confirmed','2025-08-08 09:46:10'),(96,12,49,32,47,41,'2025-07-22 19:34:46','0000-00-00 00:00:00','confirmed','2025-08-06 00:07:15'),(97,5,46,32,42,45,'2025-05-07 01:29:01','0000-00-00 00:00:00','confirmed','2025-07-19 01:05:33'),(98,5,88,33,48,50,'2025-04-02 06:58:34','0000-00-00 00:00:00','confirmed','2025-07-22 10:47:13'),(99,3,84,33,49,35,'2025-02-10 17:09:43','0000-00-00 00:00:00','confirmed','2025-03-21 22:26:23'),(100,2,56,33,47,36,'2025-08-04 08:38:53','0000-00-00 00:00:00','confirmed','2025-08-05 12:14:18'),(101,3,48,34,37,41,'2025-05-08 06:37:44','0000-00-00 00:00:00','confirmed','2025-06-27 08:46:18'),(102,10,49,34,41,43,'2025-04-18 09:04:04','0000-00-00 00:00:00','confirmed','2025-08-08 16:41:10'),(103,1,45,34,36,43,'2025-06-14 00:25:38','0000-00-00 00:00:00','confirmed','2025-06-17 03:25:54'),(104,9,42,35,40,48,'2025-02-26 06:28:43','0000-00-00 00:00:00','confirmed','2025-04-10 23:47:53'),(105,2,43,35,38,37,'2025-02-01 16:42:09','0000-00-00 00:00:00','confirmed','2025-06-02 20:33:22'),(106,6,50,36,46,49,'2025-03-21 18:51:10','0000-00-00 00:00:00','confirmed','2025-06-24 17:28:40'),(107,8,59,36,35,35,'2025-03-05 16:08:20','0000-00-00 00:00:00','confirmed','2025-04-05 22:51:48'),(108,12,51,36,48,47,'2025-05-06 09:30:04','0000-00-00 00:00:00','confirmed','2025-05-09 23:41:02'),(109,2,43,37,50,47,'2025-07-02 17:03:54','0000-00-00 00:00:00','confirmed','2025-08-09 06:15:53'),(110,9,45,37,45,38,'2025-06-11 19:48:59','0000-00-00 00:00:00','confirmed','2025-06-27 19:19:25'),(111,10,49,37,48,38,'2025-05-19 04:46:11','0000-00-00 00:00:00','confirmed','2025-05-29 23:26:58'),(112,11,57,38,38,46,'2025-03-26 02:46:47','0000-00-00 00:00:00','confirmed','2025-07-28 23:42:55'),(113,10,83,38,49,44,'2025-02-28 22:58:24','0000-00-00 00:00:00','confirmed','2025-03-29 19:03:05'),(114,12,83,38,43,38,'2025-04-09 05:10:49','0000-00-00 00:00:00','confirmed','2025-07-09 14:43:12'),(115,12,83,39,38,50,'2025-06-26 00:50:00','0000-00-00 00:00:00','confirmed','2025-07-10 04:50:47'),(116,11,57,39,36,44,'2025-04-03 09:44:14','0000-00-00 00:00:00','confirmed','2025-06-17 10:40:56'),(117,12,83,39,40,39,'2025-07-13 10:26:48','0000-00-00 00:00:00','confirmed','2025-07-24 06:20:02'),(118,11,52,40,49,38,'2025-02-01 09:54:17','0000-00-00 00:00:00','confirmed','2025-05-14 07:43:28'),(119,4,44,40,45,48,'2025-07-06 17:59:02','0000-00-00 00:00:00','confirmed','2025-07-19 13:17:36'),(120,6,50,80,49,50,'2025-06-20 02:58:11','0000-00-00 00:00:00','confirmed','2025-07-05 08:32:32'),(121,6,50,80,37,38,'2025-03-20 10:57:37','0000-00-00 00:00:00','confirmed','2025-04-11 05:47:45'),(122,3,84,80,47,46,'2025-06-15 12:25:25','0000-00-00 00:00:00','confirmed','2025-07-11 07:26:42'),(123,8,44,80,43,47,'2025-02-18 16:24:36','0000-00-00 00:00:00','confirmed','2025-07-21 13:30:21'),(124,1,45,82,50,43,'2025-03-23 07:57:11','0000-00-00 00:00:00','confirmed','2025-07-07 06:39:07'),(125,12,48,82,46,45,'2025-08-09 07:40:59','0000-00-00 00:00:00','confirmed','2025-08-09 07:43:49'),(126,8,55,86,46,50,'2025-02-20 20:09:18','0000-00-00 00:00:00','confirmed','2025-03-18 01:24:54'),(127,4,44,86,43,38,'2025-05-12 10:09:53','0000-00-00 00:00:00','confirmed','2025-05-22 13:23:30'),(128,5,83,86,38,40,'2025-08-03 22:54:46','2025-08-11 13:28:23','cancelled','2025-08-09 01:14:45'),(129,4,47,87,47,39,'2025-03-02 00:39:13','0000-00-00 00:00:00','confirmed','2025-06-08 10:42:15'),(130,12,59,87,39,47,'2025-04-13 18:11:44','0000-00-00 00:00:00','confirmed','2025-05-01 00:18:59'),(131,3,47,87,40,41,'2025-05-11 04:57:43','0000-00-00 00:00:00','confirmed','2025-05-30 02:24:17'),(132,12,49,87,44,35,'2025-02-05 10:51:15','0000-00-00 00:00:00','confirmed','2025-05-01 16:32:09'),(133,11,54,89,45,44,'2025-06-03 14:46:37','0000-00-00 00:00:00','confirmed','2025-06-11 06:36:49'),(134,4,81,89,44,50,'2025-08-06 10:14:35','0000-00-00 00:00:00','confirmed','2025-08-06 11:13:44'),(135,5,41,89,35,38,'2025-07-23 11:34:07','0000-00-00 00:00:00','confirmed','2025-08-07 06:44:53'),(136,4,48,91,40,49,'2025-05-23 21:13:33','0000-00-00 00:00:00','confirmed','2025-07-18 00:27:05'),(137,3,47,91,41,36,'2025-06-03 09:59:32','0000-00-00 00:00:00','confirmed','2025-06-30 19:44:28'),(138,11,57,91,38,44,'2025-02-01 01:44:06','0000-00-00 00:00:00','confirmed','2025-04-03 12:09:14'),(139,5,83,91,39,49,'2025-02-13 08:03:14','0000-00-00 00:00:00','confirmed','2025-04-24 23:41:55'),(141,2,60,1,NULL,50,'2025-08-10 19:49:05',NULL,'confirmed','2025-08-12 08:00:00'),(142,8,55,104,NULL,NULL,'2025-08-10 23:02:20',NULL,'confirmed','2025-08-20 08:00:00'),(143,5,83,1,NULL,NULL,'2025-08-10 23:15:23',NULL,'confirmed','2025-08-10 08:00:00'),(144,10,88,106,NULL,50,'2025-08-11 07:24:49',NULL,'confirmed','2025-08-12 08:00:00'),(145,8,53,82,NULL,50,'2025-08-11 07:29:34',NULL,'confirmed','2025-08-13 08:00:00'),(146,6,41,82,NULL,50,'2025-08-11 07:36:25',NULL,'confirmed','2025-08-30 08:00:00'),(148,2,43,82,NULL,50,'2025-08-11 13:52:33',NULL,'confirmed','2025-08-31 08:00:00'),(151,8,55,82,NULL,50,'2025-08-12 10:44:25',NULL,'confirmed','2025-08-29 12:00:00'),(152,7,60,82,NULL,NULL,'2025-08-12 10:48:31',NULL,'confirmed','2025-08-12 08:00:00'),(153,2,81,82,NULL,NULL,'2025-08-12 10:56:58',NULL,'confirmed','2025-08-12 08:00:00');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('ETVMKs1szHmTWZ8j4LDHcw6HUkIFQggb2ya6yrSj',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoieGN1ZEtJVlRmNG1wd0dzRzdDbG9nc1VXbzhkWXB6R0t1aHgwSDY2diI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1753865369),('ZNucpiCraEb26KRIzS8LAEOgMbexp8XuRaLktIP9',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiR3pDeEg0NXhETGxKODhzdmo3UlRhOExtRk1HOWc0WjR6TWphTGFsaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1753798987);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stops`
--

DROP TABLE IF EXISTS `stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stops` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reservation_id` bigint unsigned NOT NULL,
  `place_id` bigint unsigned NOT NULL,
  `rating_place` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stops_reservation_id_foreign` (`reservation_id`),
  KEY `stops_place_id_foreign` (`place_id`),
  CONSTRAINT `stops_place_id_foreign` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  CONSTRAINT `stops_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`),
  CONSTRAINT `chk_rating_place` CHECK ((`rating_place` between 0 and 50))
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stops`
--

LOCK TABLES `stops` WRITE;
/*!40000 ALTER TABLE `stops` DISABLE KEYS */;
INSERT INTO `stops` VALUES (1,4,7,31,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(2,4,9,3,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(3,4,12,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(4,4,13,20,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(5,4,14,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(6,7,7,15,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(7,7,9,28,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(8,7,12,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(9,7,13,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(10,7,14,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(11,8,7,3,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(12,8,9,29,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(13,8,12,37,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(14,8,13,24,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(15,8,14,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(16,15,7,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(17,15,9,43,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(18,15,12,7,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(19,15,13,49,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(20,15,14,22,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(21,16,7,10,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(22,16,9,27,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(23,16,12,48,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(24,16,13,48,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(25,16,14,21,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(26,20,7,9,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(27,20,9,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(28,20,12,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(29,20,13,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(30,20,14,25,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(31,24,7,30,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(32,24,9,50,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(33,24,12,32,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(34,24,13,48,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(35,24,14,10,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(36,26,7,4,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(37,26,9,19,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(38,26,12,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(39,26,13,24,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(40,26,14,43,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(41,29,7,2,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(42,29,9,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(43,29,12,4,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(44,29,13,37,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(45,29,14,1,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(46,31,7,25,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(47,31,9,17,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(48,31,12,9,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(49,31,13,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(50,31,14,10,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(51,38,7,16,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(52,38,9,11,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(53,38,12,44,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(54,38,13,47,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(55,38,14,21,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(56,3,1,10,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(57,3,2,19,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(58,3,15,29,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(59,3,16,0,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(60,3,17,11,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(61,10,1,27,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(62,10,2,25,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(63,10,15,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(64,10,16,39,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(65,10,17,35,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(66,17,1,17,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(67,17,2,32,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(68,17,15,7,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(69,17,16,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(70,17,17,32,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(71,19,1,11,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(72,19,2,24,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(73,19,15,45,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(74,19,16,43,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(75,19,17,47,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(76,22,1,4,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(77,22,2,26,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(78,22,15,13,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(79,22,16,40,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(80,22,17,24,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(81,27,3,4,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(82,27,4,7,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(83,27,5,17,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(84,27,22,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(85,37,3,32,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(86,37,4,36,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(87,37,5,46,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(88,37,22,38,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(89,1,23,43,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(90,1,24,2,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(91,1,48,3,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(92,13,23,34,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(93,13,24,10,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(94,13,48,1,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(95,14,23,1,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(96,14,24,12,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(97,14,48,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(98,18,23,37,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(99,18,24,9,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(100,18,48,15,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(101,34,23,27,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(102,34,24,46,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(103,34,48,36,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(104,40,23,17,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(105,40,24,12,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(106,40,48,19,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(107,23,26,31,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(108,23,28,35,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(109,28,26,0,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(110,28,28,42,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(111,33,26,48,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(112,33,28,35,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(113,39,26,1,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(114,39,28,23,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(115,21,35,15,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(116,21,36,45,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(117,21,37,18,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(118,21,38,41,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(119,35,35,4,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(120,35,36,29,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(121,35,37,46,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(122,35,38,46,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(123,6,44,4,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(124,6,45,10,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(125,6,46,7,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(126,6,47,33,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(127,11,44,50,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(128,11,45,9,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(129,11,46,27,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(130,11,47,13,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(131,12,44,9,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(132,12,45,9,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(133,12,46,2,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(134,12,47,24,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(135,36,44,43,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(136,36,45,38,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(137,36,46,4,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(138,36,47,22,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(139,2,8,33,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(140,2,10,20,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(141,2,11,48,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(142,5,8,27,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(143,5,10,33,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(144,5,11,27,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(145,9,8,46,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(146,9,10,30,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(147,9,11,2,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(148,25,8,32,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(149,25,10,45,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(150,25,11,46,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(151,30,8,28,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(152,30,10,50,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(153,30,11,36,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(154,32,8,14,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(155,32,10,8,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(156,32,11,13,'2025-07-28 09:25:47','2025-07-28 09:25:47'),(157,4,7,25,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(158,4,9,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(159,4,12,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(160,4,13,38,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(161,4,14,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(162,7,7,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(163,7,9,46,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(164,7,12,50,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(165,7,13,5,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(166,7,14,7,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(167,8,7,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(168,8,9,12,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(169,8,12,25,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(170,8,13,3,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(171,8,14,20,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(172,15,7,43,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(173,15,9,31,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(174,15,12,4,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(175,15,13,10,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(176,15,14,27,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(177,16,7,29,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(178,16,9,45,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(179,16,12,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(180,16,13,16,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(181,16,14,12,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(182,20,7,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(183,20,9,25,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(184,20,12,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(185,20,13,25,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(186,20,14,3,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(187,24,7,45,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(188,24,9,43,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(189,24,12,2,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(190,24,13,2,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(191,24,14,17,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(192,26,7,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(193,26,9,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(194,26,12,17,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(195,26,13,9,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(196,26,14,26,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(197,29,7,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(198,29,9,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(199,29,12,3,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(200,29,13,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(201,29,14,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(202,31,7,19,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(203,31,9,40,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(204,31,12,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(205,31,13,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(206,31,14,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(207,38,7,15,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(208,38,9,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(209,38,12,19,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(210,38,13,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(211,38,14,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(212,41,7,18,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(213,41,9,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(214,41,12,35,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(215,41,13,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(216,41,14,13,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(217,59,7,48,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(218,59,9,3,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(219,59,12,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(220,59,13,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(221,59,14,10,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(222,3,1,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(223,3,2,44,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(224,3,15,13,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(225,3,16,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(226,3,17,48,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(227,10,1,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(228,10,2,35,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(229,10,15,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(230,10,16,39,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(231,10,17,16,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(232,17,1,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(233,17,2,20,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(234,17,15,20,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(235,17,16,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(236,17,17,37,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(237,19,1,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(238,19,2,8,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(239,19,15,27,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(240,19,16,26,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(241,19,17,22,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(242,22,1,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(243,22,2,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(244,22,15,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(245,22,16,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(246,22,17,38,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(247,42,1,32,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(248,42,2,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(249,42,15,36,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(250,42,16,10,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(251,42,17,38,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(252,50,1,50,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(253,50,2,17,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(254,50,15,26,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(255,50,16,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(256,50,17,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(257,27,3,18,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(258,27,4,15,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(259,27,5,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(260,27,22,40,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(261,37,3,40,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(262,37,4,4,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(263,37,5,1,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(264,37,22,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(265,51,3,24,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(266,51,4,38,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(267,51,5,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(268,51,22,8,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(269,1,23,31,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(270,1,24,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(271,1,48,27,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(272,13,23,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(273,13,24,18,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(274,13,48,36,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(275,14,23,26,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(276,14,24,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(277,14,48,4,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(278,18,23,35,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(279,18,24,50,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(280,18,48,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(281,34,23,43,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(282,34,24,40,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(283,34,48,47,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(284,40,23,14,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(285,40,24,15,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(286,40,48,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(287,43,23,50,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(288,43,24,12,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(289,43,48,6,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(290,58,23,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(291,58,24,6,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(292,58,48,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(293,23,26,36,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(294,23,28,21,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(295,28,26,17,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(296,28,28,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(297,33,26,43,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(298,33,28,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(299,39,26,38,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(300,39,28,12,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(301,44,26,4,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(302,44,28,37,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(303,47,26,19,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(304,47,28,20,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(305,54,26,35,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(306,54,28,32,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(307,21,35,17,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(308,21,36,11,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(309,21,37,14,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(310,21,38,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(311,35,35,14,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(312,35,36,41,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(313,35,37,50,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(314,35,38,8,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(315,45,39,19,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(316,45,40,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(317,45,41,42,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(318,45,42,48,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(319,45,43,6,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(320,52,39,7,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(321,52,40,29,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(322,52,41,36,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(323,52,42,29,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(324,52,43,45,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(325,53,39,1,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(326,53,40,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(327,53,41,3,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(328,53,42,23,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(329,53,43,29,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(330,55,39,27,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(331,55,40,28,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(332,55,41,9,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(333,55,42,32,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(334,55,43,22,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(335,57,39,48,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(336,57,40,22,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(337,57,41,0,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(338,57,42,26,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(339,57,43,5,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(340,60,39,29,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(341,60,40,43,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(342,60,41,36,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(343,60,42,33,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(344,60,43,3,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(345,6,44,5,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(346,6,45,21,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(347,6,46,2,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(348,6,47,39,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(349,11,44,37,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(350,11,45,7,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(351,11,46,41,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(352,11,47,40,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(353,12,44,1,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(354,12,45,22,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(355,12,46,11,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(356,12,47,34,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(357,36,44,24,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(358,36,45,39,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(359,36,46,34,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(360,36,47,18,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(361,48,44,43,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(362,48,45,29,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(363,48,46,23,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(364,48,47,38,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(365,2,8,21,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(366,2,10,40,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(367,2,11,30,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(368,5,8,4,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(369,5,10,48,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(370,5,11,50,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(371,9,8,13,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(372,9,10,36,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(373,9,11,1,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(374,25,8,34,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(375,25,10,2,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(376,25,11,18,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(377,30,8,28,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(378,30,10,24,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(379,30,11,43,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(380,32,8,43,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(381,32,10,46,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(382,32,11,49,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(383,46,8,9,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(384,46,10,1,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(385,46,11,34,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(386,49,8,12,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(387,49,10,50,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(388,49,11,17,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(389,56,8,14,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(390,56,10,17,'2025-07-29 09:32:58','2025-07-29 09:32:58'),(391,56,11,35,'2025-07-29 09:32:58','2025-07-29 09:32:58');
/*!40000 ALTER TABLE `stops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tour_image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `description` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (1,'Funchal Tour','04:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/funchal.jpg',59,NULL),(2,'Rota Oeste','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/oeste.jpeg',43,NULL),(3,'Visit Calheta','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/calheta.jpg',58,NULL),(4,'Paul da Serra Tour','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/paul_serra.jpg',53,NULL),(5,'Visit Porto Moniz','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/porto_moniz.jpg',41,NULL),(6,'Visit São Vicente','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/sao_vicente.jpg',50,NULL),(7,'Garajau Tour','04:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/garajau.jpg',60,NULL),(8,'Mountain Tour','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/mountains.jpg',44,NULL),(9,'Caniçal Tour','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/canical.jpg',42,NULL),(10,'Visit Santana','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/santana.jpg',49,NULL),(11,'Ponta Delgada Tour','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/ponta_delgada.jpg',57,NULL),(12,'Funchal Gardens','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55','uploads/gardens.jpg',51,NULL),(13,'Volta à Ilha!','00:00:06','2025-08-12 08:09:35',NULL,'uploads/1754986174626-madeira.jpg',83,'Vamos descobrir tudo sobre a ilha!');
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `profile_image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tutorialCompleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Carlos Ochoa','carlos.ochoa@gmail.com',0,NULL,'$2y$12$BESXqo70NWNG9zTBm/BZSumDsz1A94VKJWLHxCqxMB5e8zVq2ZG9.',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL,1),(2,'Michel Guyot','michel.guyot@gmail.com',0,NULL,'$2y$12$eVBSRUXyxiJl2PTqHeCxT./q0RR.KVtbnpnkWxkrSHBpYfD5R06.O',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL,1),(3,'Sarah Reis','sarah.reis@gmail.com',0,NULL,'$2y$12$e6BQJSQLB4mgYyPVaVEkOu0FYB1i2ySChijdSqBNWaKjxraodp75m',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL,1),(4,'Bernadette Diallo','bernadette.diallo@gmail.com',0,NULL,'$2y$12$Vo4OYwflvONUoP1D.mrNVeyPuSdkIIffiir/YZwBy5kU18M8F70c.',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL,1),(5,'Christopher Gautier','christopher.gautier@gmail.com',0,NULL,'$2y$12$pkWdL6uRCD9YCWkXvVNwveA8Xx8kbRAo2vMQyKXsmT9x3m0yj6Hfu',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL,1),(6,'Julie Griffin','julie.griffin@gmail.com',0,NULL,'$2y$12$UkI0e7THky0VMMif9Sq/SuRpAWYMWiDf5boNQdT5wQL6qw0ug9q0u',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL,1),(7,'Tatiana Rodrigues','tatiana.rodrigues@gmail.com',0,NULL,'$2y$12$mGaXGv9vLToJCznMQLGbeu/l6Klt4OE.eCVCeiLbYFXejr00mqz9W',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL,1),(8,'Dinis Vargas','dinis.vargas@gmail.com',0,NULL,'$2y$12$I.yXqQwUWhpkg.PD2mfP3ul4URsgXAj9rMeDe/kC3fHMvsPggt0UK',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL,1),(9,'Agostino Allen','agostino.allen@gmail.com',0,NULL,'$2y$12$iQrA5/klToEZVUHxvvRG5.ErUqlEWCYb5OEeT6SI5M1muy8W2qpqS',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL,1),(10,'Gino Blanc','gino.blanc@gmail.com',0,NULL,'$2y$12$v3z8sZjO/JhilNDRPKydSuVS7OsSUlMNjbLq3AwhXmymX1.g4W06m',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL,1),(11,'Angelica Leal','angelica.leal@gmail.com',0,NULL,'$2y$12$cwuTl80nwv2pcFu9VUYePOYgN4Ed8FjhDusYSke6Qz.0aFohuelS.',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL,1),(12,'Marissa Telesio','marissa.telesio@gmail.com',0,NULL,'$2y$12$DKhHEBlMLlXamDicFVO6tOKSQLY5AUk0Mx0xvJL6swuvaWAUxMPHK',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL,1),(13,'Giovanna Davis','giovanna.davis@gmail.com',0,NULL,'$2y$12$2EmC2RnV/.zARbFkmFPbSOoXIGpaIRux8.lY8c9PyLfuxriW8v8MW',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL,1),(14,'Mary Marini','mary.marini@gmail.com',0,NULL,'$2y$12$gY6ac9XqBTUIN.oZR8ZJweBgZowj05TwWt4TUFFvmdDNHDjAwJH0i',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL,1),(15,'Suzanne Laurent','suzanne.laurent@gmail.com',0,NULL,'$2y$12$XL9oh9vMBkiUCqaHNy3uKenx9EMg0QEkUS73yfvG9M75tRAcHHGpG',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL,1),(16,'Caroline Staglieno','caroline.staglieno@gmail.com',0,NULL,'$2y$12$t6pGYcpM0/qHilzxaWIML.HlhhvFFxJjcSp97nskTzaKCRUfxZ3mu',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL,1),(17,'John Buisson','john.buisson@gmail.com',0,NULL,'$2y$12$H5Yc64Kwk1i6DkiZ8epfcOIDsMujqcFRBkcqSd3K2xpODFgkuYazW',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL,1),(18,'Margot Saracino','margot.saracino@gmail.com',0,NULL,'$2y$12$/WrAKs7oNGFFKENxQZa6ueCJAPjU6oUZXYw8xR/NLlRPuAC0Cpvhi',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL,1),(19,'Gianpietro Salvini','gianpietro.salvini@gmail.com',0,NULL,'$2y$12$pEo5UjlRVgmvFYWyt6wCS.mAtg0RKDaXC0eBpavtFOO.jpA6hm1mm',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL,1),(20,'Alessandra Pottier','alessandra.pottier@gmail.com',0,NULL,'$2y$12$8/Zom9NhOh/CQo8EqENj3OBQlLeu3i1Djn9Ez8LIp//X1oKIUAKD.',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL,1),(21,'Mandy Philippe','mandy.philippe@gmail.com',0,NULL,'$2y$12$BVXtkn/Wss1ONzd489rSUOasESorieAKaE1jkfn8ofbgcX5g.237u',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL,1),(22,'Vincent King','vincent.king@gmail.com',0,NULL,'$2y$12$wjNuIPGszO7R1SRBFrjouO6JKMu62fDmPeyHQL3QfqH8GVhuKplru',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL,1),(23,'Nadia Leite','nadia.leite@gmail.com',0,NULL,'$2y$12$kwfPmSCeHK8X88vaXSoZBO4/fUB79BP8UxPI.t/BRQJq4Of5W2lL.',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL,1),(24,'Daniel Scialpi','daniel.scialpi@gmail.com',0,NULL,'$2y$12$6fdB/a8pTnPyOgFYllAcq.kvvEu6qIdL/8ScGLd1yLGIYrIi/piM2',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL,1),(25,'Leopoldo Castro','leopoldo.castro@gmail.com',0,NULL,'$2y$12$2yAxFEQjzb0xpUe7EgaxFeF62316S/Cxt4/AkmHvX0Xxf1NoTbzUG',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL,1),(26,'Julie Mccoy','julie.mccoy@gmail.com',0,NULL,'$2y$12$cTTxCPX9Vduc5HwWvvvDU.f80c0hhmFtOZ5ma8bIXPjTB1ixOsNHK',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL,1),(27,'Ivo Dos Santos','ivo.dos.santos@gmail.com',0,NULL,'$2y$12$j2yLxQkBg2SSohrMwEYeB.KJbZ7t7w33uZfHfKbqyfTKmihEy.c6.',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL,1),(28,'Taylor Bonino','taylor.bonino@gmail.com',0,NULL,'$2y$12$JHqClQ45l/wbUjXtfzusnOB3zNtkql9AA2BfOC1euVzp9wkr1ks9C',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL,1),(29,'Giacomo Raurica','giacomo.raurica@gmail.com',0,NULL,'$2y$12$DZSe.AhM8ssqc1vru/NEquQHQSB4q2JmwUmAUkDJK99oBtuu6y1JO',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL,1),(30,'Michelle Faria','michelle.faria@gmail.com',0,NULL,'$2y$12$639d3Fu.PxeC5pETZ76LRuoRXUHG6A59DAeduIJypOhvRm8uB5z6W',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL,1),(31,'Pauline Rapisardi','pauline.rapisardi@gmail.com',0,NULL,'$2y$12$BMkTTDsZ92dWiYB/7k5nhO0UROLptbRdPSeqEuNA5tMEq/Zb4c.YS',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL,1),(32,'Beppe Gentili','beppe.gentili@gmail.com',0,NULL,'$2y$12$yGXdgJIi.pxm4CoU02v.ouyCvzv8gQ44trKuRGAHY/fU6TQ/3tGMa',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL,1),(33,'Elisa Lloyd','elisa.lloyd@gmail.com',0,NULL,'$2y$12$7Bop7zZHwLlGtsLnfipoaulnfx2FQ1Gog.HGXKKkokiXVDRsyj6G6',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL,1),(34,'Kendra Ricolfi','kendra.ricolfi@gmail.com',0,NULL,'$2y$12$fW2oVMYQ/VvHzmspsY/JUOpmukozmhzO3jfp/2HHwgMuz1KhBKlGC',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL,1),(35,'Lisa Trombetta','lisa.trombetta@gmail.com',0,NULL,'$2y$12$XB877UNo1EMASWAMsPorvelzKMXGJRfwLrRzRokALd4GNlY88EFw.',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL,1),(36,'Danielle Almeida','danielle.almeida@gmail.com',0,NULL,'$2y$12$TCSsYBsSJzrkCGPJqFxtweFaumLHkvW7YgGL5HDpRv8eOW84izinW',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL,1),(37,'Vincenza Marsili','vincenza.marsili@gmail.com',0,NULL,'$2y$12$ZFJ.PyPssfnLoou5QLTXiOdAAtJN3fCPM6cNgOldUTDfQGx155YRm',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL,1),(38,'Patricia Murray','patricia.murray@gmail.com',0,NULL,'$2y$12$/0fTp2OhEEPMqfDle7BVNe5aI0L1YzAfE6Ekb6XIXOMYAlgBZDgjy',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL,1),(39,'David Rousseau','david.rousseau@gmail.com',0,NULL,'$2y$12$izgdHum2SW6FjrGds0CA4O8FQ4o/6/zb/CrfO.y5QPEmzsxuQGIRm',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL,1),(40,'Martina Pacillo','martina.pacillo@gmail.com',0,NULL,'$2y$12$wfD3pNLM53Ipl4JAPlhvbu4Lp88XuQnneP8f1s0eOazwOLABf/LPu',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL,1),(41,'Michael Jimenez','michael.jimenez@gmail.com',1,NULL,'$2y$12$xFz7PflWvfsDHGv9u6.GnOSFHAVtB7izuuNo5wtfU5pW.uD/G/7I2',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL,1),(42,'Valentim Jourdan','valentim.jourdan@gmail.com',1,NULL,'$2y$12$VKDowd34wBCGLMO6jFQUf.BXGHPFKpR4yAVm2Xuog0A//47/tNl8G',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL,1),(43,'Laure Lourenco','laure.lourenco@gmail.com',1,NULL,'$2y$12$.3dSq77v3AlXNIAdb4ijbeNmBX4HuDkcersqzHINtG8EYDq/ljBre',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL,1),(44,'Danielle Lopez','danielle.lopez@gmail.com',1,NULL,'$2y$12$tZmRvf3rBP7g9E5AxV9QFukSHVoKIhVuYrKWK..9tqAdH4DpczOVu',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL,1),(45,'Oceane Brown','oceane.brown@gmail.com',1,NULL,'$2y$12$ozEbNwWujlv4lcwAupPANeZDfIkIjx2uCh7o.T/tGJTESF9a66SpS',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL,1),(46,'David Neves','david.neves@gmail.com',1,NULL,'$2y$12$WHtTvNpMebilMBI9mhe7/OD1KKb4b8A4YWjeqewAJ2Ju9BM878Yky',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL,1),(47,'Salvador Goncalves','salvador.goncalves@gmail.com',1,NULL,'$2y$12$dT1c0K7jTvapfTo.RqTf7O16XgkiBz0bu0btWRS2hvjBi19GWl2AC',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL,1),(48,'Daniel Faria','daniel.faria@gmail.com',1,NULL,'$2y$12$UHvJ0iStqdt9l8m7UDNEJuMn6GT7.iyeiZKg4BV/mbFkibo0Dzeje',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL,1),(49,'Sandro Lemaitre','sandro.lemaitre@gmail.com',1,NULL,'$2y$12$ROxwko31ICFDmbBS1MBese5ROUUQ690/Nfz5nAxostCk6FiSnLD8a',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL,1),(50,'Virginie Edwards','virginie.edwards@gmail.com',1,NULL,'$2y$12$xAnGzYLUQQOc.cK1efBUfeeusoCFFtXQTESP/FANNWC/uQWJOHby6',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL,1),(51,'Dante Dijoux','dante.dijoux@gmail.com',1,NULL,'$2y$12$Znt73/fk9b5e89vfLfzSGejvl08SUB9wLoKzAmqWGawVxv1cbpyy6',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL,1),(52,'James Walker','james.walker@gmail.com',1,NULL,'$2y$12$92zJPDty45HfvQ.IuI5bpOit01SakUdVz.DQZ3GU16prlKgB0.M1K',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL,1),(53,'Valentim Machado','valentim.machado@gmail.com',1,NULL,'$2y$12$2R9tIjPL83.ldfwRuZwwF.K60c1jcZAvujIAsz/2Yn2oMGWw/WpOa',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL,1),(54,'Nair Domingues','nair.domingues@gmail.com',1,NULL,'$2y$12$h0Tu3ODA5b4SUExqJ2.FN.J6Pi6xZDqwiSGBH0QuZF5LncOHzEpdW',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL,1),(55,'Adrien Loureiro','adrien.loureiro@gmail.com',1,NULL,'$2y$12$gBnmSedzzE.kh1Wtwrfm3.i1QiBeQaQCW/Igt5lDl8aaVn3eMMO/.',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL,1),(56,'Wendy Esteves','wendy.esteves@gmail.com',1,NULL,'$2y$12$VTdb9sDF9XqQpedKsAfgQun9W3iB8gqsl/LzS9yEr3nutNeHB/JAy',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL,1),(57,'Jeannine Spears','jeannine.spears@gmail.com',1,NULL,'$2y$12$e.6fSkHkhTYJbL1W31G8ruhDPgDMDbsXHcv7hUzB8qirvVayOc1dW',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL,1),(58,'Capucine Benigni','capucine.benigni@gmail.com',1,NULL,'$2y$12$wg5b7xaiNJdg7.uxww.w8eHIxxg3at/kyi2263vYD0fKBTCJfRv1S',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL,1),(59,'Patricia Daniel','patricia.daniel@gmail.com',1,NULL,'$2y$12$asSqpkPciAaUOjMjxJz3veRrJm7EuenJ3EhuDSF14qnL/AIcaUffK',NULL,'2025-07-29 09:32:55','2025-07-29 09:32:55',NULL,1),(60,'Alphonse Capecchi','alphonse.capecchi@gmail.com',1,NULL,'$2y$12$biuh6NhUTaFfS0W2Nw6/FeEY.iPR7YGTS2rDpuwzNqeFwoYXWRrZO',NULL,'2025-07-29 09:32:55','2025-07-29 09:32:55',NULL,1),(80,'Gonçalo Armando','goncalo.armando@gmail.com',0,NULL,'$2b$10$eo3R3M7KFg83mBchKnZYc.NP4izS/DO.HdCQ84CcrYS0OkPLWAQDK',NULL,'2025-08-04 12:39:33',NULL,NULL,1),(81,'Ana Maria','ana.maria@gmail.com',1,NULL,'$2b$10$0H0T0GCh5NvRW/eInaqLqedDQhz9RW5VH7wovNhFIV1hRtbS/l7GG',NULL,'2025-08-04 12:47:22',NULL,NULL,1),(82,'Super Mario','mario@gmail.com',0,NULL,'$2b$10$A3DFekyKHG7SbMV/Fn8mceBrRYNxN7okoHXwLNP6n4y1zisapHp1G',NULL,'2025-08-04 13:18:53',NULL,'uploads/mario.jpg',1),(83,'Maria Sofia','maria.sofia@gmail.com',1,NULL,'$2b$10$UkezcKsayrkQj613NuXWUOcaLgE85aoOhs1alFMTLv8dhita7O/ji',NULL,'2025-08-04 13:27:26',NULL,'uploads/1754574955595-woman.jpg',1),(84,'Paulo Soares','paulo.soares@gmail.com',1,NULL,'$2b$10$hd262afoTjMNSbPZm6wUJOMMqNN2J8Yu21f7glRsG.XvrcCA1RScO',NULL,'2025-08-04 14:11:48',NULL,'uploads/1754316707563-man.jpg',1),(85,'João Mário','joao.mario@gmail.com',1,NULL,'$2b$10$yCYF1sBzpx39z6YFrYbQEetV8q7f5SzdCpTIQg/PiWNsfR9zIIx/2',NULL,'2025-08-05 10:34:13',NULL,NULL,1),(86,'Fabiana Esteves','fabiana.esteves@gmail.com',0,NULL,'$2b$10$HByy2dTvoRWsrEv2YWKveOcfrsSSwGxj.Xxc325fK.bDwbcpjKjhK',NULL,'2025-08-05 10:43:56',NULL,NULL,1),(87,'Carlos Freitas','carlos.freitas@gmail.com',0,NULL,'$2b$10$jqMXkx9PGZ5cN1JjeqgKp.CskmkvodHPs26WOu6/U4QOS0Rphgt3u',NULL,'2025-08-05 10:46:59',NULL,NULL,1),(88,'João Estrela','joao.estrela@gmail.com',1,NULL,'$2b$10$67WzyFPJElmegIGAt0oE9uqwaDmITtle6e3i2OqFGj/2M.yB0smoS',NULL,'2025-08-05 10:48:25',NULL,NULL,1),(89,'Helena Freitas','helena.freitas@gmail.com',0,NULL,'$2b$10$hQIytlwyk1kJ1VuWKd6Aj.Ysix2pb/YcXqUQvUiXXR8PiiD6t08RG',NULL,'2025-08-07 08:08:55',NULL,NULL,1),(91,'Lex Luthor','lex@gmail.com',0,NULL,'$2b$10$H7.5btgN3fZYfCiFvYAWF.FbaNOVteJAnlkDNtNb2N7JSn4XTNI2G',NULL,'2025-08-07 08:34:39',NULL,'uploads/1754555679381-lex.jpeg',1),(104,'Luís Tavares','luis.tavares@gmail.com',0,NULL,'$2b$10$wqC7N5uCmJVbzW4v6Bv6jOY7PYYT0xJJ5ecsWvI9Q5Z20Qd55e262',NULL,'2025-08-10 22:56:05',NULL,'uploads/1754866565228-travelman.jpg',1),(106,'Joanna Adams','joanna.adams@gmail.com',0,NULL,'$2b$10$ChKV6wWov2kkjjuqVcfbiuOHo.nkoiiXQalrOs9lV5Hb4N4IvgUIy',NULL,'2025-08-11 07:23:47',NULL,'uploads/1754897027349-travelwoman.jpg',1),(107,'Joana Figueiroa','joana.figueiroa@gmail.com',0,NULL,'$2b$10$7XlvDq2m8nrq3/LAirQmIu08q7.T9bvbHeokd4mt6T06zf..Uzs1y',NULL,'2025-08-12 11:02:45',NULL,NULL,NULL),(108,'Luigi Mario','luigi@gmail.com',0,NULL,'$2b$10$jqiojaR3J3b2mO2z5T5RaePZMpLMZaTA/nMqTx7nohg6SaTituRBm',NULL,'2025-08-12 11:06:36',NULL,'uploads/1754996796205-luigi.jpg',1),(109,'Tiago Tiago','tiago.tiago@gmail.com',0,NULL,'$2b$10$NlWju3Liv8fpGvG84dATUOBmAlz/BNkQMkvjIroYUUVsLAMCygZ56',NULL,'2025-08-12 11:07:53',NULL,NULL,0),(110,'Luísa Fernandes','luisa.fernandes@gmail.com',0,NULL,'$2b$10$xJEM3af9iOnSOMmVUoluKuPzKgefwD6mJ4F.onJfdtq32Rb/gocyi',NULL,'2025-08-12 12:51:17',NULL,NULL,0),(111,'Tânia Freitas','tania.freitas@gmail.com',0,NULL,'$2b$10$dAgKZPiGERuvJ9bOskmaQOTO18tvefr0v/mLLeAee7iJmRY/6ItTi',NULL,'2025-08-12 12:53:43',NULL,NULL,0),(112,'Cátia Marques','catia.marques@gmail.com',0,NULL,'$2b$10$rNRm8QwNhBvEwHYjkyfUqetqhVwCHwDH3DfwHFOoFqaCXnkBbV3W2',NULL,'2025-08-12 13:08:11',NULL,NULL,0),(113,'Leonardo Agrela','leonardo.agrela@gmail.com',1,NULL,'$2b$10$B8edFoR7n.D1si5dw0s.NeDoXX7ZWwKzEBMNwzRUgMtPvPLXzoK8G',NULL,'2025-08-12 13:33:04',NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `tour_id` bigint unsigned NOT NULL,
  `place_id` bigint unsigned NOT NULL,
  `order` int NOT NULL,
  UNIQUE KEY `visits_tour_id_place_id_unique` (`tour_id`,`place_id`),
  KEY `visits_place_id_foreign` (`place_id`),
  CONSTRAINT `visits_place_id_foreign` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  CONSTRAINT `visits_tour_id_foreign` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,7,2),(1,9,4),(1,12,3),(1,13,1),(1,14,5),(2,1,3),(2,2,2),(2,15,1),(2,16,4),(2,17,5),(3,18,1),(3,19,2),(3,20,3),(3,21,4),(4,3,1),(4,4,2),(4,5,4),(4,22,3),(5,23,2),(5,24,3),(5,48,1),(6,6,2),(6,22,1),(6,25,3),(6,27,4),(7,26,1),(7,28,2),(8,29,1),(8,30,2),(8,31,3),(8,32,4),(8,33,5),(8,34,6),(9,35,1),(9,36,2),(9,37,3),(9,38,4),(10,39,1),(10,40,2),(10,41,3),(10,42,4),(10,43,5),(11,44,1),(11,45,2),(11,46,3),(11,47,4),(12,8,1),(12,10,3),(12,11,2),(13,49,1),(13,50,2),(13,51,3),(13,52,4),(13,53,5),(13,54,6),(13,55,7),(13,56,8),(13,57,9),(13,58,10);
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `tour_id` bigint unsigned NOT NULL,
  `guide_id` bigint unsigned NOT NULL,
  UNIQUE KEY `works_tour_id_guide_id_unique` (`tour_id`,`guide_id`),
  KEY `works_guide_id_foreign` (`guide_id`),
  CONSTRAINT `works_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`),
  CONSTRAINT `works_tour_id_foreign` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` VALUES (2,41),(5,41),(6,41),(12,41),(9,42),(2,43),(5,43),(4,44),(8,44),(1,45),(4,45),(9,45),(5,46),(3,47),(4,47),(3,48),(4,48),(12,48),(10,49),(12,49),(6,50),(12,51),(1,52),(8,52),(11,52),(4,53),(7,53),(8,53),(11,53),(10,54),(11,54),(8,55),(2,56),(3,56),(7,56),(9,56),(11,57),(1,58),(3,58),(1,59),(2,59),(8,59),(11,59),(12,59),(2,60),(7,60),(2,81),(4,81),(5,83),(10,83),(12,83),(13,83),(3,84),(7,84),(5,85),(7,85),(8,85),(5,88),(6,88),(10,88);
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-12 14:51:47
