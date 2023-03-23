# Technical Test

Construir una API rest para almacenar los datos de los post y comentarios.

Requerimientos

    - Consumir los servicios REST (https://jsonplaceholder.typicode.com/posts y https://jsonplaceholder.typicode.com/comments)
    - Almacenar en una base de datos los datos de los post y comentarios
    - Dejar configurable la conexion a la base de datos (Para modificar la conexion, modificar el archivo .env)
    - Utilizar autentificación de JWT para los endpoints
    - Implementar Pruebas unitarias con un covertura del 100% utilizando JEST
    - Incluir README con instrucciónes de ejecución

## Files

| Carpeta  | nombre archivo | Descripción |
|---|---|---|
| database | create_database_postgres.sql| Script para crear la base de datos, ejecutar antes de iniciar el proceso de pruebas o trabajar con la app |
| database | post_technical_test.png | Diagrama de la base de datos |
| postman | technical-test.postman_collection.json | Colección la cual contiene los endpoints precargados y ejecutar pruebas, se debe ejecutar en postman |
| postman | technical-test.postman_environment.json | Variable de entorno para ejecutar colecciones, se debe ejecutar en postman |

## Tools

| Type      | Tool            | Version |Requerido|
|-----------|-----------------|---------|---------|
| Virtual Machine | Docker  | > 20.10.23|Opcional |
| Data base | PostgresSQL     | 15.2    |SI       |
| Runtime   | NodeJs          | 18.14.0 |SI       |
| Language  | JavaScript      | EMS     |SI       |
| Linter    | eslint          | 8.11.0  |SI       |
| Test      | Jest            | 29.5.0  |SI       |

Nota: Uso de guia de buenas practicas propuestas por Airbnb.

## Endpoints

|Method| Endpoint              | Details |
|------|-----------------------|------------------|
| POST | /login/auth           | Inicio de sesión |
| GET  | /post/                | Obtener información de los post registrados en la base de datos |
| GET  | /userLogin            | Consultar todos los usuarios registrados |
| POST | /userLogin            | Registrar un nuevo usuario para realizar inicio de sesión |
| PUT  | /userLogin/:id        | Cambiar la contraseña de un usuario registrado |
| PUT  | /userLogin/status/:id | Activar o desactivar usuario registrado (depende del estatus del usuario en el que se encuentre al momento del cambio) |

## Enviroments

A continuación se describen las variables de entorno que se utilizan para utilizar el proyecto en ambiente local, para modificar los valores favor de utilizar el archivo **.env**

| Categoría | Nombre | Valor por defecto | Descripción |
|---|---|---|---|
| Base de datos | HOST_DB | localhost | Direción donde se encuentra el servicio de base de datos |
| Base de datos | PORT_DB | 5432 | Puerto de conexion para la base de datos |
| Base de datos | USERNAME_DB | test | Nombre de usuario para realizar la conexión con la base de datos |
| Base de datos | PASSWORD_DB | example | Contraseña para realizar la conexión con la base de datos |
| Base de datos | DATABASE_DB | post_technical_test | Nombre de la base de datos |
| Base de datos | CONNECTION_TIME_OUT | 20000 | Tiempo de vida que puede estar activo una solicitud antes de que se concluya la comunicación |
| Base de datos | IDLE_TIMEOUT_MILLIS | 10 | Tiempo que puede estar activa una conexion sin trafico |
| Base de datos | MAX_CONNECTIONS | 10 | Número de conexiones simultaneas que estan activas |
| Global |SHOW_ENVITOMENTS|true| Si se quiere ver que variables de entorno se estan configurando |
| Servidor |PORT_SERVER|3302| Puerto con el cual se levanta la aplicación en http |
| Endpoint |ENDPOINT_USER_POST|<https://jsonplaceholder.typicode.com/users|> Endpoint para consultar los usuarios que publican posts,  existen un total de 10|
| Endpoint |ENDPOINT_POST|<https://jsonplaceholder.typicode.com/posts|> Endpoint para consultar los posts registrados, existen un total de 200 |
| Endpoint |ENDPOINT_COMMENT|<https://jsonplaceholder.typicode.com/comments|> Endpoint para consultar los comentarios registrados, existen un total de 500 |
| BCrypt|SALT_ROUNDS|10| Rondas de hashing que se aplican para cifrar una cadena  |
|JWT|SECRET_KEY_JWT|sP7dbmMG44dnBL1$yaXJ3DpO19hDlX| Clave secreta con la cual se generan los tokens de jwt, si se cambia y existen tokens los marcara como tokens invalidos |
|JWT|TOKEN_EXPIRED_IN_JWT|600| Tiempo de vida que tiene un token desde su creación, el tiempo se configura en segundos |

## Ejecutar proyecto

### Ambientar equipo

Antes de ejecutar el proyecto se deben tener todas las herramientas instaladas, para más información consulte la sección de [Tools](#tools).

Si tiene instalado docker puede ejecutar el comando, en el directorio del proyecto:

```bash
docker-compose up
````

Con el cual se creara el servicio de postgresSQL y la base de datos con sus tablas correspondientes, tambien en el directorio se creara una carpeta llamada volumenes la cual contiene el respaldo de la base de datos en caso de no requerirla favor de eliminarla, esta no se carga a git.
Nota: **Este no contiene gestor de base de datos por lo cual se debera de conectar mediante un gestor externo.**

Datos de conexion para postgres en docker

1. Host: localhost
1. Port: 5432
1. User_name: test
1. Password: example

### Instalar dependencias

1. Para instalar todas las dependencias se debe ejecutar el siguiente comando:

    ```bash
    npm install
    ```

    Nota: Con el comando previo se instalaran las dependencias especificada en el package.json en las secciones de **dependencies** y **devDependencies**.

    Si se requiere omitir las dependencias especificadas en la sección de **devDependencies** del package.json, ejecute el siguiente comando, ideal para ambientes productivos.

    ```bash
    npm install --omit=dev 
    ```

### Ejecutar proyecto

Para levantar el proyecto existen diferentes metodos iniciar

1. Ejecución de proyecto recomendada para producción

    ```bash
    node ./src/server.js
    ```

1. Si requiere levantar el proyecto para construir nuevas funcionalidades o arreglar incidencias, se recomienda el siguiente comando, debido a que cuando guarde cambios en automantico se reiniciara el servicio y tomara los cambios.

    ```bash
    npm run nodemon
    ```

Nota: Cuando se ejecute por primera vez el proyecto, se ejecuta la función de initApp, la cual se conectara a los servicios de users, post y comments y con la información obtenida llenara la base de datos.


### Ejecutar pruebas unitarias

Al momentos de ejecutar las pruebas, se inicializara la base de datos mediante la funcion la funcion initApp()y posteriormente se ejecutaran todas las pruebas, para esto ejecute el siguiente comando:

```bash
npm run coverage
```
