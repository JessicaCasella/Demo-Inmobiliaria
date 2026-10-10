import { mkdirSync, copyFileSync, cpSync } from 'node:fs';

// Los archivos editables viven en la raíz; dist es solo la copia para publicar.
mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'textos.js', 'recorrido-escritorio.html', 'recorrido.css', 'recorrido.js']) {
  copyFileSync(file, `dist/${file}`);
}
mkdirSync('dist/assets', { recursive: true });
cpSync('vendor', 'dist/vendor', { recursive: true });
for (const file of ['casa', 'puerta', 'interior', 'llave', 'hoja-puerta']) {
  copyFileSync(`assets/${file}.webp`, `dist/assets/${file}.webp`);
}
