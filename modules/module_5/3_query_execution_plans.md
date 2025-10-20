
## 3. Leer Planes de Ejecución de Consultas

### ¿Por qué necesito un plan? El GPS de tu consulta

Cuando le pides a un GPS que te lleve a un lugar, no solo te da la ruta, sino que te muestra los pasos: "gira a la derecha en 100m", "toma la autopista", etc. Un **plan de ejecución** es exactamente eso para tu consulta SQL. Es el mapa detallado de cómo la base de datos planea obtener los datos que pediste.

Revisar este plan es la herramienta más poderosa para diagnosticar por qué una consulta es lenta. Te permite ver si la base de datos está usando un índice o si está haciendo un recorrido completo e ineficiente de la tabla (`FULL TABLE SCAN`).

---

### Sintaxis y Comandos Clave (Oracle SQL)

Para ver el plan de ejecución en Oracle, se usan dos comandos:

1.  **`EXPLAIN PLAN FOR ...`**: Le pide a Oracle que genere el plan para una consulta sin ejecutarla.
2.  **`DBMS_XPLAN.DISPLAY`**: Muestra el plan generado en un formato legible.
```sql
-- Paso 1: Generar el plan
EXPLAIN PLAN FOR
SELECT * FROM empleados WHERE empleado_id = 10;

-- Paso 2: Mostrar el plan
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

### Ejemplos Ilustrativos

Veamos dos escenarios para la tabla `empleados`:

**Escenario A: Búsqueda por clave primaria (con índice)**
`empleado_id` es la clave primaria, por lo que tiene un índice único automáticamente.
```sql
EXPLAIN PLAN FOR SELECT * FROM empleados WHERE empleado_id = 10;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

```
El plan de ejecución mostrará algo como:

|ID   |OPERATION                     |OBJECT_NAME  |
|-----|------------------------------|-------------|
|   1 |  TABLE ACCESS BY INDEX ROWID | EMPLEADOS   |
|*  2 |   INDEX UNIQUE SCAN          | PK_EMPLEADOS|

Esto es muy eficiente. Significa que usó el índice (`INDEX UNIQUE SCAN`) para encontrar la fila directamente.

**Escenario B: Búsqueda en columna sin índice con una función**
```sql
EXPLAIN PLAN FOR SELECT * FROM empleados WHERE UPPER(apellido) = 'SMITH';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

El plan probablemente mostrará:

|ID   |OPERATION                       |
|-----|--------------------------------|
|*  1 |  TABLE ACCESS FULL | EMPLEADOS |
Esto es un **`TABLE ACCESS FULL`** (o Full Table Scan), la señal de alerta más común. Significa que Oracle tuvo que leer cada fila de la tabla porque no pudo usar un índice (debido a la función `UPPER()`).

### Consejos de los Expertos

*   **Busca `TABLE ACCESS FULL`:** En tablas grandes, esta operación suele ser la causa de la lentitud. No siempre es mala (a veces necesitas leer toda la tabla), pero si esperabas que se usara un índice, aquí está tu problema.
*   **Analiza los costos:** El plan de ejecución muestra un "costo" estimado. Usa esto para comparar la eficiencia de diferentes versiones de una consulta.
*   **Verifica las uniones (Joins):** El plan te muestra cómo se unen las tablas (`NESTED LOOPS`, `HASH JOIN`, `MERGE JOIN`). Entender esto te ayuda a optimizar consultas complejas.

---

### Resumen

El plan de ejecución es tu ventana al "cerebro" del optimizador de la base de datos. Aprender a leerlo es fundamental para el ajuste de rendimiento, ya que te dice el "cómo" y el "porqué" de la estrategia de acceso a los datos de la base de datos.
