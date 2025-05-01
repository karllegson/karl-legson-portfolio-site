import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicons() {
  const svgPath = join(__dirname, '../public/favicon.svg');
  const publicDir = join(__dirname, '../public');

  try {
    const svgBuffer = await fs.readFile(svgPath);

    // Generate different sizes
    const sizes = {
      'favicon-16x16.png': 16,
      'favicon-32x32.png': 32,
      'apple-touch-icon.png': 180
    };

    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(join(publicDir, filename));
      
      console.log(`Generated ${filename}`);
    }

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 