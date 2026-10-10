# Umbral — demo inmobiliaria

Web informativa de una sola página, sin catálogo ni buscador, basada en el mockup aprobado. El recorrido conecta cuatro escenas: fachada, entrada, living y entrega de la llave. El scroll acerca la cámara, abre la puerta y revela el interior sin una transición vacía. Respeta la preferencia de movimiento reducido.

## Cambiar contenido

Editar `textos.js`. El nombre y los textos son ilustrativos. Configurar `email` o `whatsapp` para activar el contacto real. No hay mensajes enviados ni formularios con datos guardados.

## Ver localmente

Desde esta carpeta: `python -m http.server 8080`. Abrir `http://localhost:8080`.

`index.html`, `styles.css`, `app.js` y `textos.js` están en la carpeta principal y se pueden servir directamente, sin instalación ni compilación. Las tipografías usan Google Fonts, con alternativas locales si no está disponible.

Las imágenes de `assets` se generaron con ImageGen usando el mockup como referencia. Son imágenes ilustrativas de la demo, no propiedades ofrecidas. Se solicitó conservar la fachada marfil con puerta verde, el interior luminoso y la mano entregando la llave, sin textos ni interfaces dentro de las imágenes.

Para preparar la copia de publicación en Sites, ejecutar `node build.mjs`. Genera `dist` a partir de los archivos de la raíz.
