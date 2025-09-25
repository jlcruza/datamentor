## Lección 7: Cuándo y Por Qué Desnormalizar

### ¿Por qué debo aprender esto?
Después de aprender todas estas reglas para crear una base de datos "perfecta", ¿por qué querríamos romperlas? La respuesta es simple: **rendimiento**. Una base de datos altamente normalizada puede requerir muchas uniones (`JOINs`) para obtener datos, lo que puede ser lento en consultas complejas o con grandes volúmenes de información. La desnormalización es la técnica de romper las reglas de forma controlada para acelerar las lecturas.

### Explicación del Concepto
La **desnormalización** es el proceso de añadir intencionadamente redundancia a una base de datos para mejorar el rendimiento de las consultas. Es un compromiso: sacrificas la eficiencia de escritura y la pureza de los datos a cambio de una velocidad de lectura mucho mayor.

**¿Cuándo se debe considerar?**
Principalmente en sistemas de **Inteligencia de Negocios (BI)**, **Data Warehousing** o aplicaciones de **solo lectura** (OLAP - Online Analytical Processing), donde las consultas son complejas y la velocidad de respuesta es crítica.

**Técnicas Comunes:**
*   **Almacenar Valores Calculados:** Si frecuentemente calculas un `precio_total` (`cantidad * precio_unitario`), podrías añadir una columna `precio_total` a la tabla. Esto evita el cálculo en cada lectura.
*   **Combinar Tablas (Romper 3NF):** Si *siempre* que consultas un `Libro` también necesitas el `nombre_del_autor`, podrías añadir una columna `nombre_autor` a la tabla `Libros` para evitar el `JOIN` con `Autores`. Esto crea redundancia, pero acelera la consulta.

### Ejemplo Ilustrativo
Imagina un sitio de e-commerce. Para mostrar la página de un producto, necesitas el nombre del producto, su categoría, el nombre del fabricante, etc. Un diseño normalizado requeriría unir 3 o 4 tablas. Un enfoque desnormalizado podría tener una única tabla "aplanada" con toda esta información, lista para ser leída de una sola vez. Esto hace que la página cargue instantáneamente. El coste es que si el nombre del fabricante cambia, hay que actualizarlo en todos los productos de ese fabricante.

### Tips from the Experts
*   **¡No Desnormalices Prematuramente!:** Este es el error de optimización más común. Primero, diseña y construye una base de datos normalizada (3NF). Solo considera desnormalizar cuando hayas identificado un cuello de botella de rendimiento real y medible.
*   **Documenta tus Decisiones:** Si decides desnormalizar, deja un comentario claro en tu DER o en la documentación de la base de datos explicando por qué lo hiciste. Tu "yo" del futuro (y tus compañeros) te lo agradecerán.
*   **Usa Disparadores (Triggers) o Lógica de Aplicación para Mantener la Sincronización:** Si almacenas `nombre_autor` en la tabla `Libros`, necesitas un mecanismo (como un disparador de base de datos) que actualice automáticamente esa columna en todos los libros de un autor si su nombre cambia en la tabla `Autores`.

### Resumen
La desnormalización es una técnica de optimización de rendimiento donde se rompen deliberadamente las reglas de normalización para acelerar la lectura de datos. Es una herramienta poderosa, especialmente para informes y análisis, pero debe usarse con precaución, solo cuando sea necesario y gestionando la redundancia que introduce.