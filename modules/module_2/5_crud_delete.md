## 5. Eliminando Registros (CRUD: Eliminar)

### ¿Por Qué Eliminar Datos?

El ciclo de vida de los datos no siempre es para siempre. La información puede volverse irrelevante, incorrecta o simplemente ya no ser necesaria. Eliminar registros mantiene tu base de datos limpia y relevante. Es como hacer limpieza en tu disco duro para liberar espacio y deshacerte de archivos viejos.

### Eliminando Filas con `DELETE FROM`

El comando `DELETE` se usa para eliminar una o más filas de una tabla. Su sintaxis es simple, pero debe usarse con extremo cuidado.
```oracle
DELETE FROM nombre_de_la_tabla
WHERE condicion;
```

Al igual que con `UPDATE`, la cláusula `WHERE` es tu red de seguridad. Determina qué filas se eliminarán.

**¡ADVERTENCIA!** Si omites la cláusula `WHERE`, el comando `DELETE FROM nombre_de_la_tabla;` eliminará **ABSOLUTAMENTE TODOS LOS REGISTROS** de la tabla. ¡No hay un "deshacer" fácil!

### Ejemplo Ilustrativo

Supongamos que el estudiante con ID `1` se ha dado de baja.
```oracle
DELETE FROM Estudiantes
WHERE ID_Estudiante = 1;
```

Esta instrucción buscará en la tabla `Estudiantes` la fila (o filas) donde `ID_Estudiante` sea `1` y la eliminará permanentemente.

### Consejos de los Expertos

- **Verifica Antes de Eliminar:** Esta es una de las prácticas más importantes en SQL. Antes de ejecutar un `DELETE`, escribe un `SELECT` con la misma cláusula `WHERE` para previsualizar exactamente los registros que estás a punto de borrar.
```oracle
-- Paso 1: Verificar qué se va a borrar
SELECT *
FROM Estudiantes
WHERE ID_Estudiante = 1;

-- Paso 2: Si el resultado es correcto, ejecutar el DELETE
DELETE FROM Estudiantes
WHERE ID_Estudiante = 1;
```

- **Transacciones:** Para operaciones críticas, puedes envolver tu comando `DELETE` en una transacción. Esto te permite "deshacer" (`ROLLBACK`) la eliminación si cometes un error, siempre y cuando no hayas confirmado la transacción (`COMMIT`).

### Resumen

`DELETE` elimina registros de una tabla. Su poder destructivo exige un uso cuidadoso. La regla de oro es: **siempre usa `WHERE`** y verifica dos veces lo que estás a punto de eliminar con un `SELECT` previo.
