const login = async (page) => {
    console.log('Login google account')
    await page.click('a.sign-in-link')
    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    await page.waitForSelector('input[type="email"]')
    await page.focus('input[type="email"]')
    await page.type('input[type="email"]', 'akuntestingqa@gmail.com')

    await page.waitForSelector('#identifierNext')
    await page.click('#identifierNext')

    await page.waitForTimeout(5000)

    await page.waitForSelector('input[type="password"]')
    await page.focus('input[type="password"]')
    await page.type('input[type="password"]', 'Akuntes1')

    await page.waitForSelector('#passwordNext')
    await page.click('#passwordNext')
    await page.screenshot({ path: './reports/loginpage.png', fullPage: true })
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    console.log('Login google account, berhasil !')
}

module.exports = login