## 4. Transacciones: BEGIN, COMMIT, ROLLBACK

### ¿Por qué usar transacciones? La transferencia bancaria segura

Imagina transferir 100€ de tu cuenta de ahorros a tu cuenta corriente. La operación consta de dos pasos:
1.  Restar 100€ de ahorros.
2.  Sumar 100€ a la corriente.

¿Qué pasa si el sistema falla después del paso 1 pero antes del paso 2? ¡Habrías perdido 100€! Una **transacción** agrupa estas dos operaciones en una unidad de trabajo atómica (indivisible): o se completan ambas con éxito, o no se hace ninguna.

Las transacciones garantizan la integridad de los datos siguiendo el principio de "todo o nada".

### Sintaxis y Comandos Clave (Oracle SQL)

En Oracle, una transacción comienza implícitamente con la primera instrucción DML (`INSERT`, `UPDATE`, `DELETE`). No necesitas un comando `BEGIN TRANSACTION` como en otros sistemas.

*   **`COMMIT`**: Guarda permanentemente todos los cambios realizados en la transacción actual. Hace que los cambios sean visibles para otros usuarios.
*   **`ROLLBACK`**: Deshace todos los cambios realizados en la transacción actual, devolviendo la base de datos al estado en que se encontraba antes de que comenzara la transacción.
*   **`SAVEPOINT`**: Crea un "punto de guardado" dentro de una transacción. Puedes hacer un `ROLLBACK` a un `SAVEPOINT` específico sin deshacer toda la transacción.

### Ejemplos Ilustrativos

**Ejemplo de COMMIT:**
Vamos a registrar un nuevo empleado y su puesto en dos tablas diferentes. Queremos que ambos registros se guarden o ninguno.
```oracle
-- La transacción comienza automáticamente aquí
INSERT INTO empleados (empleado_id, nombre, apellido, id_puesto)
VALUES (207, 'Ana', 'Perez', 10);

INSERT INTO historial_puestos (empleado_id, id_puesto, fecha_inicio)
VALUES (207, 10, SYSDATE);

-- Si todo fue bien, confirmamos los cambios
COMMIT;
```

**Ejemplo de ROLLBACK:**
Supongamos que intentamos actualizar el salario de un empleado, pero nos damos cuenta de que cometimos un error.
```oracle
UPDATE empleados
SET salario = 50000
WHERE empleado_id = 10;

-- Nos damos cuenta del error (¡era demasiado!). Deshacemos el cambio.
ROLLBACK;
```

-- El salario del empleado 10 vuelve a su valor original.

### Consejos de los Expertos

*   **Mantén las transacciones cortas:** Transacciones largas pueden bloquear recursos y disminuir la concurrencia (la capacidad de otros usuarios para trabajar).
*   **No esperes la entrada del usuario dentro de una transacción:** Nunca dejes una transacción abierta mientras la aplicación espera una respuesta del usuario. Esto puede bloquear filas durante minutos.
*   **`COMMIT` o `ROLLBACK` explícitamente:** Siempre termina tus transacciones. Dejar transacciones abiertas es una de las principales causas de problemas de bloqueo en bases de datos multiusuario.

### Resumen

Las transacciones son el mecanismo de seguridad fundamental de una base de datos. Envuelven un conjunto de operaciones en una unidad de "todo o nada", garantizando que tus datos permanezcan consistentes y fiables, incluso si ocurren errores. Usa `COMMIT` para guardar tus cambios y `ROLLBACK` para deshacerlos.
