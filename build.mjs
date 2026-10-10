import { mkdirSync, copyFileSync } from 'node:fs';

// Los archivos editables viven en la raíz; dist es solo la copia para publicar.
mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'textos.js']) {
  copyFileSync(file, `dist/${file}`);
}
mkdirSync('dist/assets', { recursive: true });
for (const file of ['casa', 'puerta', 'interior', 'llave', 'hoja-puerta']) {
  copyFileSync(`assets/${file}.webp`, `dist/assets/${file}.webp`);
}
