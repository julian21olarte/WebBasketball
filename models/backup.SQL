-- MySQL dump 10.13  Distrib 5.7.16, for Linux (x86_64)
--
-- Host: localhost    Database: CañonerosCucuta
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `usuario` varchar(10) DEFAULT NULL,
  `contraseña` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('julian','julian');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `lugar_nac` varchar(50) NOT NULL,
  `fecha_nac` date NOT NULL,
  `documento` varchar(12) NOT NULL,
  `estatura` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `categoria` int(11) NOT NULL,
  `estudios` varchar(200) DEFAULT NULL,
  `proyeccion` varchar(200) DEFAULT NULL,
  `tipo_sangre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alumno_categoria` (`categoria`),
  CONSTRAINT `fk_alumno_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,'julian','olarte','Bucaramanga','1994-12-23','1090483724',186,90,'5940470',5,'universidad','Campeon NBA','O+'),(2,'mary','marin','cucuta','2016-11-15','9999999999',166,45,'11111111111',6,'universitarios','ing sistemas','O+'),(3,'bayardo','pineda','cucuta','1994-10-12','1098457434',180,90,'3105756788',4,'universitarios','ing sistemas','AB+'),(4,'rocky','marin','cucuta','1970-01-12','346743234',120,45,'3203348567',3,'ninguno','ser un perro feliz.','AB+'),(6,'mario','benedetti','bucaramanga','2016-11-18','5324235425',178,78,'67657567',5,'ninguno','trabajar en una empresa','AB+');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `edad_min` int(11) NOT NULL,
  `edad_max` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'compotas',5,7),(2,'premini',8,10),(3,'mini',11,12),(4,'infantil',13,14),(5,'junior',15,17),(6,'sub20',18,20);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `noticia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_imagen_noticia` (`noticia`),
  CONSTRAINT `fk_imagen_noticia` FOREIGN KEY (`noticia`) REFERENCES `noticia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES (3,'img12.jpg',3),(4,'img13.jpg',4),(5,'1477437418401-imgprueba.jpg',5),(6,'1480250486250-img19.jpg',6),(7,'1480675211826-fondo4.jpg',7);
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticia`
--

DROP TABLE IF EXISTS `noticia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `cuerpo` varchar(2000) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticia`
--

LOCK TABLES `noticia` WRITE;
/*!40000 ALTER TABLE `noticia` DISABLE KEYS */;
INSERT INTO `noticia` VALUES (3,'noticia de prueba3','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2016-10-18'),(4,'noticia de prueba4','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ','2016-10-18'),(5,'Partido en la Toto Hernandez','El Futuro del Baloncesto del Norte esta presente gracias a la asociación de entrenadores.\r\nEs una realidad!\r\nA los padres de familia que siempre nos apoyan mil gracias.','2016-10-25'),(6,'noticia de prueba 7','\r\n	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\n	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n','2016-11-27'),(7,'noticia de prueba 15','esto es un texto de prueba para la noticia de prueba 15.','2016-12-02');
/*!40000 ALTER TABLE `noticia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `padre`
--

DROP TABLE IF EXISTS `padre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `padre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `genero` varchar(2) NOT NULL,
  `ocupacion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `padre`
--

LOCK TABLES `padre` WRITE;
/*!40000 ALTER TABLE `padre` DISABLE KEYS */;
INSERT INTO `padre` VALUES (1,'arturo benedetti','523542','M','supervisor de claro'),(2,'martha benedetti','666','F','ama de casa'),(3,'arturo benedetti','523542','M','supervisor de claro'),(4,'martha benedetti','666','F','ama de casa'),(5,'arturo benedetti','523542','M','supervisor de claro'),(6,'martha benedetti','666','F','ama de casa'),(7,'arturo benedetti','523542','M','supervisor de claro'),(8,'martha benedetti','666','F','ama de casa'),(9,'luz mary muñoz','5654645645','F','ama de casa'),(10,'Marco adarme jaimes','3204958876','M','Ingeniero de sistemas UFPS');
/*!40000 ALTER TABLE `padre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `padre_alumno`
--

DROP TABLE IF EXISTS `padre_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `padre_alumno` (
  `padre` int(11) NOT NULL,
  `alumno` int(11) NOT NULL,
  PRIMARY KEY (`padre`,`alumno`),
  KEY `fk_padre_alumno_alumno` (`alumno`),
  CONSTRAINT `fk_padre_alumno_alumno` FOREIGN KEY (`alumno`) REFERENCES `alumno` (`id`),
  CONSTRAINT `fk_padre_alumno_padre` FOREIGN KEY (`padre`) REFERENCES `padre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `padre_alumno`
--

LOCK TABLES `padre_alumno` WRITE;
/*!40000 ALTER TABLE `padre_alumno` DISABLE KEYS */;
INSERT INTO `padre_alumno` VALUES (9,2),(10,3),(1,6),(2,6);
/*!40000 ALTER TABLE `padre_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno` int(11) NOT NULL,
  `fecha_pago` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pago_alumno` (`alumno`),
  CONSTRAINT `fk_pago_alumno` FOREIGN KEY (`alumno`) REFERENCES `alumno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,6,'2016-11-25'),(2,2,'2016-11-25'),(3,4,'2016-11-26'),(4,6,'2016-11-26'),(5,3,'2016-05-12'),(6,1,'2016-12-02'),(7,4,'2016-12-09'),(8,6,'2016-12-09');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-09 15:02:02
