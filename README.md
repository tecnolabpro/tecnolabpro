# ⬡ TecnoLab Pro

> Plataforma de Inteligencia Artificial, herramientas digitales y educación tecnológica.

---

## 📁 Estructura del proyecto

```
tecnolabpro/
├── index.html      ← Página principal (toda la web)
├── style.css       ← Estilos (diseño futurista oscuro)
├── script.js       ← Interacciones y animaciones
├── vercel.json     ← Configuración de Vercel (caché, headers, redirects)
├── robots.txt      ← Instrucciones para buscadores
├── sitemap.xml     ← Mapa del sitio para SEO
├── .gitignore      ← Archivos ignorados por Git
└── README.md       ← Este archivo
```

---

## 🚀 Despliegue en Vercel (GRATIS) — Guía paso a paso

### OPCIÓN A — Desde GitHub (recomendada ✅)

Esta es la forma más profesional. Cada vez que subas cambios a GitHub, Vercel actualiza tu web **automáticamente**.

#### Paso 1 — Crea una cuenta en GitHub
1. Ve a **https://github.com** y crea una cuenta gratuita (si no tienes).
2. Haz clic en **"New repository"** (botón verde `+`).
3. Nómbralo `tecnolabpro` (o como prefieras).
4. Márcalo como **Public** y haz clic en **"Create repository"**.

#### Paso 2 — Instala Git en tu computadora
- **Windows:** descarga desde https://git-scm.com/download/win
- **Mac:** abre Terminal y escribe `git --version` (se instala automáticamente)
- **Linux:** `sudo apt install git`

#### Paso 3 — Sube el proyecto a GitHub

Abre la terminal (o símbolo del sistema) en la carpeta del proyecto y ejecuta estos comandos **uno por uno**:

```bash
# Inicializar Git en la carpeta
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "feat: lanzamiento inicial TecnoLab Pro"

# Conectar con tu repositorio de GitHub
# (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/tecnolabpro.git

# Subir los archivos
git branch -M main
git push -u origin main
```

#### Paso 4 — Conecta con Vercel
1. Ve a **https://vercel.com** y crea una cuenta gratuita.
   - Recomendado: regístrate con **"Continue with GitHub"** para conectar en un clic.
2. En el dashboard de Vercel, haz clic en **"Add New… → Project"**.
3. Vercel mostrará tus repositorios de GitHub. Haz clic en **"Import"** junto a `tecnolabpro`.
4. En la pantalla de configuración:
   - **Framework Preset:** selecciona `Other`
   - **Root Directory:** déjalo en `.` (raíz)
   - **Build Command:** déjalo **en blanco**
   - **Output Directory:** déjalo **en blanco** (o pon `.`)
5. Haz clic en **"Deploy"** 🚀

¡En menos de 60 segundos tu web estará en línea con una URL como:
`https://tecnolabpro.vercel.app`

---

### OPCIÓN B — Subida directa (sin Git)

Si no quieres usar Git, puedes subir los archivos directamente:

1. Ve a **https://vercel.com** y crea una cuenta gratuita.
2. En el dashboard, haz clic en **"Add New… → Project"**.
3. Selecciona **"Deploy from your computer"** (arrastra la carpeta).
4. Arrastra toda la carpeta `tecnolabpro` al área que aparece.
5. Haz clic en **"Deploy"**.

⚠️ Con esta opción, cada actualización requiere volver a subir manualmente.

---

## 🌐 Conectar tu dominio propio (opcional)

Si tienes un dominio como `tecnolabpro.com`:

1. En el dashboard de Vercel, entra a tu proyecto.
2. Ve a **Settings → Domains**.
3. Escribe tu dominio y haz clic en **"Add"**.
4. Vercel te dará dos registros DNS que debes añadir en tu proveedor de dominio:
   - Un registro **A** apuntando a `76.76.21.21`
   - Un registro **CNAME** de `www` apuntando a `cname.vercel-dns.com`
5. En 24-48 horas el dominio estará activo con **HTTPS automático y gratuito**.

---

## ✏️ Personalización rápida

### Cambiar el enlace de afiliado Hotmart
Busca en `index.html`:
```html
href="#TU-ENLACE-HOTMART-AQUI"
```
Reemplaza `#TU-ENLACE-HOTMART-AQUI` con tu URL real de Hotmart.

### Cambiar el dominio en SEO
Busca y reemplaza `https://tecnolabpro.com` en `index.html` con tu dominio real.
También actualiza `sitemap.xml` con tu dominio.

### Cambiar los enlaces de las herramientas
Busca en `index.html` los botones `"Más información"` de cada herramienta y reemplaza `href="#"` con los URLs de afiliado o referencia correspondientes.

### Añadir tu email de contacto
Busca en `index.html`:
```html
hola@tecnolabpro.com
```
Reemplázalo con tu email real.

---

## 🔄 Actualizar la web después de publicar

Con la **Opción A (GitHub)**, cada vez que hagas cambios:

```bash
git add .
git commit -m "actualización: descripción de los cambios"
git push
```

Vercel detectará el push y redesplegará automáticamente en ~30 segundos.

---

## 📊 Plan gratuito de Vercel — ¿Qué incluye?

| Característica        | Plan gratuito (Hobby) |
|-----------------------|-----------------------|
| Proyectos             | Ilimitados            |
| Ancho de banda        | 100 GB / mes          |
| Despliegues           | Ilimitados            |
| HTTPS automático      | ✅ Incluido           |
| Dominio propio        | ✅ Incluido           |
| CDN global            | ✅ Incluido           |
| Preview URLs          | ✅ En cada commit     |
| Soporte               | Comunidad             |

> El plan gratuito es más que suficiente para un sitio web de este tipo con miles de visitas mensuales.

---

## 🛠️ Tecnologías utilizadas

- HTML5 semántico
- CSS3 (variables, grid, flexbox, animaciones)
- JavaScript ES6+ (sin frameworks)
- Canvas API (partículas animadas)
- IntersectionObserver API (animaciones scroll)

---

## 📄 Licencia

Proyecto privado — todos los derechos reservados por TecnoLab Pro.
