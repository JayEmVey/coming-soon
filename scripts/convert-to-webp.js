const path = require('path');
const fs = require('fs');

// Determine target base dir: source images or dist images
const args = process.argv.slice(2);
const useDist = args.includes('--dist');
const BASE_DIR = useDist ? path.resolve(__dirname, '..', 'dist', 'images') : path.resolve(__dirname, '..', 'images');

async function ensureSharp() {
  try {
    return require('sharp');
  } catch (err) {
    console.error('\nMissing dependency: `sharp`. Run `npm install` to install devDependencies.\n');
    throw err;
  }
}

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walkDir(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

async function convertFile(sharp, input) {
  const extMatch = input.match(/\.(png|jpe?g)$/i);
  if (!extMatch) return;
  const out = input.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    // Skip conversion if destination exists and is newer
    if (fs.existsSync(out)) {
      const inStat = fs.statSync(input);
      const outStat = fs.statSync(out);
      if (outStat.mtimeMs >= inStat.mtimeMs) {
        console.log('Up-to-date, skipping', path.relative(process.cwd(), out));
        return;
      }
    }

    // Maximum quality WebP conversion
    // quality: 100 = highest quality (lossless-like)
    // alphaQuality: 100 = preserve alpha channel quality
    // lossless: false = lossy compression at highest quality
    // effort: 6 = maximum compression effort (slow but best results)
    await sharp(input)
      .webp({
        quality: 100,
        alphaQuality: 100,
        effort: 6,
        nearLossless: true
      })
      .toFile(out);
    console.log('Created (max quality)', path.relative(process.cwd(), out));
  } catch (err) {
    console.error('Failed to convert', input, err && err.message);
  }
}

(async () => {
  let sharp;
  try {
    sharp = await ensureSharp();
  } catch (e) {
    process.exit(1);
  }

  const files = walkDir(BASE_DIR).filter(f => /\.(png|jpe?g)$/i.test(f));
  if (!files.length) {
    console.log('No PNG/JPG files found in', BASE_DIR);
    return;
  }

  for (const f of files) {
    await convertFile(sharp, f);
  }
})();
