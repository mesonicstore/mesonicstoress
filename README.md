# Mesonic Store

Landing responsive en español para productos gaming y suscripciones de streaming. HTML, CSS y JavaScript sin dependencias de ejecución ni framework.

## Vista local

Con Node.js instalado:

```sh
node scripts/serve.mjs
```

Abrir `http://127.0.0.1:4173`. El servidor sirve únicamente los archivos públicos de la landing. Para cambiar el puerto, definir `PORT`.

## Construcción

```sh
node --check app.js
node scripts/build.mjs
```

La carpeta `dist/` contiene el sitio estático listo para hosting. También se puede abrir `index.html` directamente; los enlaces a WhatsApp funcionan sin un servidor.

## Personalización

- **Productos y mensajes:** editar las tarjetas de `index.html`. El enlace debe usar `https://wa.me/56931806468?text=...`, con el mensaje codificado como componente de URL. El número incluye el código de Chile y no lleva `+` ni espacios.
- **Categorías:** el atributo `data-category` contiene una o más categorías separadas por espacios. Los filtros y el contador se gestionan en `app.js`.
- **Precios:** se consultan por WhatsApp. No se publican los valores del catálogo antiguo porque no fueron confirmados para esta versión.
- **Diseño:** colores, tamaños y puntos de adaptación están en `styles.css`.
- **Portada:** `assets/gaming-hero.webp`, creada con la herramienta integrada de generación de imágenes. El prompt está en `assets/hero-prompt.txt`.
- **Imágenes del catálogo:** Fortnite y FIFA 23 reutilizan imágenes del historial del repositorio y se optimizan a WebP.
- **Contacto general:** botones independientes en cabecera, portada, sección de contacto, pie y botón flotante.

Las consultas abren WhatsApp con el texto preparado. El visitante revisa y envía el mensaje desde WhatsApp. La página no almacena datos personales ni procesa pagos.

La tipografía usa Google Fonts con alternativas locales. El catálogo y los enlaces siguen disponibles si no se carga JavaScript; los filtros y el menú móvil requieren JavaScript.

## Publicación

La identidad de la vista privada de Sites está en `.openai/hosting.json`. El código se prepara para publicar en una copia separada `.sites-publish/`, excluida de Git, para conservar el estado del repositorio de trabajo.
