# Merre Platform 🚀

> Plataforma frontend moderna desarrollada con React y Material-UI para gestión de datos y análisis

## 📋 Descripción

Merre Platform es una aplicación web robusta desarrollada con React y TypeScript que integra múltiples librerías modernas para crear una plataforma versátil de gestión de datos. Combina Material-UI, Bootstrap, Firebase y herramientas avanzadas de formularios para ofrecer una experiencia de usuario completa.

## ✨ Características Principales

- **🎨 UI Moderna**: Combinación de Material-UI y Bootstrap para diseño responsivo
- **📋 Formularios Avanzados**: React Hook Form con validación robusta
- **📅 Gestión de Fechas**: React DatePicker integrado con date-fns
- **🔥 Backend Firebase**: Integración completa con servicios de Firebase
- **🎯 Iconografía Rica**: FontAwesome icons integrados
- **📊 Gestión de Estado**: TypeScript para tipado estático
- **🔄 Routing Avanzado**: React Router DOM para navegación SPA

## 🛠️ Stack Tecnológico

### Core Frontend
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 3.9.10** - Tipado estático
- **Create React App 5.0.1** - Configuración base

### UI Frameworks
- **Material-UI 5.15.15** - Componentes principales de UI
- **Bootstrap 5.3.3** - Sistema de grid y utilidades
- **React Bootstrap 2.10.2** - Componentes Bootstrap para React
- **MDB React UI Kit 8.0.0** - Material Design Bootstrap

### Iconografía
- **FontAwesome 6.5.2** - Iconos vectoriales
- **Material-UI Icons** - Iconos de Material Design

### Formularios y Fechas
- **React Hook Form 7.51.3** - Gestión de formularios performante
- **React DatePicker 6.8.0** - Selector de fechas avanzado
- **Date-fns 3.6.0** - Utilidades de manipulación de fechas

### Backend y Servicios
- **Firebase 10.11.0** - Backend as a Service
- **Axios 1.6.8** - Cliente HTTP para APIs

### Utilidades
- **Classnames 2.5.1** - Gestión dinámica de clases CSS

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ (LTS recomendado)
- npm o yarn
- Cuenta de Firebase (opcional)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Yop007N/merre.git
cd merre

# Instalar dependencias
npm install

# Configurar variables de entorno (si usas Firebase)
cp .env.example .env
# Editar .env con tus credenciales de Firebase

# Iniciar servidor de desarrollo
npm start
```

### Variables de Entorno

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
```

## 📖 Scripts Disponibles

```bash
# Desarrollo
npm start             # Servidor de desarrollo (puerto 3000)

# Construcción
npm run build         # Build optimizado para producción

# Testing
npm test              # Ejecuta tests en modo watch

# Análisis
npm run eject         # Expone configuración de CRA (irreversible)
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes base de UI
│   ├── forms/              # Componentes de formularios
│   ├── layout/             # Componentes de layout
│   └── common/             # Componentes comunes
├── pages/                  # Páginas principales
│   ├── Dashboard/
│   ├── Profile/
│   └── Settings/
├── hooks/                  # Custom hooks
│   ├── useForm.ts
│   ├── useAuth.ts
│   └── useFirebase.ts
├── services/               # Servicios de API
│   ├── firebase.ts
│   ├── api.ts
│   └── auth.ts
├── types/                  # Definiciones TypeScript
│   ├── user.types.ts
│   ├── form.types.ts
│   └── api.types.ts
├── utils/                  # Utilidades
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
└── styles/                 # Estilos globales
    └── App.css
```

## 🎨 Configuración de UI

### Material-UI Theme

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

### Bootstrap Integration

```css
/* Importación en index.css o App.css */
@import 'bootstrap/dist/css/bootstrap.min.css';
```

## 📋 Gestión de Formularios

### React Hook Form Setup

```typescript
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  date: Date;
}

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <span>Este campo es requerido</span>}
    </form>
  );
}
```

## 🔥 Integración con Firebase

### Configuración Inicial

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // ... otras configuraciones
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 📅 Gestión de Fechas

### DatePicker Configuration

```typescript
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd/MM/yyyy"
      locale="es"
    />
  );
}
```

## 🌐 Despliegue

### Build de Producción

```bash
npm run build
```

### Servicios de Hosting

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: build
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en CI
npm test -- --ci --silent
```

## 🔧 Optimizaciones

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 👨‍💻 Autor

**Enrique B. (Yop007N)**
- GitHub: [@Yop007N](https://github.com/Yop007N)
- Especialización: Frontend Development y UI/UX

## 🔗 Enlaces Relacionados

- [React Documentation](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [React Hook Form](https://react-hook-form.com/)

---

🚀 Construyendo plataformas modernas y escalables