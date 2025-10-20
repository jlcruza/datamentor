## 2. Tipos de Índices: Clustered vs. Non-Clustered

### ¿Por qué existen diferentes tipos de índices? El diccionario vs. el índice del libro

Pensemos en dos formas de organizar la información:

1.  **Un diccionario:** Las palabras están ordenadas alfabéticamente. La propia estructura del libro *es* el índice. No puedes reordenar las palabras de otra manera. Esto es análogo a un **índice agrupado (clustered)**.
2.  **El índice de un libro de historia:** El libro está organizado por capítulos y temas. Al final, hay un índice alfabético que te dice en qué página encontrar "Napoleón". Este índice es una estructura separada que apunta a los datos. Esto es análogo a un **índice no agrupado (non-clustered)**.

En Oracle, el concepto de "índice agrupado" se implementa a través de **Tablas Organizadas por Índice (Index-Organized Tables - IOT)**. Los índices estándar (`CREATE INDEX`) son no agrupados.

---

### Sintaxis y Conceptos Clave (Oracle SQL)

**Índice No Agrupado (Non-Clustered - El estándar en Oracle):**
Es una estructura separada que contiene la clave del índice y un puntero (el `ROWID`) a la ubicación física de la fila. Una tabla puede tener muchos índices no agrupados.
```sql
-- Este es un índice no agrupado
CREATE INDEX idx_dept_nombre
ON departamentos (nombre_departamento);
```

**Índice Agrupado (Clustered - Implementado como IOT en Oracle):**
La tabla misma está almacenada en el orden del índice. No hay una estructura de tabla separada. Por lo tanto, una tabla solo puede ser organizada por un índice (solo puede tener un orden físico).
```sql
-- Crear una tabla organizada por índice (similar a un índice agrupado)
CREATE TABLE paises (
    id_pais CHAR(2) PRIMARY KEY,
    nombre_pais VARCHAR2(40)
)
ORGANIZATION INDEX;
```

### Ejemplos Ilustrativos

Imagina una tabla de `usuarios` con un `id_usuario` como clave primaria.

*   Si la creamos como una **IOT** basada en `id_usuario`, las filas de la tabla se almacenarán físicamente en orden de `id_usuario`. El acceso por ID será extremadamente rápido porque la base de datos salta directamente a la ubicación de los datos.
*   Si creamos un **índice no agrupado** en `id_usuario`, habrá dos estructuras: la tabla (cuyas filas pueden estar en cualquier orden) y el índice (que está ordenado por `id_usuario` y apunta a cada fila de la tabla).

### Consejos de los Expertos

*   **Tablas Organizadas por Índice (IOTs):** Son ideales para tablas de búsqueda estáticas (como una lista de países o códigos postales) o para cualquier tabla donde el acceso se realiza principalmente a través de la clave primaria.
*   **Índices Bitmap:** Oracle también ofrece índices `BITMAP`, que son excelentes para columnas con baja cardinalidad (pocos valores distintos, como 'Género' o 'Estado Civil') en entornos de solo lectura o con pocas modificaciones.
*   **La mayoría de las veces, usarás índices B-Tree no agrupados**, que es el tipo por defecto en Oracle y es muy versátil.

---

### Resumen

Los índices no agrupados son estructuras separadas que apuntan a los datos, permitiendo tener muchos por tabla. Los índices agrupados (IOTs en Oracle) dictan el orden físico de los datos en la tabla, por lo que solo puede haber uno. La elección depende de cómo accedes a los datos de la tabla.
