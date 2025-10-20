## 6. Filtrando Resultados con `WHERE`

### ¿Por Qué Filtrar?

Rara vez querrás ver *toda* la información de una tabla. Lo más común es que busques respuestas a preguntas específicas: "¿Qué estudiantes nacieron después del año 2000?", "¿Qué productos cuestan menos de $50?", "¿Quién es el usuario 'admin'?". La cláusula `WHERE` es la herramienta que te permite hacer estas preguntas y filtrar los datos para obtener solo las filas que te interesan. Es el detective de SQL.

---

### Términos Clave

Antes de aprender a filtrar datos, entendamos estos operadores y conceptos:

- **WHERE:** Cláusula que especifica las condiciones que deben cumplir las filas para ser incluidas en el resultado.
- **Operador de Comparación:** Símbolos que comparan dos valores (=, !=, <, >, <=, >=).
- **Operador Lógico:** Operadores que combinan múltiples condiciones (AND, OR, NOT).
- **AND:** Operador lógico que requiere que todas las condiciones sean verdaderas.
- **OR:** Operador lógico que requiere que al menos una condición sea verdadera.
- **NOT:** Operador lógico que niega (invierte) una condición.
- **BETWEEN:** Operador que verifica si un valor está dentro de un rango (inclusivo).
- **IN:** Operador que verifica si un valor coincide con cualquier elemento de una lista.
- **LIKE:** Operador para búsquedas de patrones en texto. Usa comodines: `%` (cualquier cantidad de caracteres) y `_` (un solo carácter).
- **NULL:** Valor especial que representa la ausencia de datos. Se verifica con `IS NULL` o `IS NOT NULL`, no con `=`.

---

### ¿Cómo Funciona `WHERE`?

La cláusula `WHERE` se coloca después de la cláusula `FROM` y antes de otras como `ORDER BY`. Contiene una o más condiciones que deben ser verdaderas para que una fila se incluya en el resultado.
```sql
SELECT columnas
FROM tabla
WHERE condicion;
```

**Operadores de Comparación:**
- `=`: Igual a
- `!=` o `<>`: Distinto de
- `>`: Mayor que
- `<`: Menor que
- `>=`: Mayor o igual que
- `<=`: Menor o igual que

**Operadores Lógicos:**
- `AND`: Todas las condiciones deben ser verdaderas.
- `OR`: Al menos una de las condiciones debe ser verdadera.
- `NOT`: Niega una condición.

**Otros Operadores Útiles:**
- `BETWEEN x AND y`: El valor está en el rango de `x` a `y` (inclusivo).
- `IN (valor1, valor2, ...)`: El valor coincide con cualquiera de la lista.
- `LIKE`: Búsqueda de patrones en texto (con comodines `%` y `_`).

### Ejemplos Ilustrativos

- **Pregunta:** "Mostrar los estudiantes mayores de 21 años."
```sql
SELECT nombre, edad
FROM ESTUDIANTES
WHERE edad > 21;
```

- **Pregunta:** "Mostrar los estudiantes que se matricularon en septiembre de 2025."
```sql
SELECT nombre, fecha_matricula
FROM ESTUDIANTES
WHERE fecha_matricula BETWEEN TO_DATE('2025-09-01', 'YYYY-MM-DD') AND TO_DATE('2025-09-30', 'YYYY-MM-DD');
```

- **Pregunta:** "Encontrar estudiantes cuyo email termine en `@email.com`."
```sql
SELECT nombre, email
FROM ESTUDIANTES
WHERE email LIKE '%@email.com';
```

### Consejos de los Expertos

- **Manejo de NULL:** Un valor NULL significa "desconocido" o "no aplicable". No puedes compararlo con `=` o `!=` porque NULL no es igual a nada, ni siquiera a sí mismo. En su lugar, debes usar `IS NULL` o `IS NOT NULL`.
  ```sql
  WHERE id_especialidad IS NULL  -- Encuentra estudiantes sin especialidad asignada
  ```
- **Orden de los Operadores:** Usa paréntesis `()` para agrupar condiciones `AND` y `OR` y asegurar que se evalúen en el orden que deseas, evitando ambigüedades.

---

### Resumen

La cláusula `WHERE` es fundamental para realizar consultas significativas. Te permite pasar de ver un mar de datos a obtener respuestas concretas, filtrando las filas según las condiciones que especifiques.
