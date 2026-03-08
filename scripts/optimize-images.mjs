/**
 * Compress portfolio images in-place.
 * - JPG/PNG → optimized JPG (quality 80, max 1600px wide)
 * - Preserves original filenames and extensions
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join } from 'path';

const DIR = 'public/images/portfolio';
const MAX_WIDTH = 1600;
const QUALITY = 80;

const files = await readdir(DIR);
const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

console.log(`Found ${images.length} images to optimize...`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const filePath = join(DIR, file);
  const before = (await stat(filePath)).size;
  totalBefore += before;

  const tmpPath = filePath + '.tmp';
  const ext = file.split('.').pop().toLowerCase();

  try {
    let pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

    if (ext === 'png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    await pipeline.toFile(tmpPath);

    const after = (await stat(tmpPath)).size;
    totalAfter += after;

    // Replace original with optimized
    await unlink(filePath);
    await rename(tmpPath, filePath);

    const saved = ((1 - after / before) * 100).toFixed(0);
    if (saved > 5) {
      console.log(`  ${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${saved}%)`);
    }
  } catch (err) {
    console.error(`  ERROR ${file}: ${err.message}`);
    try { await unlink(tmpPath); } catch {}
  }
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
