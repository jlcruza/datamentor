## 9. Agrupando y Filtrando con `GROUP BY` y `HAVING`

### ¿Por Qué Agrupar Datos?

Las funciones de agregación son geniales para resumir una tabla entera. Pero, ¿qué pasa si quieres resúmenes de *subconjuntos* de datos? Por ejemplo, no solo "¿cuántos estudiantes hay?", sino "¿cuántos estudiantes hay *por cada ciudad*?". `GROUP BY` te permite dividir tus datos en grupos y aplicar funciones de agregación a cada uno de ellos. Es la base del análisis de datos segmentado.

---

### Términos Clave

Antes de aprender a agrupar datos, entendamos estos conceptos:

- **GROUP BY:** Cláusula SQL que agrupa filas que tienen valores idénticos en columnas especificadas, permitiendo aplicar funciones de agregación a cada grupo.
- **HAVING:** Cláusula que filtra grupos creados por GROUP BY, basada en el resultado de funciones de agregación. Es como WHERE, pero para grupos en lugar de filas individuales.
- **Agregación por Grupo:** El proceso de calcular valores resumen (COUNT, SUM, AVG, etc.) para cada grupo de filas en lugar de para toda la tabla.
- **Diferencia WHERE vs HAVING:**
  - **WHERE:** Filtra filas individuales ANTES de agrupar
  - **HAVING:** Filtra grupos DESPUÉS de agrupar y agregar

---

### Agrupando con `GROUP BY`

La cláusula `GROUP BY` se usa con funciones de agregación. Consolida todas las filas que tienen el mismo valor en una columna (o columnas) en una sola fila de resumen.
```oracle
SELECT columna_para_agrupar, FUNCION_DE_AGREGACION(columna)
FROM tabla
GROUP BY columna_para_agrupar;
```

**Regla de Oro de `GROUP BY`:** Cualquier columna en la cláusula `SELECT` que no sea una función de agregación **debe** estar en la cláusula `GROUP BY`.

**Ejemplo:** Contar cuántos estudiantes hay por cada especialidad.
```oracle
SELECT id_especialidad, COUNT(*) AS numero_estudiantes
FROM ESTUDIANTES
GROUP BY id_especialidad;
```

Este query devolverá una fila por cada especialidad distinta, con el conteo de estudiantes en esa especialidad.

### Filtrando Grupos con `HAVING`

Ya sabes cómo `WHERE` filtra filas individuales. Pero, ¿qué pasa si quieres filtrar los *resultados de los grupos*? Por ejemplo, "¿qué ciudades tienen *más de 50 estudiantes*?". No puedes usar `WHERE COUNT(*) > 50` porque `WHERE` se ejecuta antes de que se formen los grupos.

Aquí es donde entra `HAVING`. `HAVING` es como un `WHERE`, pero para los grupos creados por `GROUP BY`. Se ejecuta *después* de la agregación.
```oracle
SELECT columna_para_agrupar, FUNCION_DE_AGREGACION(columna)
FROM tabla
GROUP BY columna_para_agrupar
HAVING condicion_sobre_agregacion;
```

**Ejemplo:** Mostrar solo las especialidades con más de 2 estudiantes.
```oracle
SELECT id_especialidad, COUNT(*) AS total
FROM ESTUDIANTES
GROUP BY id_especialidad
HAVING COUNT(*) > 2;
```

### `WHERE` vs. `HAVING`: La Gran Diferencia

- `WHERE` filtra **filas** (antes de agrupar).
- `HAVING` filtra **grupos** (después de agrupar).
```oracle
SELECT id_curso, AVG(nota) AS promedio
FROM MATRICULAS
WHERE semestre = 'Otoño 2025' -- Filtra filas: solo matrículas del semestre Otoño 2025
GROUP BY id_curso
HAVING AVG(nota) > 90; -- Filtra grupos: solo cursos cuyo promedio fue mayor a 90
```

---

### Resumen

`GROUP BY` es la herramienta esencial para el análisis segmentado, permitiéndote aplicar agregaciones a subconjuntos de datos. `HAVING` completa este proceso al permitirte filtrar los resultados de esos grupos. Dominar la combinación de `SELECT`, `WHERE`, `GROUP BY` y `HAVING` te abre las puertas a un análisis de datos increíblemente detallado y potente.