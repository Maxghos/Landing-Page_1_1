# JORKEV — Portafolio de sofás

Landing page en español, adaptable a móviles, con las imágenes y el logo proporcionados. HTML, CSS y JavaScript sin dependencias ni compilación.

## Ejecutar

Desde `/workspace/Landing-Page_1_1`:

```sh
npm start
```

Requiere Python 3. El servidor de desarrollo usa el puerto 3000. Para comprobar la sintaxis de JavaScript: `npm run check`.

## Personalizar el contacto

En `app.js`, completa `CONTACT.whatsapp` con el número real, incluido el código de país, sin `+`, espacios ni guiones. Por ejemplo, el formato es `CODIGOPAISNUMERO`. Cuando esté configurado, el formulario abre WhatsApp con la consulta preparada; el visitante debe enviarla. Mientras esté vacío, permite preparar y copiar la consulta y explica que no se ha enviado. No almacena datos ni usa un backend.

## Contenido

- Modelos Bianco y Fullham, con galería ampliada y ficha original de medidas de Fullham.
- Siete trabajos del taller, filtrables por cantidad de cuerpos.
- Galería accesible mediante teclado: Escape para cerrar y flechas para navegar.
- Las fotografías originales están en `assets/`, sin modificar.
- Las fuentes opcionales DM Sans y Manrope se cargan desde Google Fonts. Hay fuentes locales de respaldo.

## Publicar

Puedes alojar `index.html`, `styles.css`, `app.js` y la carpeta `assets/` en cualquier alojamiento estático. No hay paso de build. Antes de publicar, confirma el número de contacto y los textos comerciales.
