const app = require('./app')
const testCase = require('./src')

const randomUseragent = require('random-useragent'); // Random user agent untuk handling google captcha
console.log(randomUseragent.getRandom(function (ua) {
    return ua.browserName === 'Chrome';
}))

const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

const start = async () => {
    try {
        const browser = await app.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized',
                '--allow-external-pages',
                '--allow-third-party-modules',
                '--data-reduction-proxy-http-proxies',
                '--no-sandbox'
            ]
        })
        const context = await browser.createIncognitoBrowserContext()
        const page = await context.newPage()
        const recorder = new PuppeteerScreenRecorder(page);
        await recorder.start('./reports/video/record.mp4')

        await page.setUserAgent(randomUseragent.getRandom(function (ua) {
            return ua.browserName === 'Chrome' && parseFloat(ua.browserVersion) >= 20;
        }))
        console.log('Membuka youtube music')
        await page.goto('https://music.youtube.com', { waitUntil: 'networkidle2' })
        // await page.setViewport({ width: 1920, height: 1080 })
        console.log('Membuka youtube music, berhasil !')
        await page.screenshot({ path: './reports/homepage.png', fullPage: true })

        await testCase.login(page)
        await testCase.openPage(page)
        await testCase.create(page)
        await testCase.edit(page)
        await testCase.remove(page)
        await testCase.search(page)
        await testCase.addToPlaylist(page)

        console.log('Completed and lets sing together!')
        await recorder.stop();
        // await browser.close() // uncomment jika ingin langsung menutup browser setelah testing
    } catch (err) {
        console.log(`'Puppeteer Error Detencted -> ${err}'`)
    }
}

start()