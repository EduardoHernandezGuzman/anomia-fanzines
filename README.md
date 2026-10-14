# Anomia Fanzines

Sitio web de **Anomia Fanzines**, editorial independiente dedicada a fanzines de crítica y contracultura: la caída de los viejos paradigmas en forma de publicaciones mensuales.

Demo: [anomia-fanzines.vercel.app](https://anomia-fanzines.vercel.app/)

## Stack

- **React 18** + **Vite 7**
- **React Router 7** (modo declarativo)
- **Tailwind CSS 3**
- **EmailJS** (`@emailjs/browser`) para el formulario de contacto
- **Vercel** como plataforma de despliegue

## Estructura del proyecto

```
src/
├── components/   UI (Header, Hero, Navbar, FanzineCard, AgeVerification, ErrorBoundary)
├── data/         Catálogo de fanzines (fanzines.js)
├── hooks/        Lógica reutilizable (useFanzineFilter, useAgeVerification)
├── lib/          Utilidades transversales (env.js: variables de entorno)
├── pages/        Vistas de la aplicación (Home, Products, About, Contact, Error)
└── services/     Integraciones externas (email.js: EmailJS)
```

## Requisitos

- Node.js `>=22.12.0` (ver campo `engines` en `package.json`)

## Puesta en marcha

```bash
npm install
cp .env.example .env   # rellena las claves de EmailJS
npm run dev
```

## Variables de entorno

| Variable                   | Descripción                     |
| -------------------------- | ------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | ID del servicio de EmailJS      |
| `VITE_EMAILJS_TEMPLATE_ID` | ID de la plantilla de EmailJS   |
| `VITE_EMAILJS_USER_ID`     | Public key de la cuenta EmailJS |

Notas de seguridad:

- Las variables `VITE_*` se embeben en el bundle y son **públicas por diseño**. Nunca añadas claves privadas.
- Restringe el uso de la public key en el panel de EmailJS (dominios permitidos) y revisa periódicamente que el servicio de correo siga conectado.
- Si faltan variables, el formulario muestra un error de configuración en lugar de fallar en silencio.

## Scripts

| Comando                | Descripción                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Servidor de desarrollo           |
| `npm run build`        | Build de producción              |
| `npm run preview`      | Sirve el build de producción     |
| `npm run lint`         | ESLint 9 (flat config)           |
| `npm run format`       | Formatea con Prettier            |
| `npm run format:check` | Verifica el formato sin escribir |

## Calidad y CI

- **ESLint** (reglas de React, hooks y refresh) + **Prettier**, aplicados en todo el código.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, formato, auditoría de dependencias de producción y build en cada push/PR.
- **Dependabot** (`.github/dependabot.yml`): actualizaciones semanales de npm y de las GitHub Actions.

## Seguridad

- `vercel.json` aplica **CSP** y cabeceras de seguridad (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) y rewrite SPA para el enrutado del cliente.
- El formulario de contacto incluye validación de campos, longitudes máximas, honeypot anti-spam y botón deshabilitado durante el envío.
- Verificación de edad (+18) persistida en `sessionStorage` para la sección de tienda.

## Contacto

- GitHub: [Eduardo Hernandez Guzmán](https://github.com/EduardoHernandezGuzman)
