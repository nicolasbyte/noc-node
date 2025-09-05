# NOC Project

Este proyecto es una aplicación de monitoreo de servicios construida con Node.js y TypeScript. Utiliza trabajos cron para realizar chequeos periódicos y registra los resultados en archivos de sistema.

## Características

- Monitoreo periódico de servicios a través de trabajos cron.
- Arquitectura limpia y organizada por capas (Dominio, Infraestructura, Presentación).
- Sistema de logging con diferentes niveles de severidad (`low`, `medium`, `high`).
- Configuración a través de variables de entorno.

## Empezando

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 20.x o superior recomendada)
- [NPM](https://www.npmjs.com/)

### Instalación

1.  **Clona el repositorio**
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd noc-node
    ```

2.  **Instala las dependencias**
    ```sh
    npm install
    ```

3.  **Configura las variables de entorno**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables. Puedes usar el archivo `.env.example` como guía.

    ```env
    # Puerto en el que correrá la aplicación
    PORT=3000

    # Patrón de cron para la ejecución de chequeos
    CRON_TIME=*/5 * * * * *
    ```
    > El `CRON_TIME` por defecto está configurado para ejecutarse cada 5 segundos.

### Ejecutando la aplicación

-   **Modo de Desarrollo:**
    Para correr la aplicación en modo de desarrollo con reinicio automático al detectar cambios:
    ```sh
    npm run dev
    ```

-   **Modo de Producción:**
    Para construir la aplicación y correr la versión de producción:
    ```sh
    npm start
    ```

## Estructura del Proyecto

El proyecto sigue una arquitectura por capas para separar responsabilidades:

-   `src/domain`: Contiene la lógica de negocio principal y las entidades. Es independiente de cualquier tecnología o framework.
    -   `datasources`: Define los contratos (interfaces) para el origen de los datos.
    -   `entities`: Clases que representan los objetos de nuestro dominio.
    -   `repository`: Define los contratos para acceder a los datos.
    -   `use-case`: Orquesta la lógica de negocio.
-   `src/infrastructure`: Contiene las implementaciones concretas de los contratos definidos en el dominio (por ejemplo, la implementación del datasource para sistema de archivos).
-   `src/presentation`: Contiene la capa de entrada a la aplicación (el servidor y los servicios cron).
-   `src/config`: Contiene la configuración de plugins, como las variables de entorno.
