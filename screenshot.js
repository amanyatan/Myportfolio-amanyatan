const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('https://cloud-hqdu.vercel.app/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'public/cloud-project-new.png' });
  await browser.close();
  console.log('Screenshot saved to public/cloud-project-new.png');
})();
