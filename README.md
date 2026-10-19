# Anomia Fanzines

Sitio web de **Anomia Fanzines**, editorial independiente dedicada a fanzines de crítica y contracultura: la caída de los viejos paradigmas en forma de publicaciones mensuales.

Demo: [anomia-fanzines.vercel.app](https://anomia-fanzines.vercel.app/)

## Stack

- **React 19** + **Vite 8**
- **React Router 7** (modo declarativo)
- **Tailwind CSS 4** (configuración CSS-first)
- **EmailJS** (`@emailjs/browser`) para el formulario de contacto
- **Vitest** + **Testing Library** para los tests
- **Vercel** como plataforma de despliegue

## Estructura del proyecto

```
assets/portadas/  Portadas originales en JPG (fuente para los WebP)
public/img/       Assets estáticos (icono y portadas WebP generadas)
scripts/          Scripts de mantenimiento (optimize-images.mjs)
src/
├── components/   UI (Header, Hero, Navbar, FanzineCard, AgeVerification, ErrorBoundary)
├── data/         Catálogo de fanzines (fanzines.js)
├── hooks/        Lógica reutilizable (useFanzineFilter, useAgeVerification)
├── lib/          Utilidades transversales (env.js: variables de entorno)
├── pages/        Vistas de la aplicación (Home, Products, About, Contact, Error)
├── services/     Integraciones externas (email.js: EmailJS)
└── test/         Configuración de los tests
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

## Añadir un fanzine nuevo

1. Copia la portada a `assets/portadas/` (JPG o PNG; se recomienda ~1200 px de ancho).
2. Añade la entrada en `src/data/fanzines.js` usando la ruta `.webp`:
   `imagen: "/img/portadas/027.webp"`.
3. Commit y push. Al arrancar `npm run dev` o `npm run build` (y en el deploy de Vercel) se genera automáticamente el WebP optimizado.

Las portadas WebP (`public/img/portadas/`) se generan en local y no se versionan. El script es incremental: solo convierte las imágenes nuevas o modificadas, elimina los WebP huérfanos y falla en CI (`optimize:images:check`) si falta alguna conversión.

## Scripts

| Comando                         | Descripción                                |
| ------------------------------- | ------------------------------------------ |
| `npm run dev`                   | Servidor de desarrollo (optimiza imágenes) |
| `npm run build`                 | Build de producción (optimiza imágenes)    |
| `npm run preview`               | Sirve el build de producción               |
| `npm run optimize:images`       | Genera los WebP desde `assets/portadas/`   |
| `npm run optimize:images:check` | Verifica que los WebP estén al día         |
| `npm run lint`                  | ESLint 9 (flat config)                     |
| `npm run format`                | Formatea con Prettier                      |
| `npm run format:check`          | Verifica el formato sin escribir           |
| `npm test`                      | Ejecuta los tests una vez                  |
| `npm run test:watch`            | Tests en modo watch                        |
| `npm run test:coverage`         | Tests con informe de cobertura             |

## Calidad y CI

- **ESLint** (reglas de React, hooks y refresh) + **Prettier**, aplicados en todo el código.
- **Vitest + Testing Library** (jsdom): hooks, formulario de contacto, verificación de edad, enrutado y datos.
- **GitHub Actions** (`.github/workflows/ci.yml`): imágenes optimizadas, lint, formato, tests, auditoría de dependencias de producción y build en cada push/PR.
- **Dependabot** (`.github/dependabot.yml`): actualizaciones semanales de npm y de las GitHub Actions.

## Seguridad

- `vercel.json` aplica **CSP** y cabeceras de seguridad (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) y rewrite SPA para el enrutado del cliente.
- El formulario de contacto incluye validación de campos, longitudes máximas, honeypot anti-spam y botón deshabilitado durante el envío.
- Verificación de edad (+18) persistida en `sessionStorage` para la sección de tienda.

## Contacto

- GitHub: [Eduardo Hernandez Guzmán](https://github.com/EduardoHernandezGuzman)

## Licencia

El **código** de este repositorio se distribuye bajo la licencia [MIT](LICENSE).

Las **portadas, textos e imágenes de los fanzines** (`assets/portadas/` y `public/img/`) son propiedad de Anomia Fanzines y quedan fuera de la licencia MIT: no se permite su reproducción ni reutilización sin autorización expresa.
