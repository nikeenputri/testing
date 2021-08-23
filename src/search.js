module.exports = async (page) => {
    console.log('Mencari lagu its you')
    await page.waitForTimeout(2000)
    await page.waitForSelector('.search-container.style-scope.ytmusic-search-box')
    await page.click('.search-container.style-scope.ytmusic-search-box')
    await page.waitForTimeout(2000)
    await page.keyboard.type('its you');
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(3000)
    await page.reload({ waitUntil: 'networkidle2' })
    await page.screenshot({ path: './reports/searchpage.png', fullPage: true })
    console.log('Mencari lagu its you, berhasil!')

    console.log('Mainkan lagu its you')
    await page.waitForSelector('.yt-simple-endpoint.style-scope.yt-formatted-string')
    const results = await page.$$('.yt-simple-endpoint.style-scope.yt-formatted-string');
    await results[0].click()
    console.log('Mainkan lagu its you, berhasil!')
}