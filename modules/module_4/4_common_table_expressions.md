## Lección 4: Expresiones de Tabla Comunes (CTEs)

### ¿Por qué usar CTEs?

Imagina que estás construyendo algo complejo con legos. En lugar de buscar cada pequeña pieza una y otra vez, podrías construir primero módulos más pequeños y luego ensamblarlos. Un CTE (Common Table Expression) funciona de manera similar en SQL.

Te permite crear una especie de **tabla temporal con nombre** que existe solo durante la ejecución de tu consulta. Es una forma de dividir una consulta larga y compleja en pasos lógicos y más legibles. En lugar de anidar subconsultas que hacen que el código sea un laberinto, defines cada paso de forma clara al principio.

### Sintaxis y Comandos Fundamentales

Un CTE se define usando la cláusula `WITH` al inicio de una consulta. Puedes definir uno o varios CTEs, y luego referenciarlos en tu consulta principal como si fueran tablas normales.

**Sintaxis de Oracle:**
```oracle
WITH nombre_cte AS (
-- Tu consulta SELECT va aquí
SELECT columna1, columna2 FROM alguna_tabla
)
SELECT
*
FROM
nombre_cte
WHERE
condicion;
```

**Ejemplo Ilustrativo:**

Supongamos que queremos encontrar los departamentos donde el salario promedio es mayor a 50,000 y luego mostrar los empleados de esos departamentos.

**Sin CTE (usando subconsultas):**
```oracle
SELECT
    *
FROM
    EMPLEADOS
WHERE
    ID_DEPARTAMENTO IN (SELECT ID_DEPARTAMENTO
                        FROM EMPLEADOS
                        GROUP BY ID_DEPARTAMENTO
                        HAVING AVG(SALARIO) > 50000);
```

Esta consulta es correcta, pero la lógica está anidada. Ahora, veamos cómo se ve con un CTE.

**Con CTE (más legible):**
```oracle
WITH DepartamentosConSalarioAlto AS (
    -- Paso 1: Encontrar los IDs de los departamentos con salario promedio > 50k
    SELECT
        ID_DEPARTAMENTO
    FROM
        EMPLEADOS
    GROUP BY
        ID_DEPARTAMENTO
    HAVING
        AVG(SALARIO) > 50000
)
-- Paso 2: Usar el resultado del CTE para encontrar a los empleados
SELECT
    e.NOMBRE,
    e.SALARIO
FROM
    EMPLEADOS e
JOIN
    DepartamentosConSalarioAlto d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO;
```

Como puedes ver, el CTE (`DepartamentosConSalarioAlto`) define claramente el primer paso lógico. La consulta principal se vuelve mucho más simple: "Selecciona empleados que pertenecen a uno de estos departamentos de salario alto".

### Consejos de los Expertos
- **Nombra tus CTEs con claridad:** El objetivo de un CTE es la legibilidad. Dale un nombre que describa exactamente qué datos contiene (ej., `ClientesActivos`, `VentasPorRegion`, etc.).
- **Encadena múltiples CTEs:** Puedes definir varios CTEs secuencialmente, separados por comas. Un CTE posterior puede incluso hacer referencia a un CTE anterior, lo que te permite construir pipelines de datos complejos de forma muy ordenada.
    ```oracle
    WITH
      Ventas2023 AS (...),
      Ventas2024 AS (...)
    SELECT ... FROM Ventas2023 JOIN Ventas2024 ON ...
    ```
- **Recursión con CTEs:** Los CTEs también pueden ser recursivos (referenciarse a sí mismos), lo cual es extremadamente útil para consultar datos jerárquicos, como organigramas o árboles de categorías. (Este es un tema avanzado, ¡pero es bueno saber que existe!).

### Resumen
Las Expresiones de Tabla Comunes (CTEs) son una herramienta fantástica para mejorar la legibilidad y la organización de tus consultas SQL. Al usar la cláusula `WITH`, puedes descomponer la lógica compleja en bloques nombrados y manejables, haciendo tu código más fácil de escribir, depurar y mantener. Siempre que te enfrentes a una consulta con múltiples niveles de subconsultas, considera si un CTE podría simplificarla.
