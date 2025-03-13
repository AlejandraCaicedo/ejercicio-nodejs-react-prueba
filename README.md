# 🚀 Red Social con Node.js y React

Este es un proyecto de red social con autenticación JWT, publicaciones y likes, construido con Node.js, Express, Prisma, React y Docker.

## 📌 Tecnologías usadas
- **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL
- **Frontend:** React, Context API
- **Autenticación:** JWT
- **Documentación:** Swagger
- **Contenedores:** Docker y Docker Compose

---

## 🔧 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/AlejandraCaicedo/ejercicio-nodejs-react-prueba.git
cd ejercicio-nodejs-react-prueba
```
---
## 📌 Endpoints principales
**🔐 Autenticación**
POST	/api/users/register	Registro de usuario
POST	/api/users/login	Inicio de sesión
**📝 Publicaciones**
Método	Endpoint	Descripción
GET	/api/posts	Obtener todas las publicaciones
POST	/api/posts	Crear una nueva publicación
POST	/api/posts/:id/like	Dar like a una publicación

---
### 2️⃣ Configurar variables de entorno
Crea un archivo .env en la carpeta backend con el siguiente contenido:
```bash
DATABASE_URL=postgresql://postgres:1234@postgres_container:5432/test
PORT=5000
JWT_SECRET=supersecretkey
```

---
### 🛠 Comandos útiles
Comando	Descripción
- docker-compose up --build -d	Levantar los contenedores
- docker-compose restart	Reiniciar los servicios
- docker logs -f backend_container	Ver logs del backend
- docker logs -f postgres_container	Ver logs de la base de datos

