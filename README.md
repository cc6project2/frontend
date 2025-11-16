# Mi Clínica - Sistema de Gestión Clínica (Frontend)

Sistema web para gestión de consultorios y clínicas pequeñas, desarrollado con React + Chakra UI.

## 🚀 Tecnologías

- **React 19** - Framework principal
- **Chakra UI v2** - Sistema de componentes UI
- **React Router** - Navegación
- **Axios** - Peticiones HTTP
- **React Icons** - Iconografía
- **Vite** - Build tool

## 📁 Estructura del Proyecto
```
frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── common/        # Componentes comunes (Navbar, Table, etc.)
│   │   ├── patients/      # Componentes de pacientes
│   │   ├── consultations/ # Componentes de consultas
│   │   └── users/         # Componentes de usuarios
│   ├── pages/            # Páginas principales
│   ├── layouts/          # Layouts (Main, Auth)
│   ├── services/         # Servicios de API
│   ├── context/          # Context API (Auth)
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilidades y helpers
│   ├── theme/            # Tema de Chakra UI
│   └── routes.jsx        # Configuración de rutas
├── public/
└── package.json
```

## 🎯 Funcionalidades

### ✅ Implementadas
- Sistema de autenticación (login/logout)
- Gestión completa de pacientes (CRUD)
- Registro de consultas médicas
- Historial médico por paciente
- Dashboard con estadísticas
- Gestión de usuarios (solo admin)
- Sistema de roles (Admin, Médico, Asistente)
- Búsqueda y filtros
- Interfaz responsive

### 🔄 Por conectar con Backend
- Todos los servicios están listos en `/services`
- Solo falta descomentar las llamadas API cuando el backend esté disponible

## 🛠️ Instalación
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔧 Configuración

Editar `src/utils/constants.js` para cambiar la URL del backend:
```javascript
export const API_URL = 'http://localhost:3000/api'
```

## 👥 Roles de Usuario

- **Administrador**: Acceso completo, gestión de usuarios
- **Médico**: Gestión de pacientes y consultas
- **Asistente**: Registro de pacientes, visualización limitada

## 📝 Credenciales de Prueba

Por ahora acepta cualquier email/contraseña (mock).
Cuando conectes el backend, usar las credenciales reales.

## 🎨 Personalización de Tema

El tema se puede modificar en `src/theme/theme.js`

## 📦 Dependencias Principales
```json
{
  "@chakra-ui/react": "^2.8.2",
  "react": "^19.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "react-icons": "^5.x"
}
```

## 🚀 Próximos Pasos

1. Conectar con el backend (API REST)
2. Implementar manejo de errores global
3. Agregar reportes en PDF
4. Sistema de notificaciones
5. Estadísticas avanzadas con gráficas

---

Desarrollado por **Gabriel Roldan y Cruz Ambrocio**