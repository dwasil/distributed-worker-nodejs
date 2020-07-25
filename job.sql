--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;

CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'NEW',
  `http_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'http://ya.ru','NEW',NULL),(2,'https://google.com','NEW',NULL),(3,'asdfasdfads','NEW',NULL),(4,'mail.ru','NEW',NULL),(5,'https://reddit.com','NEW',NULL);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;