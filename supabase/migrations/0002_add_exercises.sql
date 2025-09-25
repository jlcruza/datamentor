-- Exercises for Module 1: Introduction to Databases

-- Lesson 1: ¿Qué es una base de datos?
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (1, 1, '¿Cuál es el propósito principal de una base de datos?', 'Una base de datos está diseñada para almacenar y organizar datos de manera eficiente, permitiendo un acceso, gestión y actualización sencillos.'),
    (2, 1, '¿En qué se diferencia una base de datos de una simple colección de archivos de texto para gestionar datos?', 'Las bases de datos proporcionan mecanismos para el acceso concurrente, la integridad de los datos y la recuperación, características que no se encuentran en un sistema de archivos planos.'),
    (3, 1, 'Una pequeña empresa quiere hacer un seguimiento de sus clientes, pedidos y productos. ¿Qué estructura sería más adecuada para gestionar esta información de forma eficaz?', 'Una base de datos relacional es ideal para gestionar datos interrelacionados como clientes, pedidos y productos, ya que puede establecer relaciones entre ellos.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 1
    (1, 'Para crear hojas de cálculo.', FALSE),
    (1, 'Para almacenar y organizar datos de forma estructurada.', TRUE),
    (1, 'Para diseñar sitios web.', FALSE),
    (1, 'Para escribir código de programación.', FALSE),
    -- Options for exercise 2
    (2, 'Una base de datos es menos segura.', FALSE),
    (2, 'No hay ninguna diferencia.', FALSE),
    (2, 'Las bases de datos ofrecen funciones avanzadas como control de concurrencia e integridad de datos.', TRUE),
    (2, 'Los archivos de texto son más rápidos para consultas complejas.', FALSE),
    -- Options for exercise 3
    (3, 'Una única hoja de cálculo con toda la información.', FALSE),
    (3, 'Archivos de texto separados para clientes, pedidos y productos.', FALSE),
    (3, 'Una base de datos relacional con tablas para clientes, pedidos y productos.', TRUE),
    (3, 'Un documento de Word.', FALSE);

-- Lesson 2: Datos en la vida cotidiana
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (4, 2, '¿Cuándo es más apropiado usar una hoja de cálculo en lugar de una base de datos?', 'Las hojas de cálculo son ideales para análisis de datos rápidos y a pequeña escala, cálculos y visualizaciones simples donde no se necesita una gestión de datos compleja.'),
    (5, 2, 'Imagina que estás organizando una biblioteca de música personal. ¿Qué ventaja clave ofrecería una base de datos sobre una hoja de cálculo a medida que tu colección crece?', 'A medida que los datos crecen, las bases de datos manejan las relaciones (como artistas, álbumes y canciones) de manera mucho más eficiente y con menos redundancia que las hojas de cálculo.'),
    (6, 2, 'Un equipo de investigación necesita registrar datos de experimentos, donde cada experimento tiene múltiples mediciones y está vinculado a un proyecto específico. Planean tener miles de registros. ¿Deberían usar una hoja de cálculo o una base de datos?', 'La naturaleza estructurada y relacional de los datos (proyectos, experimentos, mediciones) y el gran volumen de registros hacen que una base de datos sea la opción superior para la integridad y la eficiencia de las consultas.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 4
    (4, 'Para gestionar grandes volúmenes de datos transaccionales.', FALSE),
    (4, 'Para un análisis de datos rápido y a pequeña escala por un solo usuario.', TRUE),
    (4, 'Cuando varios usuarios necesitan acceder y modificar los datos simultáneamente.', FALSE),
    (4, 'Para garantizar la integridad de los datos a largo plazo.', FALSE),
    -- Options for exercise 5
    (5, 'Las hojas de cálculo son mejores para crear listas de reproducción.', FALSE),
    (5, 'Las bases de datos gestionan mejor las relaciones entre artistas, álbumes y canciones sin duplicar datos.', TRUE),
    (5, 'Es más fácil introducir datos en una hoja de cálculo.', FALSE),
    (5, 'Las hojas de cálculo ofrecen una mejor calidad de sonido.', FALSE),
    -- Options for exercise 6
    (6, 'Una hoja de cálculo, porque es más fácil para el análisis inicial.', FALSE),
    (6, 'Una base de datos, porque puede gestionar las relaciones entre proyectos y mediciones y escalar eficazmente.', TRUE),
    (6, 'Cualquiera de las dos funcionaría igual de bien.', FALSE),
    (6, 'Una serie de documentos de texto para cada experimento.', FALSE);

-- Lesson 3: Sistemas de gestión de bases de datos
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (7, 3, '¿Cuál es la función principal de un Sistema de Gestión de Bases de Datos (SGBD)?', 'Un SGBD es un software que actúa como intermediario entre el usuario y la base de datos, permitiendo a los usuarios crear, leer, actualizar y eliminar datos de forma controlada.'),
    (8, 3, '¿Qué caracteriza principalmente a una base de datos relacional (SQL)?', 'Las bases de datos relacionales organizan los datos en tablas con filas y columnas, y utilizan SQL para gestionarlos. La estructura y las relaciones predefinidas son fundamentales.'),
    (9, 3, 'Una empresa de redes sociales necesita almacenar perfiles de usuario, publicaciones y conexiones de amistad. Los datos no son estructurados y el volumen crece rápidamente. ¿Qué tipo de SGBD sería más adecuado?', 'Las bases de datos NoSQL, como las de grafos o documentos, son más flexibles para datos no estructurados y escalan horizontalmente con mayor facilidad, lo que las hace ideales para aplicaciones de redes sociales.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 7
    (7, 'Diseñar la interfaz de usuario de una aplicación.', FALSE),
    (7, 'Actuar como intermediario entre el usuario y la base de datos.', TRUE),
    (7, 'Escribir el sistema operativo.', FALSE),
    (7, 'Conectarse a internet.', FALSE),
    -- Options for exercise 8
    (8, 'Almacena datos en un único archivo de texto grande.', FALSE),
    (8, 'Organiza los datos en tablas estructuradas con relaciones predefinidas.', TRUE),
    (8, 'No requiere un esquema de datos.', FALSE),
    (8, 'Es el más adecuado para datos no estructurados.', FALSE),
    -- Options for exercise 9
    (9, 'Un SGBD relacional como Oracle, por su robustez.', FALSE),
    (9, 'Un SGBD NoSQL, por su flexibilidad con datos no estructurados y su escalabilidad.', TRUE),
    (9, 'Un sistema de archivos en el servidor.', FALSE),
    (9, 'Hojas de cálculo compartidas.', FALSE);

-- Lesson 4: Tablas, columnas y filas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (10, 4, 'En una base de datos relacional, ¿qué representa una "fila"?', 'Una fila, o tupla, representa un único registro o conjunto de datos relacionados en una tabla. Por ejemplo, toda la información de un cliente específico.'),
    (11, 4, 'Si una tabla "Productos" tiene las columnas "ID_Producto", "Nombre" y "Precio", ¿qué representa la columna "Nombre"?', 'Una columna, o atributo, representa una característica específica de cada registro en la tabla. En este caso, el nombre de cada producto.'),
    (12, 4, 'Estás diseñando una tabla para almacenar información sobre libros. ¿Cuál de las siguientes estructuras de tabla es la más lógica y organizada?', 'Una buena estructura de tabla evita la redundancia y agrupa lógicamente los atributos. Separar autor y libro en sus propias columnas es fundamental.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 10
    (10, 'Un atributo o característica de los datos.', FALSE),
    (10, 'Un registro único en una tabla.', TRUE),
    (10, 'El nombre de la tabla.', FALSE),
    (10, 'La base de datos completa.', FALSE),
    -- Options for exercise 11
    (11, 'Un registro completo del producto.', FALSE),
    (11, 'Una característica específica de un producto, en este caso, su nombre.', TRUE),
    (11, 'La tabla entera.', FALSE),
    (11, 'La clave primaria de la tabla.', FALSE),
    -- Options for exercise 12
    (12, 'Una sola columna con "ID, Título, Autor, ISBN".', FALSE),
    (12, 'Columnas separadas: "ID_Libro", "Titulo", "Autor", "ISBN".', TRUE),
    (12, 'Una columna para el título y otra para "Autor e ISBN combinados".', FALSE),
    (12, 'Una fila por libro en lugar de columnas.', FALSE);

-- Lesson 5: Claves e identificadores
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (13, 5, '¿Cuál es el propósito principal de una clave primaria en una tabla?', 'La clave primaria garantiza que cada fila en una tabla sea única y no nula, proporcionando un identificador fiable para cada registro.'),
    (14, 5, '¿Por qué una clave primaria no puede contener valores nulos (NULL)?', 'Si una clave primaria fuera nula, no podría identificar de forma única un registro, lo que viola su propósito fundamental. La unicidad requiere un valor definido.'),
    (15, 5, 'En una tabla `Pedidos`, la columna `ID_Cliente` hace referencia a la clave primaria de la tabla `Clientes`. ¿Cómo se llama `ID_Cliente` en la tabla `Pedidos`?', '`ID_Cliente` en la tabla `Pedidos` es una clave foránea porque vincula un pedido a un cliente específico, estableciendo una relación entre las dos tablas.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 13
    (13, 'Ordenar los datos alfabéticamente.', FALSE),
    (13, 'Identificar de forma única cada registro en una tabla.', TRUE),
    (13, 'Almacenar información descriptiva sobre la tabla.', FALSE),
    (13, 'Contar el número de filas en la tabla.', FALSE),
    -- Options for exercise 14
    (14, 'Porque los valores nulos ocupan demasiado espacio.', FALSE),
    (14, 'Porque un valor nulo no puede identificar de forma única un registro.', TRUE),
    (14, 'Porque Oracle no permite valores nulos en ninguna columna.', FALSE),
    (14, 'Es solo una convención sin una razón técnica.', FALSE),
    -- Options for exercise 15
    (15, 'Clave primaria', FALSE),
    (15, 'Clave foránea', TRUE),
    (15, 'Clave candidata', FALSE),
    (15, 'Superclave', FALSE);

-- Exercises for Module 2: Core SQL Skills

-- Lesson 6: Introducción a SQL
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (16, 6, '¿Qué significa el acrónimo SQL?', 'SQL son las siglas de Structured Query Language (Lenguaje de Consulta Estructurado), el lenguaje estándar para interactuar con bases de datos relacionales.'),
    (17, 6, '¿Cuál de las siguientes afirmaciones describe mejor el propósito de la sentencia `SELECT` en SQL?', 'La sentencia `SELECT` es la piedra angular de las consultas en SQL, utilizada específicamente para recuperar datos de una o más tablas de la base de datos.'),
    (18, 6, 'Si quisieras obtener todas las columnas de una tabla llamada `CLIENTES`, ¿qué consulta escribirías?', 'El asterisco (*) es un comodín en SQL que representa "todas las columnas". `SELECT * FROM CLIENTES` es la forma estándar de solicitar todos los datos de esa tabla.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 16
    (16, 'Standard Query Language', FALSE),
    (16, 'Structured Query Language', TRUE),
    (16, 'Simple Query Logic', FALSE),
    (16, 'System Query Language', FALSE),
    -- Options for exercise 17
    (17, 'Para modificar datos en una tabla.', FALSE),
    (17, 'Para recuperar datos de una base de datos.', TRUE),
    (17, 'Para eliminar una tabla.', FALSE),
    (17, 'Para crear una nueva base de datos.', FALSE),
    -- Options for exercise 18
    (18, 'GET * FROM CLIENTES;', FALSE),
    (18, 'SELECT ALL FROM CLIENTES;', FALSE),
    (18, 'SELECT * FROM CLIENTES;', TRUE),
    (18, 'FETCH * FROM CLIENTES;', FALSE);

-- Lesson 7: Tablas y tipos de datos
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (19, 7, '¿Qué palabra clave se usa en Oracle SQL para crear una nueva tabla?', 'La sentencia `CREATE TABLE` se utiliza para definir una nueva tabla en la base de datos, especificando sus columnas y tipos de datos.'),
    (20, 7, 'En Oracle, ¿cuál es la diferencia principal entre los tipos de datos `VARCHAR2` y `CHAR`?', '`VARCHAR2` utiliza almacenamiento de longitud variable, lo que ahorra espacio si los datos no llenan la longitud máxima. `CHAR` utiliza almacenamiento de longitud fija, rellenando con espacios si es necesario.'),
    (21, 7, 'Necesitas crear una tabla `empleados` en Oracle con un ID, nombre y fecha de contratación. El ID debe ser un número que se autoincrementa. ¿Cuál de las siguientes sentencias es la correcta?', 'Esta sintaxis de Oracle crea correctamente una columna de ID que se autoincrementa usando `GENERATED AS IDENTITY`, define una columna `VARCHAR2` para el nombre y una columna `DATE` para la fecha de contratación.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 19
    (19, 'NEW TABLE', FALSE),
    (19, 'CREATE TABLE', TRUE),
    (19, 'ADD TABLE', FALSE),
    (19, 'MAKE TABLE', FALSE),
    -- Options for exercise 20
    (20, 'No hay diferencia, son intercambiables.', FALSE),
    (20, '`VARCHAR2` almacena cadenas de longitud variable, mientras que `CHAR` almacena cadenas de longitud fija.', TRUE),
    (20, '`VARCHAR2` es para números y `CHAR` es para texto.', FALSE),
    (20, '`CHAR` es un tipo de dato más nuevo y eficiente que `VARCHAR2`.', FALSE),
    -- Options for exercise 21
    (21, '`CREATE TABLE empleados (id INT AUTO_INCREMENT, nombre VARCHAR(50), fecha_contratacion DATETIME);`', FALSE),
    (21, '`CREATE TABLE empleados (id NUMBER GENERATED AS IDENTITY, nombre VARCHAR2(50), fecha_contratacion DATE);`', TRUE),
    (21, '`CREATE TABLE empleados (id SERIAL, nombre TEXT, fecha_contratacion TIMESTAMP);`', FALSE),
    (21, '`TABLE empleados (id NUMBER, nombre STRING(50), fecha_contratacion DATE);`', FALSE);

-- Lesson 8: CRUD - Crear y actualizar
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (22, 8, '¿Qué comando de SQL se utiliza para añadir una nueva fila de datos a una tabla?', 'El comando `INSERT INTO` se utiliza para agregar nuevos registros (filas) a una tabla existente.'),
    (23, 8, '¿Cuál es el propósito del comando `UPDATE` en SQL?', 'El comando `UPDATE` se utiliza para modificar registros existentes en una tabla. Es crucial usar la cláusula `WHERE` para especificar qué filas actualizar.'),
    (24, 8, 'Quieres cambiar el apellido de un empleado con `employee_id = 101` a "Smith" en la tabla `employees`. ¿Cuál es la consulta correcta en Oracle SQL?', 'La sintaxis correcta es `UPDATE employees SET last_name = ''Smith'' WHERE employee_id = 101;`. La cláusula `WHERE` es esencial para evitar actualizar todos los registros.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 22
    (22, 'ADD ROW', FALSE),
    (22, 'INSERT INTO', TRUE),
    (22, 'CREATE RECORD', FALSE),
    (22, 'NEW ROW', FALSE),
    -- Options for exercise 23
    (23, 'Para eliminar filas.', FALSE),
    (23, 'Para modificar filas existentes.', TRUE),
    (23, 'Para crear nuevas filas.', FALSE),
    (23, 'Para seleccionar filas.', FALSE),
    -- Options for exercise 24
    (24, '`UPDATE employees SET last_name = ''Smith'' WHERE employee_id = 101;`', TRUE),
    (24, '`MODIFY employees SET last_name = ''Smith'' FOR employee_id = 101;`', FALSE),
    (24, '`UPDATE employees(last_name) VALUES (''Smith'') WHERE employee_id = 101;`', FALSE),
    (24, '`SET employees.last_name = ''Smith'' WHERE employee_id = 101;`', FALSE);

-- Lesson 9: CRUD - Leer
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (25, 9, '¿Qué sentencia SQL se usa para leer o recuperar datos de una tabla?', 'La sentencia `SELECT` es la que se utiliza universalmente en SQL para consultar y recuperar datos de la base de datos.'),
    (26, 9, '¿Cómo seleccionarías solo las columnas `nombre` y `apellido` de una tabla llamada `empleados`?', 'Para seleccionar columnas específicas, se deben listar sus nombres después de la palabra clave `SELECT`, separados por comas.'),
    (27, 9, 'Quieres ver todos los productos de la tabla `productos` cuyo precio sea superior a 50. ¿Cuál es la consulta correcta?', 'Se utiliza `SELECT *` para obtener todas las columnas, `FROM productos` para especificar la tabla y `WHERE precio > 50` para filtrar los registros según la condición dada.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 25
    (25, '`READ`', FALSE),
    (25, '`SELECT`', TRUE),
    (25, '`GET`', FALSE),
    (25, '`FETCH`', FALSE),
    -- Options for exercise 26
    (26, '`SELECT nombre, apellido FROM empleados;`', TRUE),
    (26, '`SELECT ALL (nombre, apellido) FROM empleados;`', FALSE),
    (26, '`READ nombre, apellido FROM empleados;`', FALSE),
    (26, '`SELECT (nombre, apellido) IN empleados;`', FALSE),
    -- Options for exercise 27
    (27, '`SELECT * FROM productos WHERE precio > 50;`', TRUE),
    (27, '`GET * FROM productos WHERE precio > 50;`', FALSE),
    (27, '`SELECT * FROM productos HAVING precio > 50;`', FALSE),
    (27, '`SELECT * FROM productos IF precio > 50;`', FALSE);

-- Lesson 10: CRUD - Eliminar
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (28, 10, '¿Qué comando de SQL se utiliza para eliminar registros de una tabla?', 'El comando `DELETE FROM` se utiliza para eliminar una o más filas de una tabla.'),
    (29, 10, '¿Por qué es extremadamente importante usar una cláusula `WHERE` con el comando `DELETE`?', 'Sin una cláusula `WHERE`, `DELETE` eliminará todas las filas de la tabla. `WHERE` especifica qué registros deben ser eliminados, evitando la pérdida accidental de datos.'),
    (30, 10, 'Necesitas eliminar al empleado con `employee_id = 123` de la tabla `employees`. ¿Cuál es la consulta correcta y segura?', 'La consulta `DELETE FROM employees WHERE employee_id = 123;` elimina específicamente la fila donde `employee_id` es 123, sin afectar a otros registros.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 28
    (28, '`REMOVE FROM`', FALSE),
    (28, '`DELETE FROM`', TRUE),
    (28, '`DROP ROW`', FALSE),
    (28, '`ERASE FROM`', FALSE),
    -- Options for exercise 29
    (29, 'Para hacer la consulta más rápida.', FALSE),
    (29, 'Para evitar eliminar todas las filas de la tabla.', TRUE),
    (29, 'No es importante, es opcional.', FALSE),
    (29, 'Para eliminar también la tabla.', FALSE),
    -- Options for exercise 30
    (30, '`DELETE FROM employees WHERE employee_id = 123;`', TRUE),
    (30, '`DELETE employee_id = 123 FROM employees;`', FALSE),
    (30, '`DELETE * FROM employees WHERE employee_id = 123;`', FALSE),
    (30, '`DELETE FROM employees;`', FALSE);

-- Lesson 11: Cláusula WHERE
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (31, 11, '¿Cuál es el propósito de la cláusula `WHERE` en una consulta SQL?', 'La cláusula `WHERE` se utiliza para filtrar registros y devolver solo aquellos que cumplen con una condición específica.'),
    (32, 11, '¿Qué operador se utiliza en la cláusula `WHERE` para encontrar un valor que no es igual a otro?', 'El operador `<>` (o `!=` en algunos dialectos de SQL, incluido Oracle) se usa para la desigualdad.'),
    (33, 11, '¿Cómo seleccionarías todos los clientes de la tabla `clientes` que viven en "Madrid" y cuyo `estatus` es "Activo"?', 'Se utiliza el operador `AND` para combinar múltiples condiciones en una cláusula `WHERE`. Ambas condiciones deben ser verdaderas para que se devuelva la fila.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 31
    (31, 'Para ordenar los resultados.', FALSE),
    (31, 'Para filtrar registros basados en una condición.', TRUE),
    (31, 'Para agrupar filas.', FALSE),
    (31, 'Para unir tablas.', FALSE),
    -- Options for exercise 32
    (32, '`=`', FALSE),
    (32, '`<>`', TRUE),
    (32, '`~`', FALSE),
    (32, '`LIKE`', FALSE),
    -- Options for exercise 33
    (33, '`SELECT * FROM clientes WHERE ciudad = ''Madrid'' OR estatus = ''Activo'';`', FALSE),
    (33, '`SELECT * FROM clientes WHERE ciudad = ''Madrid'' AND estatus = ''Activo'';`', TRUE),
    (33, '`SELECT * FROM clientes WHERE ciudad = ''Madrid'', estatus = ''Activo'';`', FALSE),
    (33, '`SELECT * FROM clientes FILTER ciudad = ''Madrid'' AND estatus = ''Activo'';`', FALSE);

-- Lesson 12: Ordenar resultados
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (34, 12, '¿Qué cláusula de SQL se utiliza para ordenar los resultados de una consulta?', 'La cláusula `ORDER BY` se utiliza para ordenar el conjunto de resultados en orden ascendente o descendente.'),
    (35, 12, 'Si no se especifica `ASC` o `DESC`, ¿cuál es el orden de clasificación por defecto de la cláusula `ORDER BY`?', 'El orden de clasificación por defecto es `ASC` (ascendente), que ordena los resultados de menor a mayor o alfabéticamente.'),
    (36, 12, '¿Cuál de las siguientes consultas seleccionará a todos los empleados y los ordenará por su salario de mayor a menor?', 'Para ordenar en orden descendente, se debe usar la palabra clave `DESC` después del nombre de la columna en la cláusula `ORDER BY`.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 34
    (34, '`SORT BY`', FALSE),
    (34, '`ORDER BY`', TRUE),
    (34, '`GROUP BY`', FALSE),
    (34, '`ARRANGE`', FALSE),
    -- Options for exercise 35
    (35, 'Descendente (`DESC`)', FALSE),
    (35, 'Ascendente (`ASC`)', TRUE),
    (35, 'Aleatorio', FALSE),
    (35, 'No hay un orden por defecto', FALSE),
    -- Options for exercise 36
    (36, '`SELECT * FROM empleados ORDER BY salario;`', FALSE),
    (36, '`SELECT * FROM empleados ORDER BY salario DESC;`', TRUE),
    (36, '`SELECT * FROM empleados SORT BY salario DESC;`', FALSE),
    (36, '`SELECT * FROM empleados ARRANGE BY salario DESC;`', FALSE);

-- Lesson 13: Funciones de agregación
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (37, 13, '¿Qué función de agregación se utiliza para contar el número de filas?', 'La función `COUNT()` se utiliza para devolver el número de filas que coinciden con un criterio especificado.'),
    (38, 13, '¿Cuál es la diferencia principal entre `COUNT(*)` y `COUNT(nombre_columna)`?', '`COUNT(*)` cuenta todas las filas, mientras que `COUNT(nombre_columna)` solo cuenta las filas en las que `nombre_columna` no es NULL.'),
    (39, 13, 'Dada una tabla de `ventas` con columnas `producto` y `monto`, ¿cómo encontrarías el monto total de ventas para el producto ''Laptop''?', 'Se debe usar `SUM(monto)` para calcular el total y `WHERE producto = ''Laptop''` para filtrar solo las filas de ese producto.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 37
    (37, '`SUM()`', FALSE),
    (37, '`COUNT()`', TRUE),
    (37, '`TOTAL()`', FALSE),
    (37, '`NUMBER()`', FALSE),
    -- Options for exercise 38
    (38, 'No hay ninguna diferencia.', FALSE),
    (38, '`COUNT(*)` cuenta todas las filas, mientras que `COUNT(nombre_columna)` ignora los valores nulos en esa columna.', TRUE),
    (38, '`COUNT(nombre_columna)` es más rápido que `COUNT(*)`.', FALSE),
    (38, '`COUNT(*)` solo se puede usar si no hay valores nulos.', FALSE),
    -- Options for exercise 39
    (39, '`SELECT COUNT(monto) FROM ventas WHERE producto = ''Laptop'';`', FALSE),
    (39, '`SELECT SUM(monto) FROM ventas WHERE producto = ''Laptop'';`', TRUE),
    (39, '`SELECT AVG(monto) FROM ventas WHERE producto = ''Laptop'';`', FALSE),
    (39, '`SELECT TOTAL(monto) FROM ventas WHERE producto = ''Laptop'';`', FALSE);

-- Lesson 14: Agrupación y filtrado
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (40, 14, '¿Para qué se utiliza la cláusula `GROUP BY`?', 'La cláusula `GROUP BY` agrupa filas que tienen los mismos valores en filas de resumen, como "encontrar el número de clientes en cada país".'),
    (41, 14, '¿Cuál es la diferencia fundamental entre las cláusulas `WHERE` y `HAVING`?', '`WHERE` filtra filas antes de que se realice cualquier agrupación, mientras que `HAVING` filtra grupos después de que se hayan aplicado las funciones de agregación.'),
    (42, 14, 'Necesitas encontrar los departamentos que tienen más de 5 empleados. ¿Cuál es la consulta correcta?', 'Se debe agrupar por `department_id`, contar los empleados en cada grupo y luego usar `HAVING` para filtrar los grupos con un recuento mayor a 5.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 40
    (40, 'Para ordenar los resultados de la consulta.', FALSE),
    (40, 'Para agrupar filas basadas en el valor de una o más columnas.', TRUE),
    (40, 'Para filtrar filas individuales.', FALSE),
    (40, 'Para unir múltiples tablas.', FALSE),
    -- Options for exercise 41
    (41, '`WHERE` filtra grupos, mientras que `HAVING` filtra filas.', FALSE),
    (41, '`WHERE` filtra filas antes de la agregación, y `HAVING` filtra grupos después de la agregación.', TRUE),
    (41, 'No hay diferencia, son intercambiables.', FALSE),
    (41, '`HAVING` es obligatorio cuando se usa `GROUP BY`.', FALSE),
    -- Options for exercise 42
    (42, '`SELECT department_id FROM employees WHERE COUNT(*) > 5;`', FALSE),
    (42, '`SELECT department_id, COUNT(*) FROM employees GROUP BY department_id HAVING COUNT(*) > 5;`', TRUE),
    (42, '`SELECT department_id FROM employees GROUP BY department_id WHERE COUNT(*) > 5;`', FALSE),
    (42, '`SELECT department_id, COUNT(*) FROM employees HAVING COUNT(*) > 5;`', FALSE);

-- Exercises for Module 3: Data Modeling and Design

-- Lesson 15: Por qué importa el modelado de datos
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (43, 15, '¿Cuál es uno de los principales objetivos del modelado de datos?', 'Un buen modelo de datos busca reducir la redundancia de datos, lo que ahorra espacio y mejora la integridad de los datos.'),
    (44, 15, '¿Qué problema puede surgir de un mal modelo de datos?', 'Un mal modelo puede llevar a la redundancia de datos, lo que a su vez puede causar anomalías de actualización, inserción y eliminación, comprometiendo la integridad de los datos.'),
    (45, 15, 'Una empresa almacena la dirección de un cliente con cada pedido que realiza. ¿Qué problema potencial introduce este diseño?', 'Almacenar la dirección del cliente con cada pedido crea redundancia. Si un cliente se muda, la dirección debe actualizarse en varios lugares, lo que puede provocar inconsistencias.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 43
    (43, 'Hacer que la base de datos sea lo más grande posible.', FALSE),
    (43, 'Reducir la redundancia y mejorar la integridad de los datos.', TRUE),
    (43, 'Escribir consultas SQL más complejas.', FALSE),
    (43, 'Aumentar el número de tablas al máximo.', FALSE),
    -- Options for exercise 44
    (44, 'Mejora del rendimiento de las consultas.', FALSE),
    (44, 'Inconsistencias y anomalías en los datos.', TRUE),
    (44, 'Reducción de los costos de almacenamiento.', FALSE),
    (44, 'Simplificación de la lógica de la aplicación.', FALSE),
    -- Options for exercise 45
    (45, 'Se pierde el historial de direcciones del cliente.', FALSE),
    (45, 'Redundancia de datos, lo que lleva a posibles inconsistencias si la dirección cambia.', TRUE),
    (45, 'La tabla de pedidos se vuelve demasiado simple.', FALSE),
    (45, 'Mejora la velocidad de recuperación de pedidos.', FALSE);

-- Lesson 16: Entidades y atributos
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (46, 16, 'En el modelado de datos, ¿qué es una "entidad"?', 'Una entidad representa un objeto, persona, lugar o concepto del mundo real sobre el que se almacenan datos, como "Cliente" o "Producto". Generalmente se convierte en una tabla.'),
    (47, 16, 'Si "Coche" es una entidad, ¿cuál de los siguientes es más probable que sea un "atributo"?', 'Un atributo es una propiedad o característica de una entidad. "Color" es una característica de un coche.'),
    (48, 16, 'Estás diseñando una base de datos para una universidad. ¿Cuál de las siguientes opciones representa mejor una entidad y uno de sus atributos?', 'La entidad es el objeto principal ("Estudiante") y el atributo es una de sus propiedades ("fecha_nacimiento").');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 46
    (46, 'Una relación entre dos tablas.', FALSE),
    (46, 'Un objeto o concepto del mundo real sobre el que se almacenan datos.', TRUE),
    (46, 'Una consulta SQL.', FALSE),
    (46, 'Una propiedad o característica de un objeto.', FALSE),
    -- Options for exercise 47
    (47, 'Garaje', FALSE),
    (47, 'Color', TRUE),
    (47, 'Conducir', FALSE),
    (47, 'Carretera', FALSE),
    -- Options for exercise 48
    (48, 'Entidad: Inscribirse, Atributo: Estudiante', FALSE),
    (48, 'Entidad: Estudiante, Atributo: fecha_nacimiento', TRUE),
    (48, 'Entidad: Nombre, Atributo: Estudiante', FALSE),
    (48, 'Entidad: Universidad, Atributo: Inscribirse', FALSE);

-- Lesson 17: Relaciones entre tablas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (49, 17, '¿Qué tipo de relación existe entre una tabla de `Paises` y una tabla de `Ciudades` (asumiendo que una ciudad solo puede estar en un país)?', 'Un país puede tener muchas ciudades, pero cada ciudad pertenece a un solo país. Esto es una relación de uno a muchos.'),
    (50, 17, 'En un modelo de base de datos para una escuela, ¿qué tipo de relación es más probable que exista entre `Estudiantes` y `Cursos`?', 'Un estudiante puede inscribirse en muchos cursos, y un curso puede tener muchos estudiantes. Esta es una relación de muchos a muchos, que generalmente se implementa con una tabla intermedia.'),
    (51, 17, 'Tienes una tabla `Empleados` y una tabla `DetallesContacto`. Si cada empleado tiene exactamente un conjunto de detalles de contacto y cada conjunto de detalles de contacto pertenece a un solo empleado, ¿qué tipo de relación es esta?', 'Cuando un registro en la Tabla A está vinculado a uno y solo un registro en la Tabla B, y viceversa, es una relación de uno a uno.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 49
    (49, 'Uno a uno', FALSE),
    (49, 'Uno a muchos', TRUE),
    (49, 'Muchos a muchos', FALSE),
    (49, 'No hay relación', FALSE),
    -- Options for exercise 50
    (50, 'Uno a uno', FALSE),
    (50, 'Muchos a muchos', TRUE),
    (50, 'Uno a muchos', FALSE),
    (50, 'Autónoma', FALSE),
    -- Options for exercise 51
    (51, 'Uno a uno', TRUE),
    (51, 'Uno a muchos', FALSE),
    (51, 'Muchos a muchos', FALSE),
    (51, 'Recursiva', FALSE);

-- Lesson 18: Claves primarias y foráneas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (52, 18, '¿Cuál es la función de una clave foránea?', 'Una clave foránea es una columna (o conjunto de columnas) en una tabla cuyos valores corresponden a los valores de la clave primaria de otra tabla, creando así un enlace entre las dos.'),
    (53, 18, 'En una relación uno a muchos entre `Autores` y `Libros`, ¿dónde se colocaría la clave foránea?', 'En una relación de uno a muchos, la clave foránea se coloca en la tabla del lado "muchos" (`Libros`) para hacer referencia a la tabla del lado "uno" (`Autores`).'),
    (54, 18, 'Una tabla `Pedidos` tiene una columna `cliente_id` que hace referencia a la columna `id` en la tabla `Clientes`. ¿Qué se puede inferir de esta estructura?', 'La presencia de `cliente_id` como clave foránea en `Pedidos` que apunta a `Clientes` establece una relación que garantiza que cada pedido esté asociado con un cliente válido que existe en la tabla `Clientes`.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 52
    (52, 'Identificar de forma única cada fila en una tabla.', FALSE),
    (52, 'Crear un enlace entre dos tablas basado en una referencia a una clave primaria.', TRUE),
    (52, 'Ordenar los datos automáticamente.', FALSE),
    (52, 'Acelerar las consultas de búsqueda.', FALSE),
    -- Options for exercise 53
    (53, 'En la tabla `Autores`.', FALSE),
    (53, 'En la tabla `Libros`.', TRUE),
    (53, 'En ambas tablas.', FALSE),
    (53, 'En una nueva tabla de unión.', FALSE),
    -- Options for exercise 54
    (54, 'Cada cliente solo puede tener un pedido.', FALSE),
    (54, 'Un pedido debe estar asociado con un cliente válido de la tabla `Clientes`.', TRUE),
    (54, 'La tabla `Pedidos` es la tabla principal.', FALSE),
    (54, 'Los clientes y los pedidos no están relacionados.', FALSE);

-- Lesson 19: Diagramas entidad–relación
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (55, 19, 'En un Diagrama Entidad-Relación (ERD), ¿qué representa un rectángulo?', 'Los rectángulos se utilizan universalmente en los ERD para representar entidades, que son los objetos o conceptos principales del modelo.'),
    (56, 19, '¿Cómo se representa comúnmente una relación de "uno a muchos" en un ERD (usando la notación de pata de gallo)?', 'En la notación de pata de gallo, el lado "uno" se representa con una sola línea perpendicular, y el lado "muchos" se representa con una bifurcación de tres líneas (la pata de gallo).'),
    (57, 19, 'Si ves un rombo entre dos rectángulos en un ERD, ¿qué indica típicamente?', 'Los rombos (o a veces solo una línea con texto) se usan para describir la relación entre dos entidades, como "publica" en la relación entre un `Autor` y un `Libro`.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 55
    (55, 'Un atributo', FALSE),
    (55, 'Una entidad', TRUE),
    (55, 'Una relación', FALSE),
    (55, 'Una clave primaria', FALSE),
    -- Options for exercise 56
    (56, 'Una línea recta que conecta dos entidades.', FALSE),
    (56, 'Una línea con una pata de gallo en un extremo y una línea perpendicular en el otro.', TRUE),
    (56, 'Una línea con una pata de gallo en ambos extremos.', FALSE),
    (56, 'Una línea punteada.', FALSE),
    -- Options for exercise 57
    (57, 'Un atributo de la entidad.', FALSE),
    (57, 'La relación entre las entidades.', TRUE),
    (57, 'Una clave foránea.', FALSE),
    (57, 'Una entidad débil.', FALSE);

-- Lesson 20: Normalización
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (58, 20, '¿Qué se consigue principalmente con la normalización de una base de datos?', 'El propósito principal de la normalización es minimizar la redundancia de datos y mejorar la integridad de los datos eliminando diversas anomalías de inserción, actualización y eliminación.'),
    (59, 20, '¿Qué define a una tabla que está en Primera Forma Normal (1NF)?', 'Para que una tabla esté en 1NF, todos los atributos deben ser atómicos, es decir, cada celda debe contener un solo valor, y no debe haber grupos de repetición.'),
    (60, 20, 'Una tabla de `Proyectos` contiene `ID_Proyecto`, `Nombre_Proyecto`, `ID_Empleado`, `Nombre_Empleado`. ¿Qué problema de normalización presenta?', 'Esta tabla viola la Segunda Forma Normal (2NF) porque `Nombre_Empleado` depende de `ID_Empleado`, que es solo una parte de una posible clave candidata si la clave fuera (`ID_Proyecto`, `ID_Empleado`). El nombre del empleado debería estar en una tabla de `Empleados` separada.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 58
    (58, 'Aumentar la redundancia de datos para acelerar las lecturas.', FALSE),
    (58, 'Minimizar la redundancia y mejorar la integridad de los datos.', TRUE),
    (58, 'Hacer que todas las tablas tengan el mismo número de columnas.', FALSE),
    (58, 'Asegurarse de que todas las consultas utilicen índices.', FALSE),
    -- Options for exercise 59
    (59, 'No tiene claves foráneas.', FALSE),
    (59, 'Cada celda contiene un solo valor y no hay grupos de repetición.', TRUE),
    (59, 'Todos sus atributos no clave dependen completamente de la clave primaria.', FALSE),
    (59, 'No tiene dependencias transitivas.', FALSE),
    -- Options for exercise 60
    (60, 'Dependencia transitiva (violación de 3NF).', FALSE),
    (60, 'Dependencia parcial (violación de 2NF), porque el nombre del empleado depende solo del ID del empleado.', TRUE),
    (60, 'Atributos no atómicos (violación de 1NF).', FALSE),
    (60, 'No presenta ningún problema de normalización.', FALSE);

-- Lesson 21: Cuándo y por qué desnormalizar
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (61, 21, '¿Cuál es la razón más común para desnormalizar una base de datos?', 'La desnormalización se realiza principalmente para mejorar el rendimiento de las consultas, especialmente para aplicaciones de lectura intensiva, al reducir la necesidad de uniones complejas y costosas.'),
    (62, 21, '¿Cuál es el principal inconveniente de la desnormalización?', 'Al introducir redundancia, la desnormalización aumenta los requisitos de almacenamiento y, lo que es más importante, introduce el riesgo de inconsistencias en los datos si los datos duplicados no se actualizan correctamente.'),
    (63, 21, 'En una aplicación de comercio electrónico, el nombre de un producto se almacena tanto en la tabla `Productos` como en cada registro de la tabla `LineasDePedido`. ¿Qué justificación podría haber para esta desnormalización?', 'Almacenar el nombre del producto en `LineasDePedido` evita tener que unir con la tabla `Productos` cada vez que se muestran los detalles de un pedido, mejorando el rendimiento. También preserva el nombre del producto en el momento de la compra, incluso si el nombre cambia más tarde en la tabla `Productos`.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 61
    (61, 'Para mejorar la integridad de los datos.', FALSE),
    (61, 'Para mejorar el rendimiento de las consultas al reducir los `JOINs`.', TRUE),
    (61, 'Para reducir el espacio de almacenamiento.', FALSE),
    (61, 'Para simplificar las operaciones de escritura (INSERT/UPDATE).', FALSE),
    -- Options for exercise 62
    (62, 'Mejora de la integridad de los datos.', FALSE),
    (62, 'Aumento de la redundancia y riesgo de inconsistencia de los datos.', TRUE),
    (62, 'Disminución del rendimiento de las consultas.', FALSE),
    (62, 'Reducción de la complejidad de las consultas.', FALSE),
    -- Options for exercise 63
    (63, 'No hay una buena justificación; es un mal diseño.', FALSE),
    (63, 'Mejora el rendimiento de lectura de los pedidos y preserva los datos históricos.', TRUE),
    (63, 'Es requerido por la Primera Forma Normal.', FALSE),
    (63, 'Reduce el espacio de almacenamiento total.', FALSE);

-- Exercises for Module 4: Intermediate SQL

-- Lesson 22: Trabajar con múltiples tablas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (64, 22, '¿Qué cláusula se utiliza para combinar filas de dos o más tablas basándose en una columna relacionada entre ellas?', 'La cláusula `JOIN` se utiliza para combinar filas de dos o más tablas. `INNER JOIN` es el tipo más común.'),
    (65, 22, 'Si tienes una tabla `clientes` y una tabla `pedidos`, y quieres una lista de clientes y los pedidos que han realizado, ¿qué columnas usarías para unir las tablas?', 'Para unir `clientes` y `pedidos`, usarías una columna que identifique de forma única al cliente en ambas tablas, típicamente `cliente_id`.'),
    (66, 22, 'Dadas las tablas `empleados` (con `department_id`) y `departamentos` (con `id`), escribe una consulta para obtener el nombre de cada empleado junto con el nombre de su departamento.', 'Un `INNER JOIN` entre las dos tablas en `e.department_id = d.id` conectará correctamente a cada empleado con su departamento.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 64
    (64, '`UNION`', FALSE),
    (64, '`JOIN`', TRUE),
    (64, '`GROUP BY`', FALSE),
    (64, '`CONNECT`', FALSE),
    -- Options for exercise 65
    (65, '`clientes.nombre` y `pedidos.fecha_pedido`', FALSE),
    (65, '`clientes.cliente_id` y `pedidos.cliente_id`', TRUE),
    (65, '`clientes.cliente_id` y `pedidos.pedido_id`', FALSE),
    (65, 'No se pueden unir estas tablas.', FALSE),
    -- Options for exercise 66
    (66, '`SELECT e.nombre, d.nombre_departamento FROM empleados e, departamentos d;`', FALSE),
    (66, '`SELECT e.nombre, d.nombre_departamento FROM empleados e INNER JOIN departamentos d ON e.department_id = d.id;`', TRUE),
    (66, '`SELECT e.nombre, d.nombre_departamento FROM empleados e UNION departamentos d;`', FALSE),
    (66, '`SELECT nombre, nombre_departamento FROM empleados, departamentos WHERE department_id = id;`', FALSE);

-- Lesson 23: Comprender los joins
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (67, 23, '¿Qué tipo de `JOIN` devuelve solo las filas que tienen valores coincidentes en ambas tablas?', '`INNER JOIN` selecciona todos los registros que tienen valores coincidentes en la columna de unión de ambas tablas.'),
    (68, 23, '¿Cuál es la diferencia entre un `LEFT JOIN` y un `RIGHT JOIN`?', '`LEFT JOIN` devuelve todas las filas de la tabla izquierda y las filas coincidentes de la tabla derecha. `RIGHT JOIN` hace lo contrario, devolviendo todas las filas de la tabla derecha y las coincidentes de la izquierda.'),
    (69, 23, 'Quieres encontrar a todos los clientes que nunca han realizado un pedido. Tienes una tabla `Clientes` y una tabla `Pedidos`. ¿Qué consulta lograría esto?', 'Un `LEFT JOIN` de `Clientes` a `Pedidos` mostrará a todos los clientes. Al filtrar por `p.pedido_id IS NULL`, encontraremos solo a aquellos clientes que no tienen pedidos coincidentes.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 67
    (67, '`LEFT JOIN`', FALSE),
    (67, '`INNER JOIN`', TRUE),
    (67, '`FULL OUTER JOIN`', FALSE),
    (67, '`CROSS JOIN`', FALSE),
    -- Options for exercise 68
    (68, 'No hay diferencia, son idénticos.', FALSE),
    (68, '`LEFT JOIN` devuelve todas las filas de la tabla izquierda, mientras que `RIGHT JOIN` devuelve todas las filas de la tabla derecha.', TRUE),
    (68, '`LEFT JOIN` es más rápido que `RIGHT JOIN`.', FALSE),
    (68, '`LEFT JOIN` solo puede unir dos tablas, mientras que `RIGHT JOIN` puede unir varias.', FALSE),
    -- Options for exercise 69
    (69, '`SELECT c.nombre FROM Clientes c INNER JOIN Pedidos p ON c.id = p.cliente_id;`', FALSE),
    (69, '`SELECT c.nombre FROM Clientes c LEFT JOIN Pedidos p ON c.id = p.cliente_id WHERE p.pedido_id IS NULL;`', TRUE),
    (69, '`SELECT c.nombre FROM Clientes c RIGHT JOIN Pedidos p ON c.id = p.cliente_id;`', FALSE),
    (69, '`SELECT c.nombre FROM Clientes c WHERE NOT EXISTS (SELECT * FROM Pedidos);`', FALSE);

-- Lesson 24: Uso de subconsultas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (70, 24, '¿Qué es una subconsulta en SQL?', 'Una subconsulta, o consulta anidada, es una consulta `SELECT` que se encuentra dentro de otra sentencia SQL, como `SELECT`, `INSERT`, `UPDATE` o `DELETE`.'),
    (71, 24, '¿En qué parte de una sentencia `SELECT` principal se puede utilizar una subconsulta?', 'Las subconsultas son muy versátiles y se pueden usar en las cláusulas `SELECT`, `FROM` y `WHERE`.'),
    (72, 24, 'Escribe una consulta para encontrar los nombres de todos los empleados que ganan más que el salario promedio.', 'Primero, una subconsulta `(SELECT AVG(salario) FROM empleados)` calcula el salario promedio. Luego, la consulta principal selecciona a los empleados cuyo salario es mayor que ese valor.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 70
    (70, 'Un alias para una tabla.', FALSE),
    (70, 'Una consulta `SELECT` anidada dentro de otra consulta.', TRUE),
    (70, 'Una función que devuelve una tabla.', FALSE),
    (70, 'Una vista materializada.', FALSE),
    -- Options for exercise 71
    (71, 'Solo en la cláusula `WHERE`.', FALSE),
    (71, 'En las cláusulas `SELECT`, `FROM` y `WHERE`.', TRUE),
    (71, 'Solo en la cláusula `FROM`.', FALSE),
    (71, 'Solo en la lista `SELECT`.', FALSE),
    -- Options for exercise 72
    (72, '`SELECT nombre FROM empleados WHERE salario > AVG(salario);`', FALSE),
    (72, '`SELECT nombre FROM empleados WHERE salario > (SELECT AVG(salario) FROM empleados);`', TRUE),
    (72, '`SELECT nombre, AVG(salario) FROM empleados GROUP BY nombre HAVING salario > AVG(salario);`', FALSE),
    (72, '`SELECT nombre FROM empleados HAVING salario > AVG(salario);`', FALSE);

-- Lesson 25: Expresiones de tabla comunes (CTE)
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (73, 25, '¿Qué palabra clave se usa para definir una Expresión de Tabla Común (CTE)?', 'Una CTE se define usando la cláusula `WITH`, seguida del nombre de la CTE y la consulta que la define.'),
    (74, 25, '¿Cuál es una de las principales ventajas de usar CTEs en lugar de subconsultas?', 'Las CTEs mejoran enormemente la legibilidad de las consultas complejas al permitirte nombrar y organizar conjuntos de resultados intermedios. También se pueden hacer recursivas.'),
    (75, 25, 'Reescribe la siguiente subconsulta para usar una CTE: `SELECT * FROM empleados WHERE department_id IN (SELECT department_id FROM departamentos WHERE ubicacion = ''Norte'');`', 'Primero se define la CTE `deptos_norte` para seleccionar los ID de departamento. Luego, la consulta principal selecciona de `empleados` uniéndose a esta CTE.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 73
    (73, '`CTE`', FALSE),
    (73, '`WITH`', TRUE),
    (73, '`AS`', FALSE),
    (73, '`DEFINE`', FALSE),
    -- Options for exercise 74
    (74, 'Son siempre más rápidas.', FALSE),
    (74, 'Mejoran la legibilidad y permiten consultas recursivas.', TRUE),
    (74, 'Usan menos memoria.', FALSE),
    (74, 'Son el único método para unir más de tres tablas.', FALSE),
    -- Options for exercise 75
    (75, '`SELECT * FROM (SELECT department_id FROM departamentos WHERE ubicacion = ''Norte'');`', FALSE),
    (75, '`WITH deptos_norte AS (SELECT department_id FROM departamentos WHERE ubicacion = ''Norte'') SELECT e.* FROM empleados e JOIN deptos_norte dn ON e.department_id = dn.department_id;`', TRUE),
    (75, '`CREATE CTE deptos_norte AS (SELECT department_id FROM departamentos WHERE ubicacion = ''Norte'');`', FALSE),
    (75, '`SELECT * FROM empleados WHERE department_id = (WITH ...);`', FALSE);

-- Lesson 26: Creación y uso de vistas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (76, 26, '¿Qué es una vista en SQL?', 'Una vista es una tabla virtual basada en el conjunto de resultados de una consulta SQL. Actúa como un atajo a una consulta compleja.'),
    (77, 26, '¿Por qué podría un administrador de base de datos crear una vista?', 'Las vistas se usan comúnmente para simplificar consultas complejas para los usuarios finales y para restringir el acceso a los datos, mostrando solo ciertas columnas o filas.'),
    (78, 26, '¿Cuál es la sintaxis correcta para crear una vista llamada `vista_empleados_salario_alto` que muestre a los empleados con un salario superior a 75000?', 'La sintaxis `CREATE VIEW nombre_vista AS SELECT ...` define la vista. La consulta `SELECT` especifica los datos que la vista contendrá.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 76
    (76, 'Una copia física de una tabla.', FALSE),
    (76, 'Una tabla virtual basada en el resultado de una consulta SQL.', TRUE),
    (76, 'Un índice para una tabla.', FALSE),
    (76, 'Un procedimiento almacenado.', FALSE),
    -- Options for exercise 77
    (77, 'Para hacer las copias de seguridad de la base de datos más rápidas.', FALSE),
    (77, 'Para simplificar consultas complejas y reforzar la seguridad.', TRUE),
    (77, 'Para eliminar físicamente datos de las tablas base.', FALSE),
    (77, 'Para reemplazar las tablas base.', FALSE),
    -- Options for exercise 78
    (78, '`NEW VIEW vista_empleados_salario_alto AS SELECT * FROM empleados WHERE salario > 75000;`', FALSE),
    (78, '`CREATE VIEW vista_empleados_salario_alto AS SELECT * FROM empleados WHERE salario > 75000;`', TRUE),
    (78, '`CREATE TABLE vista_empleados_salario_alto AS SELECT * FROM empleados WHERE salario > 75000;`', FALSE),
    (78, '`SELECT * INTO VIEW vista_empleados_salario_alto FROM empleados WHERE salario > 75000;`', FALSE);

-- Lesson 27: Introducción a los procedimientos almacenados
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (79, 27, '¿Qué es un procedimiento almacenado?', 'Un procedimiento almacenado es un conjunto de sentencias SQL preparadas que se pueden guardar en la base de datos y reutilizar varias veces.'),
    (80, 27, '¿Cuál es uno de los beneficios clave de usar procedimientos almacenados en lugar de ejecutar consultas SQL ad-hoc desde la aplicación?', 'Los procedimientos almacenados reducen el tráfico de red, mejoran la seguridad (al otorgar permisos sobre el procedimiento en lugar de las tablas subyacentes) y promueven la reutilización del código.'),
    (81, 27, '¿Cuál es la sintaxis básica para crear un procedimiento en Oracle que selecciona todos los empleados de un departamento específico?', 'La sintaxis `CREATE OR REPLACE PROCEDURE` se usa en Oracle. Define el nombre del procedimiento y sus parámetros (`p_dept_id`), y luego el bloque `BEGIN...END` contiene el código SQL a ejecutar.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 79
    (79, 'Una vista que se puede actualizar.', FALSE),
    (79, 'Un conjunto de sentencias SQL guardado que se puede reutilizar.', TRUE),
    (79, 'Un disparador que se ejecuta automáticamente.', FALSE),
    (79, 'Una función de agregación personalizada.', FALSE),
    -- Options for exercise 80
    (80, 'Son más fáciles de depurar.', FALSE),
    (80, 'Reducen el tráfico de red, mejoran la seguridad y la reutilización.', TRUE),
    (80, 'Solo se pueden escribir en Java.', FALSE),
    (80, 'No pueden aceptar parámetros.', FALSE),
    -- Options for exercise 81
    (81, '`CREATE PROCEDURE GetEmployees(...) BEGIN ... END;`', FALSE),
    (81, '`CREATE OR REPLACE PROCEDURE get_employees (p_dept_id IN employees.department_id%TYPE) IS BEGIN SELECT * FROM employees WHERE department_id = p_dept_id; END;`', TRUE),
    (81, '`DEFINE PROCEDURE get_employees(...) AS ...`', FALSE),
    (81, '`PROCEDURE get_employees(...) { ... }`', FALSE);

-- Exercises for Module 5: Advanced SQL

-- Lesson 28: Qué son los índices
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (82, 28, '¿Cuál es el propósito principal de crear un índice en una columna de una tabla?', 'Los índices se utilizan para acelerar la recuperación de filas de una tabla. Funcionan de manera similar al índice de un libro, permitiendo que la base de datos encuentre datos sin tener que escanear la tabla completa.'),
    (83, 28, '¿En qué tipo de columna es más beneficioso crear un índice?', 'Los índices son más efectivos en columnas que se usan con frecuencia en cláusulas `WHERE` o en condiciones de `JOIN`, ya que estas son las operaciones que más se benefician de un acceso rápido a los datos.'),
    (84, 28, '¿Cuál es una desventaja potencial de tener demasiados índices en una tabla?', 'Si bien los índices aceleran las consultas de lectura (`SELECT`), ralentizan las operaciones de escritura (`INSERT`, `UPDATE`, `DELETE`), ya que cada índice también debe actualizarse. También consumen espacio en disco.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 82
    (82, 'Para garantizar la unicidad de los valores.', FALSE),
    (82, 'Para acelerar el rendimiento de las consultas `SELECT`.', TRUE),
    (82, 'Para hacer que las operaciones `INSERT` sean más rápidas.', FALSE),
    (82, 'Para reducir el espacio de almacenamiento de la tabla.', FALSE),
    -- Options for exercise 83
    (83, 'En columnas con solo unos pocos valores únicos.', FALSE),
    (83, 'En columnas que se usan con frecuencia en las cláusulas `WHERE`.', TRUE),
    (83, 'En columnas pequeñas como `CHAR(1)`.', FALSE),
    (83, 'En columnas que rara vez se consultan.', FALSE),
    -- Options for exercise 84
    (84, 'Aceleran las operaciones de escritura.', FALSE),
    (84, 'Ralentizan las operaciones de escritura (`INSERT`, `UPDATE`) y consumen espacio.', TRUE),
    (84, 'No tienen ninguna desventaja.', FALSE),
    (84, 'Mejoran la velocidad de todas las consultas.', FALSE);

-- Lesson 29: Tipos de índices
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (85, 29, '¿Cuántos índices agrupados (clustered) puede tener una tabla?', 'Una tabla solo puede tener un índice agrupado, porque determina el orden físico en el que se almacenan los datos en el disco.'),
    (86, 29, '¿Cuál es la diferencia fundamental entre un índice agrupado y uno no agrupado (non-clustered)?', 'Un índice agrupado ordena y almacena físicamente las filas de datos de la tabla. Un índice no agrupado tiene una estructura separada que contiene punteros a las filas de datos reales.'),
    (87, 29, 'Si creas una clave primaria en una tabla en Oracle, ¿qué tipo de índice se crea típicamente por defecto para soportarla?', 'Por defecto, la creación de una restricción de clave primaria en una tabla creará automáticamente un índice único (generalmente no agrupado en Oracle, a diferencia de SQL Server) para hacer cumplir la unicidad.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 85
    (85, 'Ilimitados', FALSE),
    (85, 'Uno', TRUE),
    (85, 'Dos', FALSE),
    (85, 'Tantos como columnas tenga la tabla.', FALSE),
    -- Options for exercise 86
    (86, 'No hay diferencia.', FALSE),
    (86, 'El índice agrupado determina el orden físico de los datos; el no agrupado no.', TRUE),
    (86, 'Los índices agrupados son solo para texto, los no agrupados son para números.', FALSE),
    (86, 'Los índices no agrupados son más rápidos para las actualizaciones.', FALSE),
    -- Options for exercise 87
    (87, 'Un índice de texto completo.', FALSE),
    (87, 'Un índice único.', TRUE),
    (87, 'Un índice de mapa de bits.', FALSE),
    (87, 'No se crea ningún índice.', FALSE);

-- Lesson 30: Planes de ejecución de consultas
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (88, 30, '¿Qué es un plan de ejecución de consulta?', 'Un plan de ejecución es una secuencia de pasos que el optimizador de la base de datos decide usar para acceder a los datos de una consulta SQL. Muestra cómo la base de datos ejecutará la consulta.'),
    (89, 30, 'Si un plan de ejecución muestra una operación de "Table Scan" o "Full Table Scan" en una tabla muy grande, ¿qué podría indicar?', 'Un "Full Table Scan" indica que la base de datos tiene que leer cada fila de la tabla para encontrar los datos solicitados. En una tabla grande, esto suele ser ineficiente y sugiere que podría faltar un índice.'),
    (90, 30, 'Estás analizando una consulta lenta. El plan de ejecución muestra que la mayor parte del costo proviene de un `NESTED LOOP JOIN` entre dos tablas grandes. ¿Qué estrategia podría mejorar el rendimiento?', 'Los `NESTED LOOP JOINs` pueden ser ineficientes si no están respaldados por índices adecuados en las columnas de unión. Agregar un índice suele ser el primer paso. Otras alternativas podrían ser un `HASH JOIN` o un `MERGE JOIN`.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 88
    (88, 'El código fuente de la consulta SQL.', FALSE),
    (88, 'Un mapa de los pasos que utiliza la base de datos para ejecutar una consulta.', TRUE),
    (88, 'Una lista de los resultados de la consulta.', FALSE),
    (88, 'Una copia de seguridad de los datos de la consulta.', FALSE),
    -- Options for exercise 89
    (89, 'Que la consulta es extremadamente eficiente.', FALSE),
    (89, 'Que la base de datos está utilizando un índice para encontrar los datos.', FALSE),
    (89, 'Que la base de datos está leyendo cada fila de la tabla, lo que podría ser ineficiente.', TRUE),
    (89, 'Que la tabla está vacía.', FALSE),
    -- Options for exercise 90
    (90, 'Eliminar todos los índices de las tablas.', FALSE),
    (90, 'Asegurarse de que haya índices en las columnas de unión.', TRUE),
    (90, 'Aumentar el número de filas en las tablas.', FALSE),
    (90, 'Cambiar el tipo de datos de las columnas de unión a `BLOB`.', FALSE);

-- Lesson 31: Transacciones
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (91, 31, '¿Qué propiedad de las transacciones ACID garantiza que una transacción se complete en su totalidad o no se realice en absoluto?', 'La Atomicidad (Atomicity) asegura que todas las operaciones dentro de una unidad de trabajo se completen con éxito. De lo contrario, la transacción se deshace y la base de datos vuelve a su estado anterior.'),
    (92, 31, '¿Qué comando de SQL se utiliza para confirmar permanentemente los cambios realizados en una transacción?', 'El comando `COMMIT` guarda todos los cambios realizados en el contexto de la transacción actual, haciéndolos permanentes.'),
    (93, 31, 'Un usuario inicia una transacción, actualiza un registro y luego se da cuenta de que cometió un error. ¿Qué comando debería usar para deshacer la actualización?', 'El comando `ROLLBACK` deshará cualquier cambio realizado desde el inicio de la transacción (o desde el último `COMMIT` o `ROLLBACK`).');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 91
    (91, 'Consistencia (Consistency)', FALSE),
    (91, 'Atomicidad (Atomicity)', TRUE),
    (91, 'Aislamiento (Isolation)', FALSE),
    (91, 'Durabilidad (Durability)', FALSE),
    -- Options for exercise 92
    (92, '`SAVE`', FALSE),
    (92, '`COMMIT`', TRUE),
    (92, '`END`', FALSE),
    (92, '`FINISH`', FALSE),
    -- Options for exercise 93
    (93, '`UNDO`', FALSE),
    (93, '`ROLLBACK`', TRUE),
    (93, '`REVERT`', FALSE),
    (93, '`DELETE`', FALSE);

-- Lesson 32: Concurrencia y niveles de aislamiento
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (94, 32, '¿Qué problema de concurrencia ocurre cuando una transacción lee datos que han sido modificados por otra transacción aún no confirmada?', 'Una "lectura sucia" (Dirty Read) ocurre cuando una transacción lee datos que aún no son permanentes, lo que puede llevar a trabajar con datos que finalmente serán revertidos.'),
    (95, 32, '¿Qué nivel de aislamiento de transacción previene las "lecturas sucias" pero aún puede permitir "lecturas no repetibles"?', '`READ COMMITTED` es un nivel de aislamiento que garantiza que una transacción solo lea datos que han sido confirmados. Sin embargo, si otra transacción actualiza y confirma los datos, una segunda lectura dentro de la misma transacción podría devolver un valor diferente.'),
    (96, 32, 'Una aplicación de informes necesita ejecutar varias consultas complejas y requiere que los datos no cambien en absoluto durante la ejecución de su transacción. ¿Qué nivel de aislamiento sería el más apropiado?', '`SERIALIZABLE` es el nivel de aislamiento más alto. Garantiza que las transacciones ocurran como si se ejecutaran en serie, una tras otra, eliminando todos los fenómenos de concurrencia, pero a costa de un menor rendimiento.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 94
    (94, 'Lectura no repetible (Non-repeatable read)', FALSE),
    (94, 'Lectura sucia (Dirty read)', TRUE),
    (94, 'Lectura fantasma (Phantom read)', FALSE),
    (94, 'Bloqueo mutuo (Deadlock)', FALSE),
    -- Options for exercise 95
    (95, '`READ UNCOMMITTED`', FALSE),
    (95, '`READ COMMITTED`', TRUE),
    (95, '`REPEATABLE READ`', FALSE),
    (95, '`SERIALIZABLE`', FALSE),
    -- Options for exercise 96
    (96, '`READ UNCOMMITTED`', FALSE),
    (96, '`SERIALIZABLE`', TRUE),
    (96, '`READ COMMITTED`', FALSE),
    (96, 'No se necesita ningún nivel de aislamiento.', FALSE);

-- Lesson 33: Optimización del rendimiento
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (97, 33, '¿Cuál de las siguientes es una buena práctica común para optimizar las consultas SQL?', 'Seleccionar solo las columnas que necesitas (`SELECT col1, col2`) en lugar de usar `SELECT *` reduce la cantidad de datos transferidos desde la base de datos y puede mejorar el rendimiento.'),
    (98, 33, '¿Por qué se recomienda evitar el uso de funciones en las columnas dentro de una cláusula `WHERE` (por ejemplo, `WHERE UPPER(nombre) = ''JUAN''`)?', 'Aplicar una función a una columna en la cláusula `WHERE` puede impedir que el optimizador de la base de datos utilice un índice en esa columna, lo que a menudo resulta en un escaneo completo de la tabla.'),
    (99, 33, 'Estás escribiendo una consulta que necesita obtener el número total de pedidos. ¿Cuál de las siguientes consultas es probablemente la más eficiente?', '`COUNT(*)` o `COUNT(1)` suelen estar optimizados para simplemente contar filas, mientras que `COUNT(columna_pk)` podría implicar una lectura ligeramente más costosa, aunque a menudo el optimizador los trata de manera similar.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 97
    (97, 'Usar `SELECT *` siempre que sea posible.', FALSE),
    (97, 'Seleccionar solo las columnas que realmente necesitas.', TRUE),
    (97, 'Evitar el uso de `JOINs`.', FALSE),
    (97, 'Colocar todas las columnas en una sola tabla grande.', FALSE),
    -- Options for exercise 98
    (98, 'Porque las funciones están obsoletas en el SQL moderno.', FALSE),
    (98, 'Porque puede impedir el uso de un índice en esa columna.', TRUE),
    (98, 'Porque viola la Primera Forma Normal.', FALSE),
    (98, 'Porque las funciones solo se pueden usar en la lista `SELECT`.', FALSE),
    -- Options for exercise 99
    (99, '`SELECT COUNT(fecha_pedido) FROM pedidos;`', FALSE),
    (99, '`SELECT COUNT(*) FROM pedidos;`', TRUE),
    (99, '`SELECT COUNT(descripcion_pedido) FROM pedidos;`', FALSE),
    (99, '`SELECT SUM(1) FROM pedidos;`', FALSE);

-- Exercises for Module 6: About NoSQL

-- Lesson 34: Introducción a las bases de datos no relacionales
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (100, 34, '¿Cuál de las siguientes es una característica clave de muchas bases de datos NoSQL?', 'Las bases de datos NoSQL a menudo utilizan esquemas flexibles o sin esquema, lo que permite almacenar datos que no se ajustan a una estructura rígida.'),
    (101, 34, '¿Por qué surgieron las bases de datos NoSQL?', 'Surgieron en gran parte para abordar las necesidades de las aplicaciones web a gran escala (Big Data), que requerían una mayor escalabilidad horizontal, flexibilidad de esquema y, a veces, un mayor rendimiento que las bases de datos relacionales tradicionales no podían ofrecer fácilmente.'),
    (102, 34, 'Una startup está creando una nueva aplicación y espera que su modelo de datos evolucione rápidamente. ¿Por qué una base de datos NoSQL podría ser una buena opción?', 'La flexibilidad del esquema en las bases de datos NoSQL permite a los desarrolladores iterar y cambiar el modelo de datos sin realizar costosas migraciones de esquema, lo que acelera el desarrollo.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 100
    (100, 'Esquema rígido y predefinido.', FALSE),
    (100, 'Flexibilidad de esquema y escalabilidad horizontal.', TRUE),
    (100, 'Soporte obligatorio para transacciones ACID.', FALSE),
    (100, 'Uso exclusivo del lenguaje SQL.', FALSE),
    -- Options for exercise 101
    (101, 'Para reemplazar completamente a las bases de datos relacionales.', FALSE),
    (101, 'Para manejar los requisitos de Big Data, escalabilidad y flexibilidad de las aplicaciones web modernas.', TRUE),
    (101, 'Porque eran más baratas de construir.', FALSE),
    (101, 'Para cumplir con las regulaciones gubernamentales.', FALSE),
    -- Options for exercise 102
    (102, 'Porque NoSQL es mejor para la integridad de los datos.', FALSE),
    (102, 'Debido a su esquema flexible, que facilita la adaptación a los cambios.', TRUE),
    (102, 'Porque las bases de datos SQL no pueden almacenar datos de usuarios.', FALSE),
    (102, 'Porque NoSQL ofrece mejores herramientas de visualización.', FALSE);

-- Lesson 35: Tipos de bases de datos NoSQL
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (103, 35, '¿Qué tipo de base de datos NoSQL es más adecuada para almacenar datos como JSON o documentos BSON?', 'Las bases de datos de documentos, como MongoDB, están diseñadas específicamente para almacenar, consultar y gestionar datos orientados a documentos en formatos como JSON.'),
    (104, 35, 'Si tu principal requisito es la recuperación de datos extremadamente rápida basada en una clave única (como en una caché), ¿qué tipo de base de datos NoSQL elegirías?', 'Las bases de datos de clave-valor, como Redis o DynamoDB, se especializan en búsquedas muy rápidas utilizando un par de clave-valor simple, lo que las hace ideales para casos de uso de caché.'),
    (105, 35, 'Estás construyendo una red social y necesitas analizar las relaciones complejas y las conexiones entre los usuarios. ¿Qué tipo de base de datos NoSQL sería la mejor opción?', 'Las bases de datos de grafos, como Neo4j, están optimizadas para almacenar y navegar por relaciones. Son ideales para modelar redes, sistemas de recomendación y datos de redes sociales.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 103
    (103, 'Clave-valor', FALSE),
    (103, 'Documentos', TRUE),
    (103, 'Columna ancha', FALSE),
    (103, 'Grafos', FALSE),
    -- Options for exercise 104
    (104, 'Grafos', FALSE),
    (104, 'Clave-valor', TRUE),
    (104, 'Documentos', FALSE),
    (104, 'Columna ancha', FALSE),
    -- Options for exercise 105
    (105, 'Clave-valor', FALSE),
    (105, 'Grafos', TRUE),
    (105, 'Documentos', FALSE),
    (105, 'Relacional', FALSE);

-- Lesson 36: Cuándo usar NoSQL
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (106, 36, '¿En qué escenario sería preferible una base de datos relacional (SQL) a una NoSQL?', 'Cuando la integridad de los datos y la consistencia (transacciones ACID) son críticas, como en un sistema bancario, las bases de datos relacionales suelen ser la opción superior.'),
    (107, 36, '¿Qué característica de una aplicación sugiere fuertemente que una base de datos NoSQL podría ser una buena opción?', 'Las aplicaciones que necesitan escalar a un gran número de usuarios y manejar grandes volúmenes de datos con una estructura variable (Big Data) son candidatas principales para NoSQL.'),
    (108, 36, 'Una empresa está lanzando un blog. El contenido consiste en artículos, comentarios y etiquetas. Las relaciones son importantes (artículo-comentarios), pero la estructura de los comentarios puede variar. ¿Qué tipo de base de datos sería una elección razonable?', 'Una base de datos de documentos NoSQL es una excelente opción aquí. Puede almacenar cada artículo y sus comentarios anidados como un solo documento, lo que hace que las lecturas sean rápidas, mientras que el esquema flexible se adapta a diferentes estructuras de datos.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 106
    (106, 'Una aplicación de análisis de redes sociales.', FALSE),
    (106, 'Un sistema de procesamiento de transacciones financieras.', TRUE),
    (106, 'Un catálogo de productos con datos semiestructurados.', FALSE),
    (106, 'Un sistema de gestión de contenidos con un rápido desarrollo.', FALSE),
    -- Options for exercise 107
    (107, 'Necesidad de un esquema fijo y bien definido.', FALSE),
    (107, 'Necesidad de escalabilidad horizontal masiva y flexibilidad de esquema.', TRUE),
    (107, 'Requisitos de bajo volumen de datos.', FALSE),
    (107, 'El equipo de desarrollo solo conoce SQL.', FALSE),
    -- Options for exercise 108
    (108, 'Una base de datos relacional estricta, por las relaciones.', FALSE),
    (108, 'Una base de datos de documentos, por la flexibilidad y el rendimiento de lectura.', TRUE),
    (108, 'Una base de datos de clave-valor, porque es la más simple.', FALSE),
    (108, 'Una base de datos de grafos, porque hay comentarios.', FALSE);

-- Lesson 37: Manejo de datos no estructurados
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (109, 37, '¿Qué se entiende por "datos no estructurados"?', 'Datos no estructurados son información que no tiene un modelo de datos predefinido o que no está organizada de una manera predeterminada, como texto, imágenes, videos o publicaciones en redes sociales.'),
    (110, 37, '¿Cómo maneja una base de datos de documentos, como MongoDB, los datos semiestructurados?', 'Permite almacenar documentos (por ejemplo, en formato JSON) que pueden tener diferentes campos y estructuras. No impone un esquema a nivel de base de datos, lo que permite una gran flexibilidad.'),
    (111, 37, 'Estás registrando datos de sensores de IoT. Algunos sensores envían temperatura y humedad, mientras que otros envían ubicación y presión. ¿Por qué una base de datos NoSQL es adecuada para este caso?', 'Una base de datos NoSQL (especialmente de documentos o de columna ancha) es ideal porque puede manejar registros con diferentes campos (esquema flexible) sin problemas, a diferencia de una tabla relacional rígida que requeriría muchas columnas anulables o tablas separadas.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 109
    (109, 'Datos organizados en tablas con filas y columnas.', FALSE),
    (109, 'Datos que no tienen un modelo de datos predefinido.', TRUE),
    (109, 'Solo datos numéricos.', FALSE),
    (109, 'Datos que están encriptados.', FALSE),
    -- Options for exercise 110
    (110, 'Exige que todos los documentos tengan exactamente la misma estructura.', FALSE),
    (110, 'Permite que los documentos dentro de la misma colección tengan campos y estructuras diferentes.', TRUE),
    (110, 'Convierte todos los documentos a un formato relacional.', FALSE),
    (110, 'Rechaza cualquier documento que no se ajuste a un esquema inicial.', FALSE),
    -- Options for exercise 111
    (111, 'Porque las bases de datos NoSQL solo aceptan números.', FALSE),
    (111, 'Debido a su esquema flexible, que permite que cada registro de sensor tenga un conjunto diferente de campos.', TRUE),
    (111, 'Porque las bases de datos SQL no pueden manejar marcas de tiempo.', FALSE),
    (111, 'Porque NoSQL es menos seguro.', FALSE);

-- Lesson 38: Escalabilidad y rendimiento
INSERT INTO exercises (exercise_id, lesson_id, question, reason)
VALUES
    (112, 38, 'En el contexto de las bases de datos, ¿qué es la "escalabilidad horizontal" (scaling out)?', 'La escalabilidad horizontal significa agregar más máquinas a un clúster para distribuir la carga. Es el enfoque de escalado principal para muchas bases de datos NoSQL.'),
    (113, 38, '¿Qué es el "sharding" (fragmentación) en una base de datos?', 'El sharding es el proceso de dividir una base de datos grande en partes más pequeñas y manejables (shards) y distribuirlas entre múltiples servidores. Cada shard es una base de datos independiente.'),
    (114, 38, '¿Cuál es el principal beneficio del sharding para una aplicación con un gran volumen de datos?', 'El sharding permite a la base de datos escalar horizontalmente, distribuyendo tanto los datos como la carga de consultas entre múltiples servidores. Esto mejora el rendimiento y la capacidad más allá de lo que un solo servidor podría manejar.');

INSERT INTO exercise_options (exercise_id, text, is_correct)
VALUES
    -- Options for exercise 112
    (112, 'Aumentar los recursos (CPU, RAM) de un solo servidor (escalabilidad vertical).', FALSE),
    (112, 'Agregar más servidores para distribuir la carga (escalabilidad horizontal).', TRUE),
    (112, 'Actualizar el software de la base de datos.', FALSE),
    (112, 'Reducir la cantidad de datos en la base de datos.', FALSE),
    -- Options for exercise 113
    (113, 'Crear una copia de seguridad de la base de datos.', FALSE),
    (113, 'Dividir la base de datos horizontalmente entre múltiples servidores.', TRUE),
    (113, 'Crear un índice en una tabla.', FALSE),
    (113, 'Replicar la base de datos para alta disponibilidad.', FALSE),
    -- Options for exercise 114
    (114, 'Garantiza transacciones ACID completas.', FALSE),
    (114, 'Permite el escalado horizontal para mejorar el rendimiento y la capacidad.', TRUE),
    (114, 'Simplifica la arquitectura de la base de datos.', FALSE),
    (114, 'Elimina la necesidad de copias de seguridad.', FALSE);
