# Umbral — demo inmobiliaria

Web informativa de una sola página, sin catálogo ni buscador. En escritorio, la casa acompaña el recorrido y da paso a una llave. En celular, una escena independiente abre la puerta y acerca la vista hacia el interior; después deja todo el espacio a los textos. La llave aparece junto al contacto. Respeta la preferencia de movimiento reducido.

## Cambiar contenido

Editar `textos.js`. El nombre y los textos son ilustrativos. Configurar `email` o `whatsapp` para activar el contacto real. No hay mensajes enviados ni formularios con datos guardados.

## Ver localmente

Desde esta carpeta: `python -m http.server 8080`. Abrir `http://localhost:8080`.

`index.html`, `styles.css`, `app.js` y `textos.js` están en la carpeta principal y se pueden servir directamente, sin instalación ni compilación. Las tipografías usan Google Fonts, con alternativas locales si no está disponible.

Para preparar la copia de publicación en Sites, ejecutar `node build.mjs`. Genera `dist` a partir de los archivos de la raíz.
