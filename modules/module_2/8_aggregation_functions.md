## 8. Funciones de Agregación

### ¿Por Qué Resumir Datos?

A veces no necesitas la lista completa de datos, sino un resumen de ellos. Quieres ver el panorama general, no los detalles individuales. Las funciones de agregación te permiten calcular un valor único a partir de un conjunto de filas. Son como la calculadora de tu base de datos.

---

### Términos Clave

Antes de aprender sobre agregaciones, entendamos estos conceptos:

- **Función de Agregación:** Una función SQL que realiza un cálculo sobre un conjunto de valores y devuelve un único valor resumen.
- **COUNT():** Función que cuenta el número de filas o valores no nulos.
- **SUM():** Función que suma todos los valores de una columna numérica.
- **AVG() (Average):** Función que calcula el promedio (media aritmética) de los valores de una columna numérica.
- **MAX() (Maximum):** Función que devuelve el valor máximo de una columna (funciona con números, fechas y texto).
- **MIN() (Minimum):** Función que devuelve el valor mínimo de una columna (funciona con números, fechas y texto).

---

### ¿Qué son las Funciones de Agregación?

Estas funciones toman múltiples valores de una columna y los "agregan" en un único resultado.

**Funciones más Comunes:**
- `COUNT()`: Cuenta el número de filas.
- `SUM()`: Suma los valores de una columna numérica.
- `AVG()`: Calcula el promedio de los valores de una columna numérica.
- `MAX()`: Devuelve el valor máximo de una columna.
- `MIN()`: Devuelve el valor mínimo de una columna.

### Ejemplos Ilustrativos

- **Pregunta:** "¿Cuántos estudiantes tengo en total?"
```oracle
SELECT COUNT(*)
FROM Estudiantes;
```

- **Pregunta:** "¿Cuál es la fecha de nacimiento del estudiante más viejo y del más joven?"

```oracle
SELECT MIN(Fecha_Nacimiento) AS Mas_Viejo, MAX(Fecha_Nacimiento) AS Mas_Joven
FROM Estudiantes;
```

  (Nota: Para fechas, un valor "menor" es una fecha más antigua).

- **Pregunta:** Supongamos que tenemos una tabla `Calificaciones` con una columna `Nota`. "¿Cuál es la nota promedio?"

```oracle
SELECT AVG(Nota)
FROM Calificaciones;
```

### Consejos de los Expertos

- **`COUNT(*)` vs `COUNT(columna)`:** `COUNT(*)` cuenta todas las filas del grupo, sin excepción. `COUNT(nombre_columna)` cuenta solo las filas donde `nombre_columna` tiene un valor no nulo (no NULL). Esta diferencia es sutil pero importante para obtener resultados precisos.
- **Usa Alias con `AS`:** Las columnas calculadas por funciones de agregación no tienen un nombre por defecto. Usa `AS` para darles un nombre descriptivo y que sea fácil de referenciar en tu aplicación.
- **Tipos de Datos:** Asegúrate de usar `SUM` y `AVG` solo en columnas numéricas. `MIN` y `MAX` funcionan en números, fechas y texto (orden alfabético).

---

### Resumen

Las funciones de agregación son herramientas increíblemente poderosas para la inteligencia de negocios y la analítica. Te permiten condensar grandes cantidades de datos en resúmenes significativos como conteos, totales y promedios.
