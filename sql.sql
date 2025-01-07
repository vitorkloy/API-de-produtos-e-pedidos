-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema projeto_terceiro_bim
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto_terceiro_bim
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto_terceiro_bim` DEFAULT CHARACTER SET utf8 ;
USE `projeto_terceiro_bim` ;

-- -----------------------------------------------------
-- Table `projeto_terceiro_bim`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_terceiro_bim`.`usuarios` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto_terceiro_bim`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_terceiro_bim`.`pedidos` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_pedido` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status` VARCHAR(20) NOT NULL DEFAULT 'pendente',
  `valor_total` DECIMAL(10,2) UNSIGNED NOT NULL,
  `usuarios_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_pedidos_usuarios_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_pedidos_usuarios`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `projeto_terceiro_bim`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto_terceiro_bim`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_terceiro_bim`.`produtos` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` TEXT NOT NULL,
  `preco` DECIMAL(10,2) UNSIGNED NOT NULL,
  `estoque` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto_terceiro_bim`.`pedidos_has_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_terceiro_bim`.`pedidos_has_produtos` (
  `pedidos_id` INT(10) UNSIGNED NOT NULL,
  `produtos_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`pedidos_id`, `produtos_id`),
  INDEX `fk_pedidos_has_produtos_produtos1_idx` (`produtos_id` ASC),
  INDEX `fk_pedidos_has_produtos_pedidos1_idx` (`pedidos_id` ASC),
  CONSTRAINT `fk_pedidos_has_produtos_pedidos1`
    FOREIGN KEY (`pedidos_id`)
    REFERENCES `projeto_terceiro_bim`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_produtos_produtos1`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `projeto_terceiro_bim`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
