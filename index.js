const puppeteer = require('puppeteer');

async function nice() {
  console.log("Get today's wordle answer");
  console.time('timeToExecute');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Intercept requests from url
  await page.setRequestInterception(true);

  // If the page makes a request to a resource type of image, stylesheet or font then abort that request (we block the request)
  page.on('request', (req) => {
    if (
      req.resourceType() === 'image' ||
      req.resourceType() === 'stylesheet' ||
      req.resourceType() === 'font'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('https://www.nytimes.com/games/wordle/index.html');

  // Fetch and parse the wordle answer
  const localStorageData = await page.evaluate(() => {
    var newObj = localStorage.getItem('nyt-wordle-state');
    var gg = JSON.parse(newObj);
    return gg.solution;
  });

  console.log('\x1b[32m%s\x1b[0m', localStorageData);
  console.timeEnd('timeToExecute');
  await browser.close();
}

nice();
