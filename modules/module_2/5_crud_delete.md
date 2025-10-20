## 5. Eliminando Registros (CRUD: Eliminar)

### ¿Por Qué Eliminar Datos?

El ciclo de vida de los datos no siempre es para siempre. La información puede volverse irrelevante, incorrecta o simplemente ya no ser necesaria. Eliminar registros mantiene tu base de datos limpia y relevante. Es como hacer limpieza en tu disco duro para liberar espacio y deshacerte de archivos viejos.

---

### Términos Clave

Antes de aprender a eliminar datos, entendamos estos conceptos importantes:

- **DELETE:** Comando SQL para eliminar una o más filas de una tabla de forma permanente.
- **WHERE:** Cláusula que especifica qué filas deben eliminarse. Sin WHERE, se eliminan TODAS las filas.
- **Transacción:** Una secuencia de operaciones de base de datos que se ejecutan como una unidad. Si algo sale mal, puedes deshacer todas las operaciones de la transacción.
- **COMMIT:** Comando que confirma y hace permanentes todos los cambios realizados en la transacción actual.
- **ROLLBACK:** Comando que deshace todos los cambios realizados en la transacción actual, regresando la base de datos al estado anterior.

---

### Eliminando Filas con `DELETE FROM`

El comando `DELETE` se usa para eliminar una o más filas de una tabla. Su sintaxis es simple, pero debe usarse con extremo cuidado.
```sql
DELETE FROM nombre_de_la_tabla
WHERE condicion;
```

Al igual que con `UPDATE`, la cláusula `WHERE` es tu red de seguridad. Determina qué filas se eliminarán.

**¡ADVERTENCIA!** Si omites la cláusula `WHERE`, el comando `DELETE FROM nombre_de_la_tabla;` eliminará **ABSOLUTAMENTE TODOS LOS REGISTROS** de la tabla. ¡No hay un "deshacer" fácil!

### Ejemplo Ilustrativo

Supongamos que el estudiante con ID `9` se ha dado de baja.
```sql
DELETE FROM ESTUDIANTES
WHERE id = 9;
```

Esta instrucción buscará en la tabla `ESTUDIANTES` la fila (o filas) donde `id` sea `9` y la eliminará permanentemente.

### Consejos de los Expertos

- **Verifica Antes de Eliminar:** Esta es una de las prácticas más importantes en SQL. Antes de ejecutar un `DELETE`, escribe un `SELECT` con la misma cláusula `WHERE` para previsualizar exactamente los registros que estás a punto de borrar.
```sql
-- Paso 1: Verificar qué se va a borrar
SELECT *
FROM ESTUDIANTES
WHERE id = 9;

-- Paso 2: Si el resultado es correcto, ejecutar el DELETE
DELETE FROM ESTUDIANTES
WHERE id = 9;
```

- **Transacciones:** Para operaciones críticas, puedes envolver tu comando `DELETE` en una transacción. Esto te permite deshacer (ROLLBACK) la eliminación si cometes un error, siempre y cuando no hayas confirmado la transacción (COMMIT). Las transacciones serán explicadas en detalle en módulos posteriores.

---

### Resumen

`DELETE` elimina registros de una tabla. Su poder destructivo exige un uso cuidadoso. La regla de oro es: **siempre usa `WHERE`** y verifica dos veces lo que estás a punto de eliminar con un `SELECT` previo.
