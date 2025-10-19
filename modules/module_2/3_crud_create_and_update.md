## 3. Insertando y Actualizando Datos (CRUD: Crear y Actualizar)

### ¿Por Qué Manipular Datos?

Tener tablas vacías no es muy útil. El verdadero poder de una base de datos se desata cuando la llenas de información y la mantienes actualizada. Insertar datos es como añadir una nueva fila a tu hoja de cálculo. Actualizar es como corregir un error o cambiar un dato que ha quedado obsoleto.

---

### Términos Clave

Antes de comenzar a manipular datos, definamos los comandos y conceptos importantes:

- **INSERT INTO:** Comando SQL para agregar nuevas filas (registros) a una tabla.
- **VALUES:** Cláusula que especifica los valores que se insertarán en cada columna.
- **UPDATE:** Comando SQL para modificar datos existentes en una o más filas de una tabla.
- **SET:** Cláusula que especifica qué columnas se modificarán y sus nuevos valores.
- **WHERE:** Cláusula que filtra qué filas se verán afectadas por un UPDATE o DELETE. Sin WHERE, ¡se afectan TODAS las filas!
- **TO_DATE:** Función de Oracle que convierte una cadena de texto en un valor de tipo DATE. Ejemplo: `TO_DATE('2025-01-15', 'YYYY-MM-DD')`.

---

### Insertando Filas con `INSERT INTO`

El comando `INSERT INTO` te permite añadir nuevos registros (filas) a una tabla.

**Sintaxis 1: Especificando columnas** (la forma más segura)
```oracle
INSERT INTO nombre_de_la_tabla (columna1, columna2, columna3)
VALUES (valor1, valor2, valor3);
```

**Sintaxis 2: Sin especificar columnas** (requiere que los valores estén en el orden exacto de la tabla)
```oracle
INSERT INTO nombre_de_la_tabla
VALUES (valor1, valor2, valor3, ...);
```

**Ejemplo:** Añadamos un estudiante a nuestra tabla.
```oracle
INSERT INTO Estudiantes (ID_Estudiante, Nombre, Apellido, Fecha_Nacimiento, Email)
VALUES (1, 'Carlos', 'Santana', TO_DATE('1998-07-20', 'YYYY-MM-DD'), 'carlos.s@example.com');
```

Nota: Para las fechas, usamos la función `TO_DATE` para convertir una cadena de texto a un formato de fecha que Oracle entienda. El primer parámetro es la fecha como texto, el segundo es el formato que sigue esa fecha.

### Modificando Filas con `UPDATE`

El comando `UPDATE` se usa para modificar registros que ya existen en la tabla.
```oracle
UPDATE nombre_de_la_tabla
SET columna1 = nuevo_valor1,
    columna2 = nuevo_valor2
WHERE condicion;
```

La cláusula `WHERE` es **crucial**. Especifica *qué* filas quieres actualizar. Si la omites, ¡Oracle actualizará **todas** las filas de la tabla, lo cual generalmente no es lo que deseas!

**Ejemplo:** Carlos Santana se ha cambiado el email.
```oracle
UPDATE Estudiantes
SET Email = 'c.santana.new@example.com'
WHERE ID_Estudiante = 1;
```

### Consejos de los Expertos

- **`UPDATE` y `DELETE` con `WHERE`:** ¡IMPORTANTE! **Siempre** usa una cláusula `WHERE` con `UPDATE` y `DELETE`. Para estar seguro, puedes ejecutar primero un `SELECT` con la misma condición `WHERE` para ver exactamente qué filas se verán afectadas.
- **Insersión Explícita:** Prefiere siempre la sintaxis de `INSERT` que especifica los nombres de las columnas. Si en el futuro alguien añade una nueva columna a la tabla, tu consulta no se romperá.

---

### Resumen

`INSERT INTO` agrega nuevos datos y `UPDATE` modifica los existentes. Son dos de las operaciones más comunes del día a día. La clave para usarlos de forma segura es entender el poder (y el peligro) de la cláusula `WHERE`.
