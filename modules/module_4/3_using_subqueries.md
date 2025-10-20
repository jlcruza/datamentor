## Lección 3: Usando Subconsultas (Anidadas y Correlacionadas)

### ¿Por qué poner una consulta dentro de otra?

Imagina que necesitas encontrar a los empleados que ganan más que el salario promedio de *toda* la empresa. No puedes hacer esto en un solo paso. Primero, necesitas responder una pregunta: "¿Cuál es el salario promedio?". Luego, usas esa respuesta para una segunda pregunta: "¿Qué empleados ganan más que esa cantidad?".

Una **subconsulta** (o *subquery*) es una consulta `SELECT` anidada dentro de otra consulta. Te permite realizar operaciones en varios pasos, donde el resultado de la consulta interna se usa para alimentar a la consulta externa. Es una herramienta poderosa para resolver problemas complejos.

---

### Términos Clave

Antes de aprender sobre subconsultas, entendamos estos conceptos:

- **Subconsulta (Subquery):** Una consulta SELECT anidada dentro de otra consulta SQL (puede estar en WHERE, FROM, SELECT, etc.).
- **Subconsulta Anidada (No Correlacionada):** Subconsulta que se ejecuta una sola vez de forma independiente, antes de la consulta principal.
- **Subconsulta Correlacionada:** Subconsulta que se ejecuta una vez por cada fila de la consulta externa y hace referencia a columnas de la consulta externa.
- **IN:** Operador que verifica si un valor existe en un conjunto de valores o en el resultado de una subconsulta.
- **EXISTS:** Operador que verifica si una subconsulta devuelve al menos una fila. Más eficiente que IN en muchos casos.
- **CTE (Common Table Expression - Expresión de Tabla Común):** Alternativa más legible a las subconsultas, que será explicada en la siguiente lección.
- **Rendimiento (Performance):** La velocidad y eficiencia con la que se ejecuta una consulta.

---

### Tipos de Subconsultas

#### 1. Subconsulta Anidada (o No Correlacionada)
Esta subconsulta se ejecuta **una sola vez**, antes que la consulta principal. Su resultado es un valor o una lista de valores que no cambia.

**Ejemplo Ilustrativo:** Encontrar los empleados que trabajan en el departamento de "Ventas".

Primero, necesitamos el `ID_DEPARTAMENTO` de "Ventas". Luego, buscamos los empleados con ese ID.
```sql
SELECT
    NOMBRE
FROM
    EMPLEADOS
WHERE
    ID_DEPARTAMENTO = (SELECT ID_DEPARTAMENTO 
                       FROM DEPARTAMENTOS 
                       WHERE NOMBRE_DEPTO = 'Ventas');
```

La subconsulta `(SELECT ID_DEPARTAMENTO ...)` se ejecuta primero y devuelve `101`. Luego, la consulta principal se convierte en: `SELECT NOMBRE FROM EMPLEADOS WHERE ID_DEPARTAMENTO = 101;`.

Las subconsultas también pueden devolver múltiples filas usando operadores como `IN`:
```sql
-- Empleados que están en CUALQUIER departamento ubicado en el edificio 'A'
SELECT
    NOMBRE
FROM
    EMPLEADOS
WHERE
    ID_DEPARTAMENTO IN (SELECT ID_DEPARTAMENTO 
                        FROM DEPARTAMENTOS 
                        WHERE UBICACION = 'Edificio A');
```

#### 2. Subconsulta Correlacionada
Esta subconsulta está vinculada a la consulta externa y se ejecuta **una vez por cada fila** que procesa la consulta externa. Depende de los datos de la fila actual.

**Analogía:** Es como si, para cada empleado en una lista, tuvieras que hacer una pregunta específica sobre él. Por ejemplo, para cada empleado, preguntar: "¿Cuál es el salario promedio *de su propio departamento*?".

**Ejemplo Ilustrativo:** Encontrar empleados cuyo salario es mayor que el promedio *de su respectivo departamento*.
```sql
SELECT
    e1.NOMBRE,
    e1.SALARIO
FROM
    EMPLEADOS e1
WHERE
    e1.SALARIO > (SELECT AVG(e2.SALARIO)
                  FROM EMPLEADOS e2
                  WHERE e2.ID_DEPARTAMENTO = e1.ID_DEPARTAMENTO);
```

Aquí, la subconsulta se ejecuta para cada empleado (`e1`). Para Ana (depto 101), calcula el promedio del depto 101. Para Luis (depto 102), calcula el promedio del depto 102, y así sucesivamente.

### Consejos de los Expertos
- **Cuidado con el rendimiento:** Las subconsultas correlacionadas pueden ser muy lentas en tablas grandes, ya que se ejecutan repetidamente. A menudo, un `JOIN` o una Expresión de Tabla Común (CTE) es una alternativa mucho más eficiente.
- **`EXISTS` vs. `IN`:** Para subconsultas correlacionadas donde solo necesitas verificar si existe *alguna* fila que cumpla una condición, `EXISTS` suele ser más eficiente que `IN`. `EXISTS` se detiene tan pronto como encuentra una coincidencia.
- **Legibilidad:** Aunque son potentes, las subconsultas anidadas profundamente pueden hacer que el código sea difícil de leer. Si una consulta se vuelve demasiado compleja, considera refactorizarla con `JOIN` o CTEs.

---

### Resumen
Las subconsultas te permiten construir consultas más sofisticadas al anidar una dentro de otra. Las anidadas se ejecutan una vez y son excelentes para filtros simples, mientras que las correlacionadas se ejecutan para cada fila de la consulta principal y resuelven problemas más complejos, aunque con un posible costo de rendimiento. Son una herramienta esencial, pero siempre considera si un `JOIN` podría hacer el trabajo de manera más eficiente y legible.
