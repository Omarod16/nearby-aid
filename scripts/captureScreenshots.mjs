import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:/Users/PCLO/.gemini/antigravity/brain/66609965-fcce-4f6c-98a5-1a13dda61c31';

async function capture() {
  console.log('Launching browser with executable:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Desktop Homepage (1440 x 900)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(outDir, 'desktop_homepage.png') });
    await page.close();
  }

  // 2. Mobile Homepage (390 x 844)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(outDir, 'mobile_homepage.png') });
    await page.close();
  }

  // 3. Desktop Results View (1440 x 900)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#postcode-search-input');
    await page.type('#postcode-search-input', 'SW1A 1AA');
    const searchBtn = await page.$('button[type="submit"]');
    if (searchBtn) await searchBtn.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, 'desktop_results.png') });
    await page.close();
  }

  // 4. Mobile Results View — List-First (390 x 844)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#postcode-search-input');
    await page.type('#postcode-search-input', 'SW1A 1AA');
    const searchBtn = await page.$('button[type="submit"]');
    if (searchBtn) await searchBtn.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, 'mobile_results.png') });

    // 5. Mobile Results View — Map Toggled
    // Click "View Map" button
    const mapToggleBtn = await page.$('button[aria-label="Switch to map view"]');
    if (mapToggleBtn) {
      await mapToggleBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({ path: path.join(outDir, 'mobile_map_view.png') });
    }
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
