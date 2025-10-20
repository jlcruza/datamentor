## 4. Transacciones: BEGIN, COMMIT, ROLLBACK

### ¿Por qué usar transacciones? La transferencia bancaria segura

Imagina transferir 100€ de tu cuenta de ahorros a tu cuenta corriente. La operación consta de dos pasos:
1.  Restar 100€ de ahorros.
2.  Sumar 100€ a la corriente.

¿Qué pasa si el sistema falla después del paso 1 pero antes del paso 2? ¡Habrías perdido 100€! Una **transacción** agrupa estas dos operaciones en una unidad de trabajo atómica (indivisible): o se completan ambas con éxito, o no se hace ninguna.

Las transacciones garantizan la integridad de los datos siguiendo el principio de "todo o nada".

---

### Términos Clave

Antes de aprender sobre transacciones, entendamos estos conceptos:

- **Transacción:** Una secuencia de operaciones de base de datos que se ejecutan como una unidad indivisible. O todas se completan con éxito o ninguna se aplica.
- **Atómica (Atomic):** Propiedad que garantiza que una transacción se trata como una unidad indivisible: todo o nada.
- **ACID:** Acrónimo que define las cuatro propiedades que garantizan transacciones confiables:
  - **A**tomicity (Atomicidad): Todo o nada
  - **C**onsistency (Consistencia): Los datos siempre quedan en un estado válido
  - **I**solation (Aislamiento): Las transacciones no interfieren entre sí
  - **D**urability (Durabilidad): Los cambios confirmados son permanentes
- **COMMIT:** Comando que confirma y hace permanentes todos los cambios de la transacción actual.
- **ROLLBACK:** Comando que deshace todos los cambios de la transacción actual.
- **SAVEPOINT (Punto de Guardado):** Marca dentro de una transacción a la que puedes regresar con ROLLBACK sin deshacer toda la transacción.
- **DML (Data Manipulation Language):** Comandos que modifican datos (INSERT, UPDATE, DELETE).
- **SYSDATE:** Función de Oracle que devuelve la fecha y hora actual del sistema.
- **Concurrencia:** Capacidad de múltiples usuarios de acceder y modificar datos simultáneamente.
- **Bloqueo (Lock):** Mecanismo que impide que múltiples transacciones modifiquen los mismos datos simultáneamente.

---

### Sintaxis y Comandos Clave (Oracle SQL)

En Oracle, una transacción comienza implícitamente con la primera instrucción DML (`INSERT`, `UPDATE`, `DELETE`). No necesitas un comando `BEGIN TRANSACTION` como en otros sistemas.

*   **`COMMIT`**: Guarda permanentemente todos los cambios realizados en la transacción actual. Hace que los cambios sean visibles para otros usuarios.
*   **`ROLLBACK`**: Deshace todos los cambios realizados en la transacción actual, devolviendo la base de datos al estado en que se encontraba antes de que comenzara la transacción.
*   **`SAVEPOINT`**: Crea un "punto de guardado" dentro de una transacción. Puedes hacer un `ROLLBACK` a un `SAVEPOINT` específico sin deshacer toda la transacción.

### Ejemplos Ilustrativos

**Ejemplo de COMMIT:**
Vamos a matricular un estudiante en un curso y registrar su nota inicial. Queremos que ambos registros se guarden o ninguno.
```sql
-- La transacción comienza automáticamente aquí
INSERT INTO ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula)
VALUES (9, 'María García', 'maria@email.com', 1, 20, SYSDATE);

INSERT INTO MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula)
VALUES (14, 9, 101, NULL, 'Primavera 2026', SYSDATE);

-- Si todo fue bien, confirmamos los cambios
COMMIT;
```

**Ejemplo de ROLLBACK:**
Supongamos que intentamos actualizar la nota de un estudiante, pero nos damos cuenta de que cometimos un error.
```sql
UPDATE MATRICULAS
SET nota = 100
WHERE id = 1;

-- Nos damos cuenta del error (¡era demasiado alta!). Deshacemos el cambio.
ROLLBACK;
```

-- La nota de la matrícula 1 vuelve a su valor original.

### Consejos de los Expertos

*   **Mantén las transacciones cortas:** Transacciones largas pueden bloquear recursos y disminuir la concurrencia (la capacidad de otros usuarios para trabajar).
*   **No esperes la entrada del usuario dentro de una transacción:** Nunca dejes una transacción abierta mientras la aplicación espera una respuesta del usuario. Esto puede bloquear filas durante minutos.
*   **`COMMIT` o `ROLLBACK` explícitamente:** Siempre termina tus transacciones. Dejar transacciones abiertas es una de las principales causas de problemas de bloqueo en bases de datos multiusuario.

---

### Resumen

Las transacciones son el mecanismo de seguridad fundamental de una base de datos. Envuelven un conjunto de operaciones en una unidad de "todo o nada", garantizando que tus datos permanezcan consistentes y fiables, incluso si ocurren errores. Usa `COMMIT` para guardar tus cambios y `ROLLBACK` para deshacerlos.
