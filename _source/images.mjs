// Generates responsive AVIF + JPEG variants from _source/img into assets/img.
// Usage: cd _source && npm install && npm run images
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = (p) => path.join(repo, '_source/img', p);
const out = path.join(repo, 'assets/img');
fs.mkdirSync(out, { recursive: true });

const jobs = [
  { in: 'header.jpg', name: 'hero', widths: [800, 1280, 1920] },
  { in: 'coaching/speed_1.jpg', name: 'speed', widths: [480, 800, 1300] },
  { in: 'coaching/athletik_training_1.jpg', name: 'athletik', widths: [480, 800, 1300] },
  { in: 'coaching/ernaehrung_1.jpg', name: 'ernaehrung', widths: [480, 800, 1300] },
  { in: 'coaching/bootcamp_1.jpg', name: 'bootcamp', widths: [480, 800, 1300] },
  { in: 'coaching/athletik_training_3.jpg', name: 'methode', widths: [800, 1300] },
];

let before = 0, after = 0;
for (const j of jobs) {
  before += fs.statSync(src(j.in)).size;
  for (const w of j.widths) {
    const base = sharp(src(j.in)).rotate().resize({ width: w, withoutEnlargement: true });
    const a = path.join(out, `${j.name}-${w}.avif`);
    const jp = path.join(out, `${j.name}-${w}.jpg`);
    await base.clone().avif({ quality: 50, effort: 6 }).toFile(a);
    await base.clone().jpeg({ quality: 72, mozjpeg: true, progressive: true }).toFile(jp);
    after += fs.statSync(a).size;
    console.log(`${j.name}-${w}: avif ${(fs.statSync(a).size / 1024).toFixed(0)}K jpg ${(fs.statSync(jp).size / 1024).toFixed(0)}K`);
  }
}

// Social preview image, 1200x630.
await sharp(src('header.jpg')).resize(1200, 630, { fit: 'cover', position: 'right' })
  .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, 'og-image.jpg'));

// Touch icon from the SVG favicon.
await sharp(path.join(repo, 'favicon.svg'), { density: 300 }).resize(180, 180)
  .png().toFile(path.join(repo, 'apple-touch-icon.png'));

console.log(`originals used: ${(before / 1024).toFixed(0)}K, all avif variants: ${(after / 1024).toFixed(0)}K`);
