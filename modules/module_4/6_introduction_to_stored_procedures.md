## Lección 6: Introducción a los Procedimientos Almacenados

### ¿Por qué programar dentro de la base de datos?

Imagina que tienes una serie de pasos que siempre realizas juntos. Por ejemplo, para registrar un nuevo pedido, necesitas:
1.  Insertar el pedido en la tabla `PEDIDOS`.
2.  Actualizar el stock en la tabla `PRODUCTOS`.
3.  Registrar la transacción en una tabla de `LOGS`.

Hacer esto desde una aplicación externa requiere enviar tres comandos SQL separados a la base de datos. Esto aumenta el tráfico de red y abre la posibilidad de que solo se completen algunos pasos si hay un error.

Un **Procedimiento Almacenado** (*Stored Procedure*) es un conjunto de comandos SQL y lógica de programación (bucles, condicionales, etc.) que se guarda y se compila dentro de la propia base de datos. En lugar de enviar múltiples comandos, la aplicación solo tiene que hacer una llamada: `EXECUTA registrar_nuevo_pedido(...)`.

---

### ¿Cuáles son las ventajas?
1.  **Rendimiento:** El procedimiento está precompilado en la base de datos, y se reduce el tráfico de red, lo que a menudo resulta en una ejecución más rápida.
2.  **Reutilización y Consistencia:** La lógica de negocio se centraliza en un solo lugar. Cualquier aplicación que necesite realizar esa tarea simplemente llama al procedimiento, asegurando que las reglas se apliquen siempre de la misma manera.
3.  **Seguridad:** Puedes otorgar a los usuarios permiso para ejecutar un procedimiento almacenado sin darles acceso directo a las tablas subyacentes. Esto limita lo que pueden hacer y protege la integridad de los datos.

### Sintaxis y Comandos Fundamentales (PL/SQL de Oracle)

Oracle utiliza un lenguaje llamado **PL/SQL** (Procedural Language/SQL) para escribir procedimientos, funciones y triggers.

**Sintaxis Básica para Crear un Procedimiento:**
```sql
CREATE OR REPLACE PROCEDURE nombre_procedimiento (
parametro1 IN TIPO_DATO,
parametro2 OUT TIPO_DATO
)
IS
-- Declaración de variables locales
variable_local TIPO_DATO;
BEGIN
-- Lógica del procedimiento (comandos SQL, IF, LOOP, etc.)
NULL; -- Cuerpo del procedimiento
EXCEPTION
-- Manejo de errores
WHEN OTHERS THEN
NULL;
END;
/
```

-   `IN`: Parámetro de entrada.
-   `OUT`: Parámetro de salida (para devolver un valor).
-   `IN OUT`: El parámetro puede ser leído y modificado.

**Ejemplo Ilustrativo:** Crear un procedimiento para reasignar un empleado a un nuevo departamento.
```sql
CREATE OR REPLACE PROCEDURE reasignar_empleado (
    p_id_empleado IN EMPLEADOS.ID_EMPLEADO%TYPE,
    p_id_nuevo_depto IN EMPLEADOS.ID_DEPARTAMENTO%TYPE
)
IS
BEGIN
    UPDATE EMPLEADOS
    SET ID_DEPARTAMENTO = p_id_nuevo_depto
    WHERE ID_EMPLEADO = p_id_empleado;

    COMMIT; -- Confirma la transacción
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK; -- Deshace los cambios si hay un error
        RAISE; -- Propaga el error
END;
/
```

-   `%TYPE` es una buena práctica en PL/SQL que hace que la variable o parámetro herede el tipo de dato de una columna de tabla.

#### Ejecutar un Procedimiento
Desde una herramienta SQL, se usa el comando `EXECUTE` o un bloque anónimo.
```sql
-- Usando EXECUTE
EXECUTE reasignar_empleado(p_id_empleado => 1, p_id_nuevo_depto => 102);

-- Usando un bloque anónimo PL/SQL
BEGIN
    reasignar_empleado(1, 102);
END;
/
```

### Consejos de los Expertos
- **Manejo de Transacciones:** Un procedimiento es el lugar ideal para gestionar transacciones (`COMMIT` y `ROLLBACK`). Si una de las operaciones dentro del procedimiento falla, puedes deshacer todos los cambios para mantener la base de datos en un estado consistente.
- **Procedimientos vs. Funciones:** En Oracle, un *procedimiento* realiza una acción, mientras que una *función* se utiliza para calcular y **devolver un valor único**. Las funciones se pueden usar directamente en una sentencia `SELECT`, mientras que los procedimientos no.
- **No abuses de la lógica de negocio:** Si bien es poderoso, poner *toda* la lógica de tu aplicación en la base de datos puede hacerla menos portable y más difícil de mantener para los desarrolladores de aplicaciones. Encuentra un equilibrio saludable entre la lógica de la aplicación y la lógica de la base de datos.

---

### Resumen
Los procedimientos almacenados te permiten agrupar comandos SQL y lógica de programación en unidades reutilizables y seguras que viven en la base de datos. Son excelentes para encapsular operaciones de negocio complejas, mejorar el rendimiento al reducir la comunicación de red y garantizar la consistencia y la integridad de los datos. Son un pilar de la programación avanzada de bases de datos.