const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://tr.wikipedia.org/wiki/Galatasaray_SK');
    await page.screenshot({ path: 'wiki_gs.png' });


    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(5000);
    console.log("Waited 5s");

    const result = await page.evaluate(() => {

        let headingFromWeb = document.querySelectorAll(".mw-headline");
        const headingList = [...headingFromWeb];
        return headingList.map(h => h.innerText);
    })

    //await window.scrollTo(0, 500);

    await delay(5000);
    console.log("Waited an additional 5s");

    console.log(result);

    await browser.close();
})();