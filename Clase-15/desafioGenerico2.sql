-- Mediante en uso del cliente MySQL Workbench realizar las siguientes tareas:
-- Crear una tabla dentro de esa base con el nombre 'usuarios' que contenga los siguientes campos:
-- - 'nombre' del tipo varchar no nulo
-- - 'apellido' del tipo varchar no nulo
-- - 'edad' del tipo entero sin signo
-- - 'email' del tipo varchar no nulo
-- - 'id' clave primaria autoincremental no nula
-- Insertar estos 3 usuarios en esa tabla:
--     - Juan Perez, edad 23, jp@gmail.com
--     - Pedro Mei, edad 21, pm@gmail.com
--     - Juana Suarez, edad 25, js@gmail.com
-- Listar los usuarios agregados 
-- Borrar el usuario con id = 2
-- Actualizar la edad del usuario con id = 1 a 24 años
-- Listar los registros comprobando que los datos estén actualizados según las acciones realizadas.



CREATE TABLE `test`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `edad` INT UNSIGNED NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


INSERT INTO `test`.`usuarios` (`nombre`, `apellido`, `edad`, `email`) VALUES ('Juan', 'Perez', '23', 'jp@gmail.com');
INSERT INTO `test`.`usuarios` (`nombre`, `apellido`, `edad`, `email`) VALUES ('Pedro', 'Mei', '21', 'pm@gmail.com');
INSERT INTO `test`.`usuarios` (`nombre`, `apellido`, `edad`, `email`) VALUES ('Juana', 'Suarez', '25', 'js@gmail.com');

SELECT * FROM test.usuarios;

DELETE FROM `test`.`usuarios` WHERE (`id` = '2');

UPDATE `test`.`usuarios` SET `edad` = '24' WHERE (`id` = '1');

SELECT * FROM test.usuarios