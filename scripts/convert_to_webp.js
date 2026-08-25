import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_IMG_DIR = path.resolve('public/img');
const PRODUCTS_JSON_PATH = path.resolve('src/data/products.json');
const HOME_JSX_PATH = path.resolve('src/pages/Home.jsx');

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

async function convertImages() {
  console.log('--- Starting Image Conversion to WebP ---');
  const allFiles = getFilesRecursively(PUBLIC_IMG_DIR);
  
  const convertibleExtensions = ['.jpg', '.jpeg', '.png'];
  let convertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (convertibleExtensions.includes(ext)) {
      const webpPath = filePath.substring(0, filePath.length - ext.length) + '.webp';
      
      try {
        await sharp(filePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        
        if (filePath.toLowerCase() !== webpPath.toLowerCase()) {
          fs.unlinkSync(filePath);
        }
        convertedCount++;
        if (convertedCount % 50 === 0) {
          console.log(`Converted ${convertedCount} images...`);
        }
      } catch (err) {
        console.error(`Error converting ${filePath}:`, err.message);
        errorCount++;
      }
    } else {
      skippedCount++;
    }
  }

  console.log(`Conversion Summary: ${convertedCount} converted, ${skippedCount} skipped, ${errorCount} errors.`);
}

function updateProductsJson() {
  console.log('--- Updating src/data/products.json ---');
  if (!fs.existsSync(PRODUCTS_JSON_PATH)) {
    console.log('products.json not found, skipping.');
    return;
  }

  let content = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
  const updatedContent = content
    .replace(/\.(jpg|jpeg|png)(?=")/gi, '.webp');

  fs.writeFileSync(PRODUCTS_JSON_PATH, updatedContent, 'utf-8');
  console.log('products.json updated successfully!');
}

function updateHomeJsx() {
  console.log('--- Updating src/pages/Home.jsx ---');
  if (!fs.existsSync(HOME_JSX_PATH)) {
    console.log('Home.jsx not found, skipping.');
    return;
  }

  let content = fs.readFileSync(HOME_JSX_PATH, 'utf-8');
  const updatedContent = content
    .replace(/\/img\/front-page\/([a-zA-Z0-9_-]+)\.(jpg|jpeg|png)/gi, '/img/front-page/$1.webp');

  fs.writeFileSync(HOME_JSX_PATH, updatedContent, 'utf-8');
  console.log('Home.jsx updated successfully!');
}

async function run() {
  await convertImages();
  updateProductsJson();
  updateHomeJsx();
  console.log('=== All Done! ===');
}

run();
