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
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `registration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `description` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cars_registration_unique` (`registration`),
  KEY `cars_guide_id_foreign` (`guide_id`),
  CONSTRAINT `cars_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,40,'17-CC-56','Mercedes','Tourer','Green','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(2,41,'37-TB-84','Land-Rover','Defender','Grey','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(3,42,'60-ZX-75','BMW','Sedan','Blue','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(4,43,'14-AL-69','BMW','X1 Drive','Green','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(5,44,'31-RF-40','SEAT','Alhambra','Blue','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(6,45,'32-EQ-75','BMW','X1 Drive','Red','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(7,46,'77-YL-85','BMW','X1 Drive','White','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(8,47,'61-WX-69','Mercedes-Benz','G-Class','Red','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(9,48,'45-PQ-75','BMW','X1 Drive','Blue','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(10,49,'82-XR-68','Mercedes','Cabrio','Grey','Premium','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(11,50,'31-TI-71','BMW','Sedan','Green','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(12,51,'81-QQ-93','Hyundai','Elantra','Blue','Economic','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(13,52,'36-PQ-56','Mercedes-Benz','G-Class','Blue','Off-Road','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(14,53,'11-GX-23','Dacia','Spring','Blue','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(15,54,'85-HV-23','Honda','Civic','White','Economic','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(16,55,'36-BN-14','Fiat','Grande Panda','White','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(17,56,'41-VA-20','Volvo','EX30','Black','Green','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(18,57,'12-LI-26','SEAT','Alhambra','Red','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(19,58,'85-BZ-41','SEAT','Alhambra','Blue','XL','2025-07-29 09:32:55','2025-07-29 09:32:55',7,NULL),(20,59,'88-UX-24','BMW','X1 Drive','Black','Comfort','2025-07-29 09:32:55','2025-07-29 09:32:55',5,NULL),(23,81,'AA-22-22','Honda','Civic','Grey','',NULL,NULL,5,'Great car for everyone!'),(24,83,'AA-33-33','BMW','7 Series','White','',NULL,NULL,5,'Perfect for your dream vacations!'),(25,84,'AA-44-44','Fiat','500','Grey','',NULL,NULL,5,'Awesome!'),(26,85,'AA-33-AA','Opel','Corsa','Blue','',NULL,NULL,5,'A great car for your and your family!'),(27,88,'AA-44-AA','Opel','Corsa','Blue','',NULL,NULL,5,'');
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
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
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
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
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
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Fajã dos Padres',32.6569092,-17.0217725,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(2,'Cabo Girão',32.6554974,-17.0042461,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(3,'Paul da Serra',32.7333325,-17.05,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(4,'Miradouro Fonte do Bispo',32.7916168,-17.1813683,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(5,'PR6 - Levada das 25 Fontes',32.761631,-17.1343465,'Levada','2025-07-29 09:32:55','2025-07-29 09:32:55'),(6,'PR6.2 - Levada do Alecrim',32.7535642,-17.132658,'Levada','2025-07-29 09:32:55','2025-07-29 09:32:55'),(7,'Sé Catedral do Funchal',32.648131,-16.9082826,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(8,'Santuário de Nossa Senhora do Monte',32.6760681,-16.9025329,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(9,'Zona Histórica do Funchal',32.6481837,-16.9067224,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(10,'Jardim Botânico da Madeira',32.6624106,-16.8973293,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(11,'Monte Palace Madeira',32.6755872,-16.9030891,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(12,'Mercado dos Lavradores',32.6486355,-16.9066781,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(13,'Palácio de São Lourenço',32.6473681,-16.9121891,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(14,'Praia da Barreirinha',32.646777,-16.9000236,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(15,'Porto de Câmara de Lobos',32.6474273,-16.9775258,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(16,'Museu Etnográfico da Madeira',32.6729365,-17.0659599,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(17,'Miradouro do Cascalho',32.6831628,-17.0941049,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(18,'Praia da Calheta',32.7203533,-17.1808888,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(19,'Cascata dos Anjos',32.6866444,-17.1163981,'Natureza','2025-07-29 09:32:55','2025-07-29 09:32:55'),(20,'Paúl do Mar',32.7594054,-17.2403277,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(21,'Farol da Ponta do Pargo',32.8141632,-17.2629651,'Cultura','2025-07-29 09:32:55','2025-07-29 09:32:55'),(22,'Miradouro do Rabaçal',32.7555468,-17.1368435,'Miradouro','2025-07-29 09:32:55','2025-07-29 09:32:55'),(23,'Praia do Porto do Seixal',32.8243261,-17.1191889,'Praia','2025-07-29 09:32:55','2025-07-29 09:32:55'),(24,'Miradouro do Véu da Noiva',32.8161303,-17.0951768,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(25,'Lagoa do Vento',32.7599331,-17.1244598,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(26,'Praia do Garajau',32.6384505,-16.8554634,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(27,'Parque Florestal do Fanal',32.8096186,-17.1464375,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(28,'Cristo Rei do Garajau',32.6385112,-16.8505668,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(29,'Miradouro da Eira do Serrado',32.7101168,-16.968313,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(30,'Pico do Areeiro',32.7355555,-16.928889,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(31,'Miradouro do Ninho da Manta',32.73938,-16.9364293,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(32,'Ribeiro Frio',32.7333325,-16.883333,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(33,'PR11 - Levada dos Balcões',32.7355351,-16.8889498,'Levada','2025-07-29 09:32:56','2025-07-29 09:32:56'),(34,'Miradouro dos Balcões',32.741563,-16.8928561,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(35,'Ponta de São Lourenço',32.7433741,-16.7035143,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(36,'Miradouro da Ponta do Rosto',32.7504235,-16.7103563,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(37,'Prainha do Caniçal',32.7429043,-16.7366545,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(38,'Museu da Baleia da Madeira',32.7358335,-16.7430505,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(39,'Casas Típicas de Santana',32.8057436,-16.8864322,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(40,'Parque Florestal das Queimadas',32.7835011,-16.9084632,'Natureza','2025-07-29 09:32:56','2025-07-29 09:32:56'),(41,'PR9 - Levada do Caldeirão Verde',32.7823286,-16.904947,'Levada','2025-07-29 09:32:56','2025-07-29 09:32:56'),(42,'Praia do Faial',32.7923549,-16.8705636,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(43,'Ruínas de São Jorge',32.8298951,-16.9002617,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(44,'Miradouro da Beira da Quinta',32.8265907,-16.9415523,'Miradouro','2025-07-29 09:32:56','2025-07-29 09:32:56'),(45,'Complexo Balnear da Ponta Delgada',32.8277861,-16.9874114,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56'),(46,'Capela dos Reis Magos',32.8269424,-16.9889235,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(47,'Solar do Aposento',32.8222849,-16.9915008,'Cultura','2025-07-29 09:32:56','2025-07-29 09:32:56'),(48,'Pisicinas Naturais do Porto Moniz',32.8682755,-17.1712129,'Praia','2025-07-29 09:32:56','2025-07-29 09:32:56');
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
  `rating_tour` int NOT NULL,
  `rating_guide` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservations_tour_id_foreign` (`tour_id`),
  KEY `reservations_guide_id_foreign` (`guide_id`),
  KEY `reservations_user_id_foreign` (`user_id`),
  CONSTRAINT `reservations_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_tour_id_foreign` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_rating_guide` CHECK ((`rating_guide` between 0 and 50)),
  CONSTRAINT `chk_rating_tour` CHECK ((`rating_tour` between 0 and 50))
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,5,60,26,38,37,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(2,12,52,28,46,3,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(3,2,41,32,13,30,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(4,1,47,47,30,42,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(5,12,52,25,10,0,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(6,11,54,39,28,5,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(7,1,47,25,32,27,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(8,1,47,31,40,5,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(9,12,52,15,3,2,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(10,2,41,38,5,16,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(11,11,54,15,12,26,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(12,11,54,50,36,34,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(13,5,60,42,24,20,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(14,5,60,36,30,20,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(15,1,47,25,50,18,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(16,1,47,4,23,34,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(17,2,41,23,39,3,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(18,5,60,27,24,33,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(19,2,41,56,20,41,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(20,1,47,50,9,0,'2025-07-28 08:29:00','2025-07-28 08:29:00'),(21,9,49,1,25,43,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(22,2,41,11,36,25,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(23,7,48,29,47,18,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(24,1,47,50,4,9,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(25,12,52,13,10,27,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(26,1,47,7,17,49,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(27,4,48,47,44,4,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(28,7,48,60,12,16,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(29,1,44,5,39,17,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(30,12,52,50,38,7,'2025-07-28 09:25:45','2025-07-28 09:25:45'),(31,1,44,27,29,39,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(32,12,52,38,25,15,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(33,7,48,37,3,18,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(34,5,51,47,20,31,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(35,9,49,30,50,42,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(36,11,56,2,4,14,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(37,4,48,48,38,27,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(38,1,47,9,19,24,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(39,7,48,15,10,13,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(40,5,44,5,21,8,'2025-07-28 09:25:46','2025-07-28 09:25:46'),(41,1,47,22,17,21,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(42,2,60,41,4,46,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(43,5,60,48,19,39,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(44,7,48,51,17,17,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(45,10,48,55,5,47,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(46,12,52,1,38,18,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(47,7,48,31,8,44,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(48,11,42,56,33,42,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(49,12,52,24,27,39,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(50,2,60,26,7,2,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(51,4,56,37,13,22,'2025-07-29 09:32:56','2025-07-29 09:32:56'),(52,10,48,36,37,48,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(53,10,48,46,13,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(54,7,48,58,26,10,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(55,10,48,13,49,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(56,12,52,31,11,31,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(57,10,48,38,24,46,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(58,5,60,19,22,34,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(59,1,56,23,28,30,'2025-07-29 09:32:57','2025-07-29 09:32:57'),(60,10,48,57,30,9,'2025-07-29 09:32:57','2025-07-29 09:32:57');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tour_image` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (1,'Funchal Tour','04:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(2,'Rota Oeste','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(3,'Visit Calheta','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(4,'Paul da Serra Tour','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(5,'Visit Porto Moniz','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(6,'Visit São Vicente','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(7,'Garajau Tour','04:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(8,'Mountain Tour','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(9,'Caniçal Tour','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(10,'Visit Santana','06:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(11,'Ponta Delgada Tour','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(12,'Funchal Gardens','05:00:00','2025-07-29 09:32:55','2025-07-29 09:32:55',NULL);
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
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `profile_image` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Carlos Ochoa','carlos.ochoa@gmail.com',0,NULL,'$2y$12$BESXqo70NWNG9zTBm/BZSumDsz1A94VKJWLHxCqxMB5e8zVq2ZG9.',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL),(2,'Michel Guyot','michel.guyot@gmail.com',0,NULL,'$2y$12$eVBSRUXyxiJl2PTqHeCxT./q0RR.KVtbnpnkWxkrSHBpYfD5R06.O',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL),(3,'Sarah Reis','sarah.reis@gmail.com',0,NULL,'$2y$12$e6BQJSQLB4mgYyPVaVEkOu0FYB1i2ySChijdSqBNWaKjxraodp75m',NULL,'2025-07-29 09:32:38','2025-07-29 09:32:38',NULL),(4,'Bernadette Diallo','bernadette.diallo@gmail.com',0,NULL,'$2y$12$Vo4OYwflvONUoP1D.mrNVeyPuSdkIIffiir/YZwBy5kU18M8F70c.',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL),(5,'Christopher Gautier','christopher.gautier@gmail.com',0,NULL,'$2y$12$pkWdL6uRCD9YCWkXvVNwveA8Xx8kbRAo2vMQyKXsmT9x3m0yj6Hfu',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL),(6,'Julie Griffin','julie.griffin@gmail.com',0,NULL,'$2y$12$UkI0e7THky0VMMif9Sq/SuRpAWYMWiDf5boNQdT5wQL6qw0ug9q0u',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL),(7,'Tatiana Rodrigues','tatiana.rodrigues@gmail.com',0,NULL,'$2y$12$mGaXGv9vLToJCznMQLGbeu/l6Klt4OE.eCVCeiLbYFXejr00mqz9W',NULL,'2025-07-29 09:32:39','2025-07-29 09:32:39',NULL),(8,'Dinis Vargas','dinis.vargas@gmail.com',0,NULL,'$2y$12$I.yXqQwUWhpkg.PD2mfP3ul4URsgXAj9rMeDe/kC3fHMvsPggt0UK',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL),(9,'Agostino Allen','agostino.allen@gmail.com',0,NULL,'$2y$12$iQrA5/klToEZVUHxvvRG5.ErUqlEWCYb5OEeT6SI5M1muy8W2qpqS',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL),(10,'Gino Blanc','gino.blanc@gmail.com',0,NULL,'$2y$12$v3z8sZjO/JhilNDRPKydSuVS7OsSUlMNjbLq3AwhXmymX1.g4W06m',NULL,'2025-07-29 09:32:40','2025-07-29 09:32:40',NULL),(11,'Angelica Leal','angelica.leal@gmail.com',0,NULL,'$2y$12$cwuTl80nwv2pcFu9VUYePOYgN4Ed8FjhDusYSke6Qz.0aFohuelS.',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL),(12,'Marissa Telesio','marissa.telesio@gmail.com',0,NULL,'$2y$12$DKhHEBlMLlXamDicFVO6tOKSQLY5AUk0Mx0xvJL6swuvaWAUxMPHK',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL),(13,'Giovanna Davis','giovanna.davis@gmail.com',0,NULL,'$2y$12$2EmC2RnV/.zARbFkmFPbSOoXIGpaIRux8.lY8c9PyLfuxriW8v8MW',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL),(14,'Mary Marini','mary.marini@gmail.com',0,NULL,'$2y$12$gY6ac9XqBTUIN.oZR8ZJweBgZowj05TwWt4TUFFvmdDNHDjAwJH0i',NULL,'2025-07-29 09:32:41','2025-07-29 09:32:41',NULL),(15,'Suzanne Laurent','suzanne.laurent@gmail.com',0,NULL,'$2y$12$XL9oh9vMBkiUCqaHNy3uKenx9EMg0QEkUS73yfvG9M75tRAcHHGpG',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL),(16,'Caroline Staglieno','caroline.staglieno@gmail.com',0,NULL,'$2y$12$t6pGYcpM0/qHilzxaWIML.HlhhvFFxJjcSp97nskTzaKCRUfxZ3mu',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL),(17,'John Buisson','john.buisson@gmail.com',0,NULL,'$2y$12$H5Yc64Kwk1i6DkiZ8epfcOIDsMujqcFRBkcqSd3K2xpODFgkuYazW',NULL,'2025-07-29 09:32:42','2025-07-29 09:32:42',NULL),(18,'Margot Saracino','margot.saracino@gmail.com',0,NULL,'$2y$12$/WrAKs7oNGFFKENxQZa6ueCJAPjU6oUZXYw8xR/NLlRPuAC0Cpvhi',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL),(19,'Gianpietro Salvini','gianpietro.salvini@gmail.com',0,NULL,'$2y$12$pEo5UjlRVgmvFYWyt6wCS.mAtg0RKDaXC0eBpavtFOO.jpA6hm1mm',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL),(20,'Alessandra Pottier','alessandra.pottier@gmail.com',0,NULL,'$2y$12$8/Zom9NhOh/CQo8EqENj3OBQlLeu3i1Djn9Ez8LIp//X1oKIUAKD.',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL),(21,'Mandy Philippe','mandy.philippe@gmail.com',0,NULL,'$2y$12$BVXtkn/Wss1ONzd489rSUOasESorieAKaE1jkfn8ofbgcX5g.237u',NULL,'2025-07-29 09:32:43','2025-07-29 09:32:43',NULL),(22,'Vincent King','vincent.king@gmail.com',0,NULL,'$2y$12$wjNuIPGszO7R1SRBFrjouO6JKMu62fDmPeyHQL3QfqH8GVhuKplru',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL),(23,'Nadia Leite','nadia.leite@gmail.com',0,NULL,'$2y$12$kwfPmSCeHK8X88vaXSoZBO4/fUB79BP8UxPI.t/BRQJq4Of5W2lL.',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL),(24,'Daniel Scialpi','daniel.scialpi@gmail.com',0,NULL,'$2y$12$6fdB/a8pTnPyOgFYllAcq.kvvEu6qIdL/8ScGLd1yLGIYrIi/piM2',NULL,'2025-07-29 09:32:44','2025-07-29 09:32:44',NULL),(25,'Leopoldo Castro','leopoldo.castro@gmail.com',0,NULL,'$2y$12$2yAxFEQjzb0xpUe7EgaxFeF62316S/Cxt4/AkmHvX0Xxf1NoTbzUG',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL),(26,'Julie Mccoy','julie.mccoy@gmail.com',0,NULL,'$2y$12$cTTxCPX9Vduc5HwWvvvDU.f80c0hhmFtOZ5ma8bIXPjTB1ixOsNHK',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL),(27,'Ivo Dos Santos','ivo.dos.santos@gmail.com',0,NULL,'$2y$12$j2yLxQkBg2SSohrMwEYeB.KJbZ7t7w33uZfHfKbqyfTKmihEy.c6.',NULL,'2025-07-29 09:32:45','2025-07-29 09:32:45',NULL),(28,'Taylor Bonino','taylor.bonino@gmail.com',0,NULL,'$2y$12$JHqClQ45l/wbUjXtfzusnOB3zNtkql9AA2BfOC1euVzp9wkr1ks9C',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL),(29,'Giacomo Raurica','giacomo.raurica@gmail.com',0,NULL,'$2y$12$DZSe.AhM8ssqc1vru/NEquQHQSB4q2JmwUmAUkDJK99oBtuu6y1JO',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL),(30,'Michelle Faria','michelle.faria@gmail.com',0,NULL,'$2y$12$639d3Fu.PxeC5pETZ76LRuoRXUHG6A59DAeduIJypOhvRm8uB5z6W',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL),(31,'Pauline Rapisardi','pauline.rapisardi@gmail.com',0,NULL,'$2y$12$BMkTTDsZ92dWiYB/7k5nhO0UROLptbRdPSeqEuNA5tMEq/Zb4c.YS',NULL,'2025-07-29 09:32:46','2025-07-29 09:32:46',NULL),(32,'Beppe Gentili','beppe.gentili@gmail.com',0,NULL,'$2y$12$yGXdgJIi.pxm4CoU02v.ouyCvzv8gQ44trKuRGAHY/fU6TQ/3tGMa',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL),(33,'Elisa Lloyd','elisa.lloyd@gmail.com',0,NULL,'$2y$12$7Bop7zZHwLlGtsLnfipoaulnfx2FQ1Gog.HGXKKkokiXVDRsyj6G6',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL),(34,'Kendra Ricolfi','kendra.ricolfi@gmail.com',0,NULL,'$2y$12$fW2oVMYQ/VvHzmspsY/JUOpmukozmhzO3jfp/2HHwgMuz1KhBKlGC',NULL,'2025-07-29 09:32:47','2025-07-29 09:32:47',NULL),(35,'Lisa Trombetta','lisa.trombetta@gmail.com',0,NULL,'$2y$12$XB877UNo1EMASWAMsPorvelzKMXGJRfwLrRzRokALd4GNlY88EFw.',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL),(36,'Danielle Almeida','danielle.almeida@gmail.com',0,NULL,'$2y$12$TCSsYBsSJzrkCGPJqFxtweFaumLHkvW7YgGL5HDpRv8eOW84izinW',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL),(37,'Vincenza Marsili','vincenza.marsili@gmail.com',0,NULL,'$2y$12$ZFJ.PyPssfnLoou5QLTXiOdAAtJN3fCPM6cNgOldUTDfQGx155YRm',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL),(38,'Patricia Murray','patricia.murray@gmail.com',0,NULL,'$2y$12$/0fTp2OhEEPMqfDle7BVNe5aI0L1YzAfE6Ekb6XIXOMYAlgBZDgjy',NULL,'2025-07-29 09:32:48','2025-07-29 09:32:48',NULL),(39,'David Rousseau','david.rousseau@gmail.com',0,NULL,'$2y$12$izgdHum2SW6FjrGds0CA4O8FQ4o/6/zb/CrfO.y5QPEmzsxuQGIRm',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL),(40,'Martina Pacillo','martina.pacillo@gmail.com',0,NULL,'$2y$12$wfD3pNLM53Ipl4JAPlhvbu4Lp88XuQnneP8f1s0eOazwOLABf/LPu',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL),(41,'Michael Jimenez','michael.jimenez@gmail.com',1,NULL,'$2y$12$xFz7PflWvfsDHGv9u6.GnOSFHAVtB7izuuNo5wtfU5pW.uD/G/7I2',NULL,'2025-07-29 09:32:49','2025-07-29 09:32:49',NULL),(42,'Valentim Jourdan','valentim.jourdan@gmail.com',1,NULL,'$2y$12$VKDowd34wBCGLMO6jFQUf.BXGHPFKpR4yAVm2Xuog0A//47/tNl8G',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL),(43,'Laure Lourenco','laure.lourenco@gmail.com',1,NULL,'$2y$12$.3dSq77v3AlXNIAdb4ijbeNmBX4HuDkcersqzHINtG8EYDq/ljBre',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL),(44,'Danielle Lopez','danielle.lopez@gmail.com',1,NULL,'$2y$12$tZmRvf3rBP7g9E5AxV9QFukSHVoKIhVuYrKWK..9tqAdH4DpczOVu',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL),(45,'Oceane Brown','oceane.brown@gmail.com',1,NULL,'$2y$12$ozEbNwWujlv4lcwAupPANeZDfIkIjx2uCh7o.T/tGJTESF9a66SpS',NULL,'2025-07-29 09:32:50','2025-07-29 09:32:50',NULL),(46,'David Neves','david.neves@gmail.com',1,NULL,'$2y$12$WHtTvNpMebilMBI9mhe7/OD1KKb4b8A4YWjeqewAJ2Ju9BM878Yky',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL),(47,'Salvador Goncalves','salvador.goncalves@gmail.com',1,NULL,'$2y$12$dT1c0K7jTvapfTo.RqTf7O16XgkiBz0bu0btWRS2hvjBi19GWl2AC',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL),(48,'Daniel Faria','daniel.faria@gmail.com',1,NULL,'$2y$12$UHvJ0iStqdt9l8m7UDNEJuMn6GT7.iyeiZKg4BV/mbFkibo0Dzeje',NULL,'2025-07-29 09:32:51','2025-07-29 09:32:51',NULL),(49,'Sandro Lemaitre','sandro.lemaitre@gmail.com',1,NULL,'$2y$12$ROxwko31ICFDmbBS1MBese5ROUUQ690/Nfz5nAxostCk6FiSnLD8a',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL),(50,'Virginie Edwards','virginie.edwards@gmail.com',1,NULL,'$2y$12$xAnGzYLUQQOc.cK1efBUfeeusoCFFtXQTESP/FANNWC/uQWJOHby6',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL),(51,'Dante Dijoux','dante.dijoux@gmail.com',1,NULL,'$2y$12$Znt73/fk9b5e89vfLfzSGejvl08SUB9wLoKzAmqWGawVxv1cbpyy6',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL),(52,'James Walker','james.walker@gmail.com',1,NULL,'$2y$12$92zJPDty45HfvQ.IuI5bpOit01SakUdVz.DQZ3GU16prlKgB0.M1K',NULL,'2025-07-29 09:32:52','2025-07-29 09:32:52',NULL),(53,'Valentim Machado','valentim.machado@gmail.com',1,NULL,'$2y$12$2R9tIjPL83.ldfwRuZwwF.K60c1jcZAvujIAsz/2Yn2oMGWw/WpOa',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL),(54,'Nair Domingues','nair.domingues@gmail.com',1,NULL,'$2y$12$h0Tu3ODA5b4SUExqJ2.FN.J6Pi6xZDqwiSGBH0QuZF5LncOHzEpdW',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL),(55,'Adrien Loureiro','adrien.loureiro@gmail.com',1,NULL,'$2y$12$gBnmSedzzE.kh1Wtwrfm3.i1QiBeQaQCW/Igt5lDl8aaVn3eMMO/.',NULL,'2025-07-29 09:32:53','2025-07-29 09:32:53',NULL),(56,'Wendy Esteves','wendy.esteves@gmail.com',1,NULL,'$2y$12$VTdb9sDF9XqQpedKsAfgQun9W3iB8gqsl/LzS9yEr3nutNeHB/JAy',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL),(57,'Jeannine Spears','jeannine.spears@gmail.com',1,NULL,'$2y$12$e.6fSkHkhTYJbL1W31G8ruhDPgDMDbsXHcv7hUzB8qirvVayOc1dW',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL),(58,'Capucine Benigni','capucine.benigni@gmail.com',1,NULL,'$2y$12$wg5b7xaiNJdg7.uxww.w8eHIxxg3at/kyi2263vYD0fKBTCJfRv1S',NULL,'2025-07-29 09:32:54','2025-07-29 09:32:54',NULL),(59,'Patricia Daniel','patricia.daniel@gmail.com',1,NULL,'$2y$12$asSqpkPciAaUOjMjxJz3veRrJm7EuenJ3EhuDSF14qnL/AIcaUffK',NULL,'2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(60,'Alphonse Capecchi','alphonse.capecchi@gmail.com',1,NULL,'$2y$12$biuh6NhUTaFfS0W2Nw6/FeEY.iPR7YGTS2rDpuwzNqeFwoYXWRrZO',NULL,'2025-07-29 09:32:55','2025-07-29 09:32:55',NULL),(80,'Gonçalo Armando','goncalo.armando@gmail.com',0,NULL,'$2b$10$eo3R3M7KFg83mBchKnZYc.NP4izS/DO.HdCQ84CcrYS0OkPLWAQDK',NULL,'2025-08-04 12:39:33',NULL,NULL),(81,'Ana Maria','ana.maria@gmail.com',1,NULL,'$2b$10$0H0T0GCh5NvRW/eInaqLqedDQhz9RW5VH7wovNhFIV1hRtbS/l7GG',NULL,'2025-08-04 12:47:22',NULL,NULL),(82,'Super Mario','mario@gmail.com',0,NULL,'$2b$10$A3DFekyKHG7SbMV/Fn8mceBrRYNxN7okoHXwLNP6n4y1zisapHp1G',NULL,'2025-08-04 13:18:53',NULL,'uploads/mario.jpg'),(83,'Maria Sofia','maria.sofia@gmail.com',1,NULL,'$2b$10$UkezcKsayrkQj613NuXWUOcaLgE85aoOhs1alFMTLv8dhita7O/ji',NULL,'2025-08-04 13:27:26',NULL,'uploads/woman.jpg'),(84,'Paulo Soares','paulo.soares@gmail.com',1,NULL,'$2b$10$hd262afoTjMNSbPZm6wUJOMMqNN2J8Yu21f7glRsG.XvrcCA1RScO',NULL,'2025-08-04 14:11:48',NULL,'uploads/1754316707563-man.jpg'),(85,'João Mário','joao.mario@gmail.com',1,NULL,'$2b$10$yCYF1sBzpx39z6YFrYbQEetV8q7f5SzdCpTIQg/PiWNsfR9zIIx/2',NULL,'2025-08-05 10:34:13',NULL,NULL),(86,'Fabiana Esteves','fabiana.esteves@gmail.com',0,NULL,'$2b$10$HByy2dTvoRWsrEv2YWKveOcfrsSSwGxj.Xxc325fK.bDwbcpjKjhK',NULL,'2025-08-05 10:43:56',NULL,NULL),(87,'Carlos Freitas','carlos.freitas@gmail.com',0,NULL,'$2b$10$jqMXkx9PGZ5cN1JjeqgKp.CskmkvodHPs26WOu6/U4QOS0Rphgt3u',NULL,'2025-08-05 10:46:59',NULL,NULL),(88,'João Estrela','joao.estrela@gmail.com',1,NULL,'$2b$10$67WzyFPJElmegIGAt0oE9uqwaDmITtle6e3i2OqFGj/2M.yB0smoS',NULL,'2025-08-05 10:48:25',NULL,NULL);
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
INSERT INTO `visits` VALUES (1,7,2),(1,9,4),(1,12,3),(1,13,1),(1,14,5),(2,1,3),(2,2,2),(2,15,1),(2,16,4),(2,17,5),(3,18,1),(3,19,2),(3,20,3),(3,21,4),(4,3,1),(4,4,2),(4,5,4),(4,22,3),(5,23,2),(5,24,3),(5,48,1),(6,6,2),(6,22,1),(6,25,3),(6,27,4),(7,26,1),(7,28,2),(8,29,1),(8,30,2),(8,31,3),(8,32,4),(8,33,5),(8,34,6),(9,35,1),(9,36,2),(9,37,3),(9,38,4),(10,39,1),(10,40,2),(10,41,3),(10,42,4),(10,43,5),(11,44,1),(11,45,2),(11,46,3),(11,47,4),(12,8,1),(12,10,3),(12,11,2);
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
INSERT INTO `works` VALUES (2,41),(11,42),(1,44),(5,44),(1,47),(4,48),(7,48),(10,48),(9,49),(11,49),(5,51),(12,52),(11,54),(11,55),(1,56),(4,56),(11,56),(2,60),(5,60);
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

-- Dump completed on 2025-08-06 11:49:08
