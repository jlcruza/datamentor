## 2. Creando Tablas y Definiendo Tipos de Datos

### ¿Por Qué Definir una Estructura?

Antes de poder guardar tus cosas en cajas, necesitas las cajas. Y no usarías una caja de zapatos para guardar agua, ¿verdad? Crear una tabla es como diseñar un formulario o una hoja de cálculo: defines qué columnas tendrá y qué tipo de información irá en cada una. Esto garantiza que los datos sean consistentes, organizados y fiables.

### Creando una Tabla con `CREATE TABLE`

El comando `CREATE TABLE` te permite construir la estructura de una tabla. Para cada columna, debes especificar un nombre y un tipo de dato.
```oracle
CREATE TABLE nombre_de_la_tabla (
    nombre_columna1 TIPO_DE_DATO RESTRICCIONES,
    nombre_columna2 TIPO_DE_DATO,
    ...
    PRIMARY KEY (nombre_columna_clave)
);
```

**Tipos de Datos Comunes en Oracle:**
- `VARCHAR2(size)`: Para texto de longitud variable, como nombres o direcciones. ¡Es el tipo de texto más común y recomendado en Oracle!
- `NUMBER(precision, scale)`: Para números. `precision` es el número total de dígitos y `scale` es el número de dígitos después del punto decimal. Por ejemplo, `NUMBER(5, 2)` puede almacenar `123.45`. `NUMBER(10)` almacena un entero de hasta 10 dígitos.
- `DATE`: Para almacenar fechas y horas (siglo, año, mes, día, hora, minuto y segundo).
- `CLOB (Character Large Object)`: Para textos muy largos, como descripciones de productos o artículos de blog.

### Ejemplo Ilustrativo

Vamos a crear una tabla para almacenar información de nuestros estudiantes.

```oracle
CREATE TABLE Estudiantes (
    ID_Estudiante NUMBER(10) PRIMARY KEY,
    Nombre VARCHAR2(50) NOT NULL,
    Apellido VARCHAR2(50),
    Fecha_Nacimiento DATE,
    Email VARCHAR2(100) UNIQUE
);
```

En este ejemplo:
- `ID_Estudiante` es un número que servirá como identificador único (`PRIMARY KEY`).
- `Nombre` es un texto obligatorio (`NOT NULL`).
- `Apellido` es un texto opcional.
- `Fecha_Nacimiento` almacenará la fecha.
- `Email` debe ser único para cada estudiante (`UNIQUE`).

### Consejos de los Expertos

- **Elige el Tipo Correcto:** Usar el tipo de dato correcto ahorra espacio y previene errores. No uses `VARCHAR2` para almacenar fechas o números que necesites calcular.
- **`VARCHAR2` sobre `CHAR`:** Prefiere siempre `VARCHAR2` a `CHAR`. `CHAR(50)` siempre usará 50 bytes de espacio, incluso si guardas "Ana". `VARCHAR2(50)` solo usará el espacio que necesite el texto.
- **Define Restricciones:** Usa `PRIMARY KEY`, `NOT NULL`, `UNIQUE` y otras restricciones para proteger la integridad de tus datos desde el principio.

### Resumen

Con `CREATE TABLE`, diseñas el esqueleto de tus datos. Elegir los tipos de datos y restricciones correctos es un paso fundamental para construir una base de datos robusta y fiable.
