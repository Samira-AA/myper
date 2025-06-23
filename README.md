# 📋 User Management Application

## 📝 Descripción

Aplicación web desarrollada con **Vue 3**, **Composition API**, **Pinia** y **PrimeVue**, que implementa un sistema **CRUD completo para gestionar usuarios**. Los datos se obtienen de la API pública de JSONPlaceholder y se manejan localmente. La interfaz es moderna, responsiva y amigable para el usuario.

## 🚀 Características

- 🔍 **Listado de usuarios**: Visualización en tabla con columnas `name`, `username`, `email` y `phone`.
- 📥 **Carga de datos desde API**: Los datos se consumen desde `https://jsonplaceholder.typicode.com/users` y se almacenan en un array local.
- ⏳ **Indicador de carga**: Muestra un loader mientras se obtienen los datos.
- ➕ **Agregar usuario**: Formulario con validación de correo electrónico. El usuario se añade solo al array local, con ID autogenerado.
- ✏️ **Editar usuario**: Edición mediante modal reutilizable y actualización del array local.
- 🗑️ **Eliminar usuario**: Botón con confirmación antes de borrar al usuario del array.
- ✅ **Validaciones**: Uso de validación HTML5 o personalizada.
- 🧩 **Componentes reutilizables**: Formularios y modales reutilizables para crear y editar usuarios.
- 🔔 **Notificaciones**: Mensajes `Toast` para acciones exitosas o errores.

## 🛠️ Tecnologías utilizadas

- **Vue 3** – Framework progresivo para construir interfaces de usuario.
- **Pinia** – Biblioteca para manejo de estado reactivo.
- **PrimeVue** – Conjunto de componentes UI accesibles y personalizables.
- **Axios** – Cliente HTTP para consumo de APIs.
- **Vite** – Herramienta moderna de bundling y desarrollo.

## 📁 Estructura del proyecto

```bash
src/
├── environment/          # Configuración de entornos (API URL, variables globales)
├── features/             # Módulos organizados por funcionalidades
│   └── user-management/  # Feature de gestión de usuarios
│       ├── components/   # Componentes específicos del módulo (formularios, tablas)
│       ├── models/       # Modelos de datos 
│       ├── pages/        # Vistas/páginas completas del módulo
│       ├── services/     # Lógica de API y servicios específicos
│       └── stores/       # Estado local del módulo (Pinia)
├── router/               # Configuración de rutas (vue-router)
├── shared/               # Componentes y utilidades globalmente compartidos
├── App.vue               # Componente raíz de la aplicación
└── main.js               # Punto de entrada de la app (config Vue, plugins)
```

## 🧪 Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>

2. Accede al directorio del proyecto:
    ```bash
    cd <NOMBRE_DEL_PROYECTO>

3. Instala las dependencias:
    ```bash
    npm install

## ▶️ Uso

### Modo desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

### Construcción para producción
Genera los archivos optimizados:
```bash
npm run build
```
### Vista previa de producción
Previsualiza la aplicación en modo producción:
```bash
npm run preview
```

## 🌐 API
La aplicación utiliza la API pública de JSONPlaceholder para obtener los datos de usuarios: https://jsonplaceholder.typicode.com/users
Los datos obtenidos se almacenan y manipulan en una estructura local (array).
La URL base está configurada en:
```bash
src/environment/environment.js
```
## 📦 Dependencias principales

- [`vue`](https://vuejs.org/): ^3.5.13
- [`pinia`](https://pinia.vuejs.org/): ^3.0.3
- [`primevue`](https://www.primefaces.org/primevue/): ^4.3.5
- [`axios`](https://axios-http.com/): ^1.10.0

## 🌐 Demo en vivo
👉 [Haz clic aquí para ver la aplicación desplegada](https://usermanagementmyper.netlify.app/)


## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.
