-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: stocko
-- Source Schemata: stocko
-- Created: Fri Jul 07 14:15:38 2017
-- Workbench Version: 6.3.8
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema stocko
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `stocko` ;
CREATE SCHEMA IF NOT EXISTS `stocko` ;

-- ----------------------------------------------------------------------------
-- Table stocko.time_series_data
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `stocko`.`time_series_data` (
  `symbol` VARCHAR(8) NOT NULL,
  `data_string` LONGTEXT NULL DEFAULT NULL,
  `last_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`symbol`),
  UNIQUE INDEX `symbol_UNIQUE` (`symbol` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
SET FOREIGN_KEY_CHECKS = 1;
