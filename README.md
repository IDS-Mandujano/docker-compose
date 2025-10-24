Proyecto de Arquitectura de Microservicios con Docker Compose

Este proyecto implementa una arquitectura de tres capas (frontend, backend, base de datos) utilizando microservicios orquestados con Docker Compose y desplegados en una instancia EC2 de AWS.

🏛️ Arquitectura y Flujo de Datos

La aplicación se compone de tres servicios contenerizados que se comunican a través de una red interna personalizada (mi_red_app).

Servicios Incluidos

Frontend (frontend_eduardo):

Tecnología: React.js (construido con Vite y pnpm).

Descripción: Sirve la interfaz de usuario estática a través de un servidor httpd:2.4-alpine (Apache). Consume datos de la API del backend.

Puerto expuesto: 80.

Backend (backend_eduardo):

Tecnología: API REST con Node.js y Express.

Descripción: Expone el endpoint /Mandujano para el frontend. Se conecta a la base de datos MySQL para consultar datos.

Puerto expuesto: 5000.

Base de Datos (db_Mandujano):

Tecnología: mysql:8.0.

Descripción: Almacena los datos del usuario. Utiliza un volumen nombrado de Docker (db-data) para garantizar la persistencia de los datos aunque se reinicie la instancia.

Puerto expuesto: 3306.

Diagrama de Flujo de Datos (Despliegue en AWS)

graph TD
    Usuario[👤 Usuario en Internet] -- Petición HTTP a IP Pública --> EC2_IP[IP Elástica: 35.153.67.199]

    subgraph "Instancia AWS EC2"
        EC2_IP -- Puerto 80 --> Frontend[🌐 Cont. frontend_eduardo (Apache)]
        EC2_IP -- Puerto 5000 --> Backend[⚙️ Cont. backend_eduardo (Node.js)]
        EC2_IP -- Puerto 3306 --> Database[🗄️ Cont. db_Mandujano (MySQL)]

        subgraph "Red Interna de Docker (mi_red_app)"
            Frontend -- http://backend_eduardo:5000 --> Backend
            Backend -- db_Mandujano:3306 --> Database
        end
    end


🚀 Cómo Levantar el Entorno (Despliegue en AWS)

Para ejecutar este proyecto, necesitas una instancia EC2 de Ubuntu con Docker y Docker Compose instalados.

Clona el repositorio:

git clone [https://github.com/IDS-Mandujano/docker-compose](https://github.com/IDS-Mandujano/docker-compose)
cd docker-compose


Corrige el nombre de la carpeta (si es necesario):
Git puede clonar Frontend con mayúscula. Corrígelo para que coincida con el docker-compose.yaml.

mv Frontend frontend


Define la variable de entorno de la API:
Este paso es CRUCIAL para que el frontend sepa a qué dirección IP llamar. Reemplaza la IP si cambia.

export VITE_API_URL="[http://35.153.67.199:5000](http://35.153.67.199:5000)"


Construye y levanta los contenedores:
El comando --build construirá las imágenes del frontend y backend la primera vez. -d lo ejecuta en segundo plano.
docker-compose up --build -d


Poblar la base de datos (Solo la primera vez):
Asegúrate de que el puerto 3306 esté abierto a tu IP en el Grupo de Seguridad de AWS.
Conéctate con MySQL Workbench usando la IP 35.153.67.199, usuario usuario_db y contraseña password_db.
Ejecuta el siguiente script SQL para crear la tabla y los datos:

USE db_eduardo;

CREATE TABLE datosusuario (
    idDatosUsuario INT PRIMARY KEY,
    Nombres VARCHAR(100),
    ApellidoP VARCHAR(100),
    ApellidoM VARCHAR(100)
);

INSERT INTO datosusuario (idDatosUsuario, Nombres, ApellidoP, ApellidoM)
VALUES (1, 'Jesus Eduardo', 'Gutierrez', 'Mandujano');


Accede a la aplicación:
¡Abre tu navegador y visita la IP pública de tu instancia!
http://35.153.67.199

🔗 URL del Repositorio

El código fuente de este proyecto se encuentra en:
https://github.com/IDS-Mandujano/docker-compose