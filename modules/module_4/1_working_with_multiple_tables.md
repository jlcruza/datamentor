## Lección 1: Trabajando con Múltiples Tablas

### ¿Por qué necesitamos consultar múltiples tablas?

Imagina que tu información está organizada en diferentes archivadores para mantener todo ordenado y sin duplicados. Un archivador tiene la información de los "Empleados" y otro, la de los "Departamentos". Si quieres saber en qué departamento trabaja cada empleado, no te basta con mirar un solo archivador; necesitas consultar ambos.

En las bases de datos relacionales, los datos se dividen en tablas para evitar la redundancia y mejorar la integridad (¿recuerdas la normalización del Módulo 3?). Para obtener una visión completa, necesitamos una forma de conectar y combinar la información de estas tablas. Aquí es donde entra en juego la consulta de múltiples tablas.

---

### ¿Cómo se conectan las tablas?

Las tablas se relacionan mediante **claves primarias y foráneas**. Una clave foránea en una tabla apunta a la clave primaria de otra, creando un vínculo. Al escribir una consulta, usamos este vínculo para combinar filas de ambas tablas.

**Ejemplo Ilustrativo:**

Supongamos que tenemos dos tablas: `EMPLEADOS` y `DEPARTAMENTOS`.

**Tabla `EMPLEADOS`:**

| ID_EMPLEADO | NOMBRE | ID_DEPARTAMENTO |
|-------------|--------|-----------------|
| 1           | Ana    | 101             |
| 2           | Luis   | 102             |
| 3           | Pedro  | 101             |

**Tabla `DEPARTAMENTOS`:**

| ID_DEPARTAMENTO | NOMBRE_DEPTO |
|-----------------|--------------|
| 101             | Ventas       |
| 102             | Marketing    |

Para obtener el nombre de cada empleado junto con el nombre de su departamento, necesitamos combinar ambas tablas usando `ID_DEPARTAMENTO`.
```sql
SELECT
    e.nombre,
    d.nombre AS departamento
FROM
    ESTUDIANTES e,
    DEPARTAMENTOS d
WHERE
    e.id_especialidad = d.id;
```

**Resultado:**

| NOMBRE | NOMBRE_DEPTO |
|--------|--------------|
| Ana    | Ventas       |
| Luis   | Marketing    |
| Pedro  | Ventas       |

### Consejos de los Expertos
- **Usa Alias de Tabla:** Al trabajar con múltiples tablas, los nombres de las columnas pueden ser ambiguos. Usa alias cortos y descriptivos para las tablas (como `e` para `ESTUDIANTES` y `d` para `DEPARTAMENTOS`) para hacer tu código más legible y corto.
- **Califica los Nombres de Columna:** Siempre especifica de qué tabla proviene una columna (`tabla.columna` o `alias.columna`), incluso si el nombre no es ambiguo. Esto evita errores y facilita la comprensión de la consulta.

---

### Resumen
Consultar múltiples tablas es fundamental en SQL. Nos permite combinar datos relacionados que están almacenados de forma separada, dándonos una visión completa y coherente. La clave está en entender las relaciones (claves foráneas) y usar la cláusula `WHERE` (o `JOIN`, que veremos a continuación) para especificar cómo se conectan.
