# Guía de Despliegue Altomé Ecommerce 🚀

Este documento te guía para subir el sitio a internet manteniendo funcionando el **Carrito** y los **Pagos con Mercado Pago**.

## 1. Despliegue del Backend (Pagos)
El servidor (`server/index.js`) procesa los pagos. Debe vivir en la nube.

**Opción recomendada: Render (Gratis)**
1. Crea una cuenta en [Render.com](https://render.com).
2. Haz clic en **New +** > **Web Service**.
3. Conecta tu repositorio de GitHub.
4. En el campo **Root Directory**, pon `server`.
5. En **Runtime**, selecciona `Node`.
6. En **Environment Variables**, agrega:
   - `MP_ACCESS_TOKEN`: Tu token de Mercado Pago.
7. Al terminar, Render te dará una URL (ej: `https://altome-api.onrender.com`). **Cópiala**.

## 2. Despliegue del Frontend (Visual)
GitHub Pages servirá la parte visual y el carrito.

1. Abre tu carpeta del proyecto.
2. Abre el archivo `.env` (si no existe, créalo en la raíz) y pon:
   `VITE_API_BASE_URL=https://tu-url-de-render.onrender.com`
3. Ejecuta en tu terminal: `npm run build`.
4. Sube el contenido de la carpeta `dist/` a tu repositorio de GitHub en la rama `gh-pages` o configura GitHub Pages para que use la carpeta `docs` (renombrando `dist` a `docs`).

## 3. Verificación
- Entra a tu URL de GitHub Pages.
- Agrega dulces al carrito.
- Haz clic en **Pagar**.
- Deberías ser redirigido a Mercado Pago con el total correcto.

¡Felicidades! Tienes un e-commerce real operando en la nube. 💎🥂
