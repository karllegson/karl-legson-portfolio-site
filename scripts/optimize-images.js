import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = path.join(__dirname, '../public/images/profile-photo@2x.webp');
const outputPath = path.join(__dirname, '../public/images/profile-photo@2x.optimized.webp');

async function optimizeProfilePhoto() {
  try {
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6,
        lossless: false
      })
      .toFile(outputPath);

    console.log('✅ Profile photo optimized successfully!');
  } catch (error) {
    console.error('❌ Error optimizing profile photo:', error);
  }
}

optimizeProfilePhoto(); 