# UNINTER Cuernavaca — Portal Institucional

Mini-sección de **Oferta Educativa** construida con Vue 3 (frontend) y Node.js + Express (backend).

---

## Cómo correr el proyecto

### Requisitos

- Node.js ≥ 18

### Backend

```bash
cd backend
npm install
npm start
# → http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

> El frontend usa el proxy de Vite (`/api → http://localhost:3000`) en desarrollo.  
> No se necesita configurar CORS manualmente durante dev.

---

## 🗂 Estructura del proyecto

```
uninter-portal/
├── backend/
│   ├── server.js        # Servidor Express, endpoint /api/programs
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.js
        ├── style.css           # Variables CSS, paleta institucional
        ├── App.vue             # Componente raíz: hero, filtros, grid
        └── components/
            └── ProgramCard.vue # Tarjeta de programa académico
```

---

## 📡 API

### `GET /api/programs`

Devuelve el catálogo completo de programas académicos.

**Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Ingeniería en Sistemas Computacionales",
      "nivel": "Lic.",
      "modalidad": "En línea",
      "descripcion": "...",
      "duracion": "9 cuatrimestres",
    }
  ],
  "message": "Programas académicos obtenidos correctamente",
  "status": 200
}
```

Todos los endpoints siguen la misma envoltura `{ data, message, status }`.


---

## Preguntas técnicas

### ¿Qué cambiarías si este portal tuviera que soportar 50,000 visitas diarias?

**Backend:**

- Base de datos real (PostgreSQL / MySQL).
- Caching el endpoint TanStack Query reduciendo las llamadas HTTP, menos carga al backend.
- Rate limiting y protección DDoS usando librerías como `express-rate-limit` para evitar abuso, WAF frente al servidor.
- Utilizaría alguna arquitectura de diseño para mejorar la eficiencia.

**Frontend:**

- SSR o SSG con Nuxt 3 para rutas públicas como el catálogo de programas, el Server-Side Rendering mejora el SEO (clave para una universidad) y el First Contentful Paint.
- Code splitting y lazy loading de componentes que no son críticos al primer render.
- Utilizaría alguna arquitectura de diseño para reducir la carga de trabajo en componentes duplicados.

---

### ¿Qué agregarías antes de subir este código a producción?

- Variables de entorno, puerto del servidor, URL de la API y cualquier secreto deben vivir en `.env`, nunca hardcodeados.
- Implementación de .gitignore con todos los archicos que no deben ser públicos o no se deber subir al repositorio.
- Validación y sanitización de inputs con `Joi` o `zod` en el backend y frontend para todos los parámetros de entrada.
- Manejo de errores centralizado que capture errores no controlados y devuelva siempre la envoltura `{ data, message, status }` correcta.
- Logs estructurados con niveles (info/warn/error) para poder diagnosticar problemas en producción.
- Tests, al menos tests de integración del endpoint y un test de componente de Vue (con Vitest + Testing Library).
- HTTPS redirigir HTTP → HTTPS en el servidor/proxy reverse (nginx).
- CI/CD básico un pipeline de GitHub Actions que ejecute linting y tests antes de hacer merge a `main`.
- Documentación del API con Swagger o OpenAPI generado a partir del código.
- Implementaria un modelo de ramificación como git flow.

---

*Prueba Técnica — Web Master Vue 3 + Node.js · UNINTER Cuernavaca*
