## Lección 2: Entendiendo los Joins (INNER, LEFT, RIGHT, FULL)

### ¿Por qué tantos tipos de `JOIN`?

Imagina que estás organizando un evento entre dos clubes. A veces, solo querrás a los miembros que están en *ambos* clubes (`INNER JOIN`). Otras veces, querrás a *todos* los del primer club y, si están en el segundo, también su información (`LEFT JOIN`). O quizás quieras una lista completa de *todos* los miembros de *ambos* clubes, sin importar si pertenecen a uno o a los dos (`FULL OUTER JOIN`).

Los `JOIN` son la herramienta principal y más explícita para combinar tablas. Los diferentes tipos de `JOIN` te dan control total sobre *cómo* se combinan esas filas y qué hacer cuando no hay una coincidencia.

---

### Sintaxis y Comandos Fundamentales

La sintaxis moderna de `JOIN` separa la lógica de combinación (`ON`) de la lógica de filtrado (`WHERE`), haciendo las consultas mucho más claras.

#### 1. `INNER JOIN` (Unión Interna)
Devuelve solo las filas que tienen una coincidencia en ambas tablas. Es el tipo de `JOIN` más común.

**Analogía:** La intersección de dos conjuntos. Solo lo que tienen en común.

**Sintaxis de Oracle:**
```oracle
SELECT
    e.NOMBRE,
    d.NOMBRE_DEPTO
FROM
    EMPLEADOS e
INNER JOIN
    DEPARTAMENTOS d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO;
```

Este código produce el mismo resultado que el ejemplo de la lección anterior, pero es más legible y es la forma estándar de escribir uniones.

#### 2. `LEFT JOIN` (Unión Izquierda)
Devuelve **todas** las filas de la tabla de la izquierda (la primera tabla mencionada) y las filas coincidentes de la tabla de la derecha. Si no hay coincidencia, las columnas de la tabla derecha tendrán valores `NULL`.

**¿Para qué sirve?** Para encontrar registros en una tabla que *no tienen* una correspondencia en otra. Por ejemplo, encontrar empleados que no han sido asignados a un departamento.

**Sintaxis de Oracle:**
```oracle
SELECT
    e.NOMBRE,
    d.NOMBRE_DEPTO
FROM
    EMPLEADOS e
LEFT JOIN
    DEPARTAMENTOS d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO;
```

Si tuviéramos un empleado `Juan` con `ID_DEPARTAMENTO` igual a `NULL`, el resultado sería:

| NOMBRE | NOMBRE_DEPTO |
|--------|--------------|
| Ana    | Ventas       |
| Luis   | Marketing    |
| Pedro  | Ventas       |
| Juan   | (null)       |

#### 3. `RIGHT JOIN` (Unión Derecha)
Es lo opuesto a `LEFT JOIN`. Devuelve **todas** las filas de la tabla de la derecha y las coincidentes de la izquierda. Si no hay coincidencia, las columnas de la tabla izquierda serán `NULL`.

**¿Para qué sirve?** Para encontrar registros en la tabla derecha que no tienen correspondencia en la izquierda. Por ejemplo, departamentos que no tienen ningún empleado asignado.

**Sintaxis de Oracle:**
```oracle
SELECT
    e.NOMBRE,
    d.NOMBRE_DEPTO
FROM
    EMPLEADOS e
RIGHT JOIN
    DEPARTAMENTOS d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO;
```

Si tuviéramos un departamento de "Innovación" sin empleados, el resultado sería:

| NOMBRE | NOMBRE_DEPTO |
|--------|--------------|
| Ana    | Ventas       |
| Luis   | Marketing    |
| Pedro  | Ventas       |
| (null) | Innovación   |

#### 4. `FULL OUTER JOIN` (Unión Externa Completa)
Devuelve **todas** las filas cuando hay una coincidencia en una de las tablas. Combina la funcionalidad de `LEFT JOIN` y `RIGHT JOIN`. Si no hay coincidencia para una fila, las columnas de la otra tabla serán `NULL`.

**¿Para qué sirve?** Para ver todos los datos de ambas tablas y dónde se superponen y dónde no.

**Sintaxis de Oracle:**
```oracle
SELECT
    e.NOMBRE,
    d.NOMBRE_DEPTO
FROM
    EMPLEADOS e
FULL OUTER JOIN
    DEPARTAMENTOS d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO;

```
El resultado incluiría tanto a `Juan` (empleado sin departamento) como a "Innovación" (departamento sin empleados).

### Consejos de los Expertos
- **Prefiere `JOIN` explícito:** Usa siempre la sintaxis `INNER JOIN`, `LEFT JOIN`, etc., en lugar de la sintaxis antigua con comas en el `FROM` y condiciones en el `WHERE`. Es el estándar ANSI, más seguro y mucho más legible.
- **`LEFT` vs. `RIGHT`:** La mayoría de los desarrolladores usan `LEFT JOIN` por convención. Un `RIGHT JOIN` siempre puede reescribirse como un `LEFT JOIN` simplemente invirtiendo el orden de las tablas. Esto hace que el código sea más consistente.
- **Piensa en diagramas de Venn:** Si te confundes, dibuja dos círculos que se solapan. `INNER` es la parte solapada. `LEFT` es todo el círculo izquierdo. `FULL` es ambos círculos completos.

---

### Resumen
Los `JOIN` son la forma correcta y más poderosa de combinar tablas. Cada tipo te da un control preciso sobre el resultado: `INNER` para coincidencias, `LEFT`/`RIGHT` para incluir todos los datos de una tabla, y `FULL` para incluir todos los datos de ambas. Dominar los `JOIN` es un paso crucial para convertirte en un experto en SQL.
