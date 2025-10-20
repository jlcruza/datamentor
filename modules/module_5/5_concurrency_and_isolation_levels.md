## 5. Concurrencia y Niveles de Aislamiento

### ¿Por qué es esto importante?

Imagina que tú y un colega están editando el mismo documento en línea. Si ambos escriben en la misma frase al mismo tiempo, ¿qué versión se guarda? ¿Se mezclan las palabras? La **concurrencia** se ocupa de cómo la base de datos maneja a múltiples usuarios que leen y escriben datos simultáneamente, y los **niveles de aislamiento** son las reglas que evitan que se pisen unos a otros.

Un nivel de aislamiento más alto protege más contra interferencias, pero puede reducir el rendimiento al hacer que los usuarios esperen más.

---

### Fenómenos de Concurrencia a Evitar

*   **Lectura Sucia (Dirty Read):** Una transacción lee datos que han sido modificados por otra transacción, pero que aún no han sido confirmados (`COMMIT`). Si la primera transacción hace `ROLLBACK`, la segunda habrá leído datos "sucios" que nunca existieron oficialmente.
*   **Lectura No Repetible (Non-Repeatable Read):** Una transacción lee la misma fila dos veces y obtiene resultados diferentes porque otra transacción modificó esa fila entre las dos lecturas.
*   **Lectura Fantasma (Phantom Read):** Una transacción ejecuta una consulta dos veces y la segunda vez obtiene filas adicionales que no estaban allí la primera vez, porque otra transacción insertó nuevas filas que cumplen con los criterios de la consulta.

### Niveles de Aislamiento en Oracle

Oracle proporciona principalmente dos niveles de aislamiento estándar del SQL:

1.  **`READ COMMITTED` (Leído Confirmado):**
    *   **Es el nivel por defecto en Oracle.**
    *   **Previene Lecturas Sucias.** Nunca verás los cambios no confirmados de otros.
    *   Una consulta solo ve los datos que estaban confirmados al inicio de la *consulta*. Esto significa que las lecturas no repetibles y fantasmas *son posibles* dentro de la misma transacción.

2.  **`SERIALIZABLE` (Serializable):**
    *   **Es el nivel más estricto.**
    *   **Previene todos los fenómenos:** Lecturas Sucias, No Repetibles y Fantasmas.
    *   Una transacción solo ve los datos que estaban confirmados al inicio de la *transacción*. Es como si cada transacción se ejecutara una después de la otra, en serie.
    *   Si intentas modificar datos que otra transacción ha cambiado desde que comenzaste, recibirás un error: `ORA-08177: can't serialize access for this transaction`.

### Sintaxis y Ejemplo

Puedes establecer el nivel de aislamiento al comienzo de una transacción.
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Tus consultas y DMLs aquí...

COMMIT;
```

**Ejemplo de `READ COMMITTED` (defecto):**
```sql
-- Sesión 1 (Tú)
SELECT COUNT(*) FROM empleados WHERE salario > 5000; -- Resultado: 50

-- Sesión 2 (Colega)
INSERT INTO empleados (empleado_id, nombre, salario) VALUES (300, 'Carlos', 6000);
COMMIT;

-- Sesión 1 (Tú, en la misma transacción)
SELECT COUNT(*) FROM empleados WHERE salario > 5000; -- Resultado: 51 (¡Lectura Fantasma!)
```

Si hubieras usado `ISOLATION LEVEL SERIALIZABLE`, la segunda consulta habría devuelto 50, dándote una vista consistente de los datos durante toda tu transacción.

### Consejos de los Expertos

*   **Usa el nivel por defecto (`READ COMMITTED`) a menos que tengas una buena razón:** Ofrece un excelente equilibrio entre consistencia y concurrencia. La mayoría de las aplicaciones funcionan perfectamente con él.
*   **Usa `SERIALIZABLE` para informes complejos:** Si necesitas ejecutar una serie de consultas para un informe y es crucial que los datos no cambien en absoluto durante el proceso, `SERIALIZABLE` es la opción correcta. Planifica para manejar el error `ORA-08177` reintentando la transacción.
*   **`FOR UPDATE`:** Si solo necesitas bloquear unas pocas filas para modificarlas y evitar conflictos, considera usar `SELECT ... FOR UPDATE`. Esto bloquea las filas seleccionadas hasta que hagas `COMMIT` o `ROLLBACK`.

---

### Resumen

Los niveles de aislamiento son las reglas de tráfico de la base de datos. Definen qué tan "aislada" está tu transacción de las demás. El nivel por defecto de Oracle, `READ COMMITTED`, es práctico y eficiente, mientras que `SERIALIZABLE` ofrece la máxima consistencia a costa de una menor concurrencia.
