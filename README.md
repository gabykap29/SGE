# Sistema de Expedientes Judiciales

Este sistema permite la gestión integral de expedientes judiciales y las personas involucradas en ellos. Desarrollado con Node.js y Express, utiliza EJS como motor de plantillas y PostgreSQL como base de datos.

## Características

- **Gestión de Expedientes Judiciales:** Creación, actualización y visualización de expedientes.
- **Gestión de Personas:** Administración de datos de las personas involucradas en los expedientes.
- **Automatización:** Expedientes no marcados como elevados en un plazo de 15 días se marcarán automáticamente como vencidos.
- **Exportación a PDF:** Generación de expedientes en formato PDF para su impresión.

## Tecnologías Utilizadas

- **Backend:** Node.js con Express.
- **Motor de Plantillas:** EJS.
- **Base de Datos:** PostgreSQL.
- **Almacenamiento de Archivos:** PDF.

## Instalación

Sigue estos pasos para instalar y configurar el sistema en tu entorno local.
1. clona el repositorio con ``` git clone https://github.com/gabykap29/SGE.git ```
2. navega hasta la carpeta del proyecto
3. instala todas las dependencias necesarias con ``` npm install ```
4. crea un archivo ".env" en la raiz del proyecto.
5. completa el .env con las especificaciones del .envexample
6. carga la base de datos de personas (opcional)
7. monta el servidor con ``` npm run dev ``` o ``` node index.js ```

### Prerrequisitos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- Git

