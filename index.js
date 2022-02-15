const puppeteer = require("puppeteer");

async function nice(){
	console.log("Get today's wordle answer")
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.nytimes.com/games/wordle/index.html");
	const localStorageData = await page.evaluate(()=>{
		var newObj = localStorage.getItem("nyt-wordle-state");
		var gg = JSON.parse(newObj);
		return gg.solution;
	});
	console.log('\x1b[32m%s\x1b[0m', localStorageData);
	await browser.close()
}

nice()
