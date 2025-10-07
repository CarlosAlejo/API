EJERCICIO DE PRUEBAS DE CARGA - LOGIN SERVICE

Tecnologías requeridas:
- K6 v0.49.0 o superior
- Node.js v22 o superior
- Git

Instrucciones de ejecución:

1. Clonar el repositorio:
   git clone <url-repositorio>
   cd proyecto-performance

2. Verificar estructura de archivos:
   - script.js (script principal de prueba)
   - users.csv (datos parametrizados)
   - readme.txt (este archivo)

3. Ejecutar la prueba:
   k6 run script.js

4. Ver resultados:
   - Consola: métricas en tiempo real
   - informe/informe.html: reporte detallado
   - summary.json: datos en JSON

5. Parámetros de la prueba:
   - Objetivo: 20 TPS (Transacciones Por Segundo)
   - Tiempo máximo respuesta: 1.5 segundos
   - Tasa de error aceptable: < 3%