## Lección 4: Claves Primarias y Foráneas Explicadas

### ¿Por qué debo aprender esto?
Ya sabemos que las tablas se relacionan, pero ¿cómo se implementa esa conexión a nivel técnico? La respuesta son las claves. Las claves primarias actúan como el "DNI" de cada registro, asegurando que sea único. Las claves foráneas son el "puente" que conecta un registro con otro en una tabla diferente. Son la maquinaria que hace que las relaciones funcionen.

---

### Términos Clave

Antes de profundizar en las claves, entendamos estos conceptos:

- **Clave Primaria (Primary Key - PK):** Una columna (o conjunto de columnas) que identifica de forma única cada fila en una tabla. No puede contener valores NULL ni duplicados.
- **Clave Foránea (Foreign Key - FK):** Una columna (o conjunto de columnas) en una tabla que hace referencia a la clave primaria de otra tabla, estableciendo una relación entre ambas.
- **Integridad Referencial:** Un conjunto de reglas que garantiza que las relaciones entre tablas permanezcan consistentes. Por ejemplo, no puedes tener un libro que apunte a un autor que no existe.
- **Clave Subrogada (Surrogate Key):** Una clave primaria artificial, generalmente un número autoincremental, que no tiene significado en el mundo real pero sirve únicamente para identificar registros.
- **Clave Natural (Natural Key):** Una clave primaria basada en datos del mundo real que tienen significado, como un número de documento de identidad o un código de producto.
- **CONSTRAINT:** Una restricción o regla que se aplica a los datos de una tabla para garantizar su integridad.

---

### Explicación del Concepto
*   **Clave Primaria (Primary Key - PK):** Es una columna (o un conjunto de columnas) que identifica de forma única cada fila en una tabla.
    *   **Reglas:** No puede contener valores `NULL` y su valor debe ser único para toda la tabla.
    *   **Analogía:** El DNI de una persona o el número de serie de un producto.

*   **Clave Foránea (Foreign Key - FK):** Es una columna (o un conjunto de columnas) en una tabla que hace referencia a la Clave Primaria de otra tabla. Es el mecanismo que crea el vínculo entre las dos tablas.
    *   **Analogía:** Si tienes una tabla `Pedidos`, la columna `id_cliente` en esa tabla es una clave foránea que "apunta" al cliente específico en la tabla `Clientes`.

### Ejemplo en SQL
Vamos a crear las tablas `Autores` y `Libros`, definiendo sus claves para establecer una relación 1:N (un autor, muchos libros).
```oracle
-- La tabla de "uno"
CREATE TABLE Autores (
    autor_id    NUMBER(10) NOT NULL,
    nombre      VARCHAR2(100),
    CONSTRAINT pk_autores PRIMARY KEY (autor_id) -- Definición de la Clave Primaria
);

-- La tabla de "muchos"
CREATE TABLE Libros (
    libro_id    NUMBER(10) NOT NULL,
    titulo      VARCHAR2(255),
    autor_id    NUMBER(10), -- Esta columna contendrá el ID del autor
    CONSTRAINT pk_libros PRIMARY KEY (libro_id),
    CONSTRAINT fk_libros_autores -- Dando un nombre a la Clave Foránea
        FOREIGN KEY (autor_id) -- La columna en *esta* tabla
        REFERENCES Autores(autor_id) -- Apunta a la PK de la tabla Autores
);
```

### Consejos de los Expertos
*   **Prefiere Claves Primarias Numéricas (Subrogadas):** Es una práctica común y muy recomendada usar una simple columna numérica autoincremental como PK (en Oracle se logra con secuencias o columnas de identidad). Las claves subrogadas son más eficientes y estables que usar claves naturales como un email o un nombre de usuario, ya que estos valores del mundo real pueden cambiar.
*   **Nombra tus Constraints (Restricciones):** Dar un nombre explícito a tu clave foránea como `fk_libros_autores` hace que los mensajes de error de la base de datos sean mucho más fáciles de entender.
*   **Las Claves Foráneas Protegen tus Datos:** Este mecanismo de integridad referencial impide que crees un libro con un `autor_id` que no existe en la tabla `Autores`. ¡La base de datos valida automáticamente que las relaciones sean válidas, previniendo datos huérfanos o inconsistentes!

---

### Resumen
Las Claves Primarias (PK) garantizan la unicidad de cada registro en una tabla. Las Claves Foráneas (FK) son las que materializan las relaciones, apuntando a la PK de otra tabla. Juntas, forman el esqueleto de una base de datos relacional robusta y coherente.
