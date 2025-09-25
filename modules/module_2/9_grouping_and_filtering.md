## 9. Agrupando y Filtrando con `GROUP BY` y `HAVING`

### ¿Por Qué Agrupar Datos?

Las funciones de agregación son geniales para resumir una tabla entera. Pero, ¿qué pasa si quieres resúmenes de *subconjuntos* de datos? Por ejemplo, no solo "¿cuántos estudiantes hay?", sino "¿cuántos estudiantes hay *por cada ciudad*?". `GROUP BY` te permite dividir tus datos en grupos y aplicar funciones de agregación a cada uno de ellos. Es la base del análisis de datos segmentado.

### Agrupando con `GROUP BY`

La cláusula `GROUP BY` se usa con funciones de agregación. Consolida todas las filas que tienen el mismo valor en una columna (o columnas) en una sola fila de resumen.
```oracle
SELECT columna_para_agrupar, FUNCION_DE_AGREGACION(columna)
FROM tabla
GROUP BY columna_para_agrupar;
```

**Regla de Oro de `GROUP BY`:** Cualquier columna en la cláusula `SELECT` que no sea una función de agregación **debe** estar en la cláusula `GROUP BY`.

**Ejemplo:** Suponiendo que nuestra tabla `Estudiantes` tiene una columna `Ciudad`.
```oracle
SELECT Ciudad, COUNT(*) AS Numero_De_Estudiantes
FROM Estudiantes
GROUP BY Ciudad;
```

Este query devolverá una fila por cada ciudad distinta, con el conteo de estudiantes en esa ciudad.

### Filtrando Grupos con `HAVING`

Ya sabes cómo `WHERE` filtra filas individuales. Pero, ¿qué pasa si quieres filtrar los *resultados de los grupos*? Por ejemplo, "¿qué ciudades tienen *más de 50 estudiantes*?". No puedes usar `WHERE COUNT(*) > 50` porque `WHERE` se ejecuta antes de que se formen los grupos.

Aquí es donde entra `HAVING`. `HAVING` es como un `WHERE`, pero para los grupos creados por `GROUP BY`. Se ejecuta *después* de la agregación.
```oracle
SELECT columna_para_agrupar, FUNCION_DE_AGREGACION(columna)
FROM tabla
GROUP BY columna_para_agrupar
HAVING condicion_sobre_agregacion;
```

**Ejemplo:** Mostrar solo las ciudades con más de 50 estudiantes.
```oracle
SELECT Ciudad, COUNT(*)
FROM Estudiantes
GROUP BY Ciudad
HAVING COUNT(*) > 50;
```

### `WHERE` vs. `HAVING`: La Gran Diferencia

- `WHERE` filtra **filas** (antes de agrupar).
- `HAVING` filtra **grupos** (después de agrupar).
```oracle
SELECT Ciudad, AVG(Nota)
FROM Calificaciones
WHERE Anio = 2023 -- Filtra filas: solo calificaciones del año 2023
GROUP BY Ciudad
HAVING AVG(Nota) > 7.5; -- Filtra grupos: solo ciudades cuyo promedio fue mayor a 7.5
```

### Resumen

`GROUP BY` es la herramienta esencial para el análisis segmentado, permitiéndote aplicar agregaciones a subconjuntos de datos. `HAVING` completa este proceso al permitirte filtrar los resultados de esos grupos. Dominar la combinación de `SELECT`, `WHERE`, `GROUP BY` y `HAVING` te abre las puertas a un análisis de datos increíblemente detallado y potente.