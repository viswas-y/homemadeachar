import { spawn, execSync } from 'child_process';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Vite preview server...');
  const server = await preview({
    preview: { port: 3000, host: '127.0.0.1' }
  });
  console.log('✅ Server running on http://127.0.0.1:3000');

  const targets = [
    {
      name: 'desktop-home',
      url: 'http://127.0.0.1:3000/',
      width: 1280,
      height: 900
    },
    {
      name: 'mobile-home',
      url: 'http://127.0.0.1:3000/',
      width: 390,
      height: 844
    },
    {
      name: 'desktop-product',
      url: 'http://127.0.0.1:3000/product/manga-achar',
      width: 1280,
      height: 900
    },
    {
      name: 'mobile-product',
      url: 'http://127.0.0.1:3000/product/manga-achar',
      width: 390,
      height: 844
    },
    {
      name: 'desktop-cart',
      url: 'http://127.0.0.1:3000/cart',
      width: 1280,
      height: 900
    }
  ];

  for (const t of targets) {
    const outFile = path.join(outDir, `${t.name}.png`);
    const cmd = `"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --window-size=${t.width},${t.height} --screenshot="${outFile}" "${t.url}"`;
    console.log(`📸 Capturing ${t.name} (${t.width}x${t.height})...`);
    try {
      execSync(cmd, { stdio: 'pipe', timeout: 15000 });
      if (fs.existsSync(outFile)) {
        const stats = fs.statSync(outFile);
        console.log(`   ✅ Saved ${t.name}.png (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    } catch (e) {
      console.error(`   ⚠️ Failed to capture ${t.name}:`, e.message);
    }
  }

  console.log('🛑 Closing preview server...');
  await server.httpServer.close();
  console.log('🎉 Visual checks completed!');
}

run().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

