## 2. Tipos de Bases de Datos NoSQL

### Introducción
NoSQL no es una sola cosa, sino una familia de diferentes tipos de bases de datos. Cada tipo está optimizado para un caso de uso específico. Conozcamos los cuatro modelos principales para que puedas elegir el más adecuado para tu proyecto.

### Conceptos Clave

1.  **Bases de Datos Clave-Valor (Key-Value Stores)**
    *   **Concepto:** Es el modelo más simple. Almacena datos como un par de clave y valor, similar a un diccionario o un mapa hash. Cada valor está asociado a una clave única.
    *   **Analogía:** Imagina un guardarropa donde cada abrigo (valor) tiene un número de ticket único (clave). Para recuperar tu abrigo, solo necesitas el ticket.
    *   **Ejemplo:**
        (clave: `user:123`, valor: `{name: "Carlos", email: "carlos@example.com"}`)

2.  **Bases de Datos Documentales (Document Databases)**
    *   **Concepto:** Almacenan datos en "documentos" (generalmente en formatos como JSON o BSON), que son unidades autocontenidas de información. Los documentos pueden tener estructuras complejas y anidadas.
    *   **Analogía:** Piensa en un archivador. Cada documento es un expediente que contiene toda la información relacionada con un tema (por ejemplo, un perfil de usuario completo).
    *   **Ejemplo de un documento de usuario:**
```json
{
    "userId": "u-001",
    "username": "Ana",
    "email": "ana@email.com",
    "posts": [
        {"postId": "p-01", "title": "Mi primer post"},
        {"postId": "p-02", "title": "Mi segundo post"}
    ]
}
```

3.  **Bases de Datos de Columnas (Column-Family Stores)**
    *   **Concepto:** Almacenan los datos en columnas en lugar de filas. Esto hace que las consultas que necesitan agregar datos de una columna específica (por ejemplo, "calcular el promedio de todas las edades") sean extremadamente rápidas.
    *   **Analogía:** Piensa en una hoja de cálculo gigante. En lugar de leer una fila entera para obtener un solo dato, puedes tomar directamente toda una columna.
    *   **Ideal para:** Análisis de grandes volúmenes de datos (Big Data) y datos de series temporales.

4.  **Bases de Datos de Grafos (Graph Databases)**
    *   **Concepto:** Están diseñadas para almacenar datos cuyas relaciones son tan importantes como los propios datos. Usan nodos (para las entidades) y aristas (para las relaciones).
    *   **Analogía:** Un mapa mental o una red social. Los nodos son las personas y las aristas son las conexiones de "amistad" entre ellas.
    *   **Ideal para:** Redes sociales, sistemas de recomendación y detección de fraudes.

### Resumen y Cuándo Usarlo
| Tipo de NoSQL | Ideal Para |
| :--- | :--- |
| **Clave-Valor** | Caché, gestión de sesiones, perfiles de usuario simples. |
| **Documental** | Gestión de contenidos, catálogos de productos, aplicaciones móviles. |
| **Columnas** | Analítica de Big Data, telemetría, sistemas de monitoreo. |
| **Grafos** | Redes sociales, motores de recomendación, logística. |

### Consejos de los Expertos
> Elige el tipo de base de datos que mejor se adapte a la "forma" de tus datos y a cómo planeas consultarlos. No intentes forzar tus datos a un modelo que no les corresponde.
