## 3. Cuándo Usar NoSQL vs. Bases de Datos Relacionales

### Introducción
La elección entre SQL y NoSQL no es una batalla de "mejor" o "peor". Se trata de seleccionar la herramienta adecuada para el problema que intentas resolver. En esta lección, aprenderás a identificar las señales que te indicarán qué camino tomar.

### Comparativa Detallada

| Criterio | Bases de Datos Relacionales (SQL) | Bases de Datos NoSQL |
| :--- | :--- | :--- |
| **Modelo de Datos** | Estructurado y predecible. Requiere un esquema definido antes de insertar datos. | Flexible y dinámico. Ideal para datos no estructurados o que evolucionan rápidamente. |
| **Integridad de Datos**| Fuerte y garantizada (mediante propiedades ACID). Perfecto para transacciones. | Consistencia eventual (modelo BASE). La disponibilidad y velocidad son a menudo más importantes. |
| **Escalabilidad** | Escala verticalmente (aumentando la potencia de un solo servidor). Costoso y con límites. | Escala horizontalmente (distribuyendo la carga entre muchos servidores más baratos). Escalabilidad casi infinita.|
| **Casos de Uso Típicos**| Sistemas bancarios, aplicaciones de contabilidad, sistemas de reservas. | Redes sociales, análisis de Big Data, aplicaciones de IoT, catálogos de e-commerce. |

### Ejemplo de un Sistema Híbrido
Imagina una plataforma de e-commerce como Amazon:
*   **SQL para Transacciones:** El procesamiento de pedidos, pagos e inventario requiere una consistencia absoluta. Aquí, una base de datos relacional es la mejor opción para garantizar que cada transacción se complete de forma segura.
*   **NoSQL para el Catálogo:** El catálogo de productos, las opiniones de los usuarios y el historial de navegación son datos que cambian constantemente y no tienen una estructura fija. Una base de datos documental NoSQL es perfecta para manejar esta flexibilidad y volumen.

### Resumen y Cuándo Usarlo
La decisión se reduce a un equilibrio entre **estructura vs. flexibilidad** y **consistencia vs. escala**.

*   **Elige SQL cuando:**
    *   La integridad de los datos es tu máxima prioridad (por ejemplo, en transacciones financieras).
    *   Tus datos son estructurados y su esquema es estable.
    *   Necesitas consultas complejas que unan múltiples tablas.

*   **Elige NoSQL cuando:**
    *   Necesitas manejar un volumen masivo de datos con alta velocidad.
    *   Tus datos no tienen una estructura clara o cambian con frecuencia.
    *   Tu aplicación debe estar siempre disponible, incluso si eso significa una pequeña demora en la consistencia de los datos.

### Consejos de los Expertos
> Los sistemas modernos a menudo son "políglotas", lo que significa que utilizan múltiples tipos de bases de datos (tanto SQL como NoSQL) para diferentes partes de la misma aplicación. ¡Aprovecha lo mejor de ambos mundos!
