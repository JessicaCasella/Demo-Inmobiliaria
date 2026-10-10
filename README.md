# Umbral — demo inmobiliaria

## Prueba de escritorio

Abrir `recorrido-escritorio.html` para comparar una propuesta a pantalla completa con la web actual. Conserva la fachada original y revela un ambiente ilustrado a través de su propia puerta, con una cámara continua y una llave ilustrada al final. Los cuatro controles inferiores permiten revisar cada momento del mockup. La prueba está separada de `index.html`.

Web informativa de una sola página, sin catálogo ni buscador, basada en el mockup aprobado. El recorrido conecta cuatro escenas: fachada, entrada, living y entrega de la llave. El scroll acerca la cámara, abre la puerta y revela el interior sin una transición vacía. Respeta la preferencia de movimiento reducido.

La entrada y el living comparten una sola escena y una línea de tiempo de GSAP/ScrollTrigger. El interior se encuentra detrás del marco; la puerta y la cámara se animan juntas. La respuesta al scroll tiene una interpolación de 0,85 segundos y conserva el scroll nativo. Las bibliotecas GSAP 3.13.0 están incluidas en `vendor` para no depender de un CDN al visitar la demo. Con movimiento reducido se muestra el recorrido estático.

## Cambiar contenido

Editar `textos.js`. El nombre y los textos son ilustrativos. Configurar `email` o `whatsapp` para activar el contacto real. No hay mensajes enviados ni formularios con datos guardados.

## Ver localmente

Desde esta carpeta: `python -m http.server 8080`. Abrir `http://localhost:8080`.

`index.html`, `styles.css`, `app.js` y `textos.js` están en la carpeta principal y se pueden servir directamente, sin instalación ni compilación. Las tipografías usan Google Fonts, con alternativas locales si no está disponible.

Las imágenes de `assets` se generaron con ImageGen usando el mockup como referencia. Son imágenes ilustrativas de la demo, no propiedades ofrecidas. Se solicitó conservar la fachada marfil con puerta verde, el interior luminoso y la mano entregando la llave, sin textos ni interfaces dentro de las imágenes.

Para preparar la copia de publicación en Sites, ejecutar `node build.mjs`. Genera `dist` a partir de los archivos de la raíz.
