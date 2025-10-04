## Lección 5: Creando y Usando Vistas (Views)

### ¿Por qué crear una "tabla virtual"?

Imagina que tienes una consulta muy compleja que usas todos los días para generar un reporte: une cinco tablas, tiene varios cálculos y filtros. En lugar de escribir (o copiar y pegar) esa enorme consulta cada vez, ¿no sería genial si pudieras guardarla y tratarla como si fuera una tabla simple?

Eso es exactamente lo que hace una **Vista** (o *View*). Una vista es una **consulta almacenada** en la base de datos que se presenta como una "tabla virtual". No almacena datos por sí misma; en cambio, ejecuta la consulta subyacente cada vez que se le llama.

### ¿Para qué sirven las vistas?
1.  **Simplificación:** Ocultan la complejidad de los `JOIN` y los cálculos. Un usuario puede hacer un `SELECT * FROM VistaDeVentasMensuales` sin necesidad de saber cómo se calcula esa información.
2.  **Seguridad:** Puedes restringir el acceso a los datos. Una vista puede exponer solo ciertas columnas y filas de una tabla, ocultando información sensible (como salarios o datos personales) a ciertos usuarios.
3.  **Consistencia:** Aseguran que la lógica de negocio se aplique de manera consistente. Si la forma de calcular "ingresos netos" cambia, solo tienes que actualizar la vista, y todos los reportes que la usan se actualizarán automáticamente.

### Sintaxis y Comandos Fundamentales

#### Crear una Vista

Se utiliza el comando `CREATE VIEW`. Opcionalmente, `CREATE OR REPLACE VIEW` actualizará la vista si ya existe.

**Sintaxis de Oracle:**
```oracle
CREATE OR REPLACE VIEW vista_empleados_departamento AS
SELECT
    e.NOMBRE AS NOMBRE_EMPLEADO,
    e.PUESTO,
    d.NOMBRE_DEPTO AS DEPARTAMENTO
FROM
    EMPLEADOS e
JOIN
    DEPARTAMENTOS d ON e.ID_DEPARTAMENTO = d.ID_DEPARTAMENTO
WHERE
    d.NOMBRE_DEPTO IN ('Ventas', 'Marketing');
```

Una vez creada, esta vista se comporta como una tabla.

#### Usar una Vista
Simplemente haz una consulta `SELECT` sobre ella.
```oracle
-- Obtener todos los empleados de Ventas y Marketing
SELECT * FROM vista_empleados_departamento;

-- Filtrar aún más la vista
SELECT * FROM vista_empleados_departamento WHERE DEPARTAMENTO = 'Ventas';
```

### Consejos de los Expertos
- **Rendimiento de las Vistas:** Recuerda que una vista es solo una consulta almacenada. Si la consulta subyacente es lenta, la vista también lo será. Para vistas muy complejas que se usan con frecuencia, a veces se usan "vistas materializadas", que sí almacenan físicamente los resultados y se actualizan periódicamente (un concepto más avanzado).
- **No abuses de las vistas anidadas:** Puedes crear una vista que se base en otra vista. Sin embargo, anidar vistas una sobre otra puede hacer que el rendimiento sea difícil de predecir y depurar.
- **Actualización de datos a través de vistas:** Es posible usar `INSERT`, `UPDATE` o `DELETE` en una vista, pero solo si la vista es "actualizable" (generalmente, si se basa en una sola tabla y no contiene agregaciones, `GROUP BY`, etc.). Es una práctica que debe usarse con cuidado.

---

### Resumen
Las vistas son una herramienta poderosa para la abstracción en SQL. Te permiten encapsular la lógica de una consulta compleja en un objeto reutilizable y seguro que se comporta como una tabla. Son ideales para simplificar el acceso a los datos para los usuarios finales, reforzar la seguridad y garantizar la consistencia en la lógica de negocio a través de diferentes reportes y aplicaciones.
