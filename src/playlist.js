const openPage = async (page) => {
    console.log('Membuka Halaman Library/Playlist !')
    await page.click('.ytmusic-pivot-bar-renderer[tab-id="FEmusic_liked"]')
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    await page.screenshot({ path: './reports/playlistpage.png', fullPage: true })
    console.log('Membuka Halaman Library/Playlist, berhasil !')
}

const create = async (page) => {
    console.log('Membuat playlist')
    await page.waitForSelector('a.yt-simple-endpoint.style-scope.yt-formatted-string[href="#"]')
    await page.click('a.yt-simple-endpoint.style-scope.yt-formatted-string[href="#"]')
    await page.click('#title-input.input')
    await page.type('#title-input.input input', 'Testing today')
    await page.click('.style-scope.tp-yt-iron-autogrow-textarea')
    await page.type('textarea.style-scope.tp-yt-iron-autogrow-textarea', 'Testing sample')
    await page.click('.privacy-status-menu.input.style-scope.ytmusic-playlist-form')
    await page.waitForSelector('tp-yt-paper-item.style-scope.ytmusic-playlist-form.iron-selected')
    await page.click('tp-yt-paper-item.style-scope.ytmusic-playlist-form.iron-selected')

    await page.screenshot({ path: './reports/playlistpage-create.png', fullPage: true })
    await page.click('.submit-button.style-scope.ytmusic-playlist-form')
    console.log('Membuat playlist, berhasil!')
}

const edit = async (page) => {
    console.log('Mengubah playlist')
    await page.waitForTimeout(5000)
    await page.reload({ waitUntil: 'networkidle2' })
    await page.screenshot({ path: './reports/playlistpage-detail.png', fullPage: true })
    await page.click('.detail-page-menu.style-scope.ytmusic-detail-header-renderer #top-level-buttons .edit-playlist-button a')
    await page.waitForTimeout(3000)
    await page.type('.description-input textarea', '')
    await page.keyboard.press("Tab");
    await page.type('.description-input textarea', ' niken widowati putri')
    await page.click('.privacy-dropdown')
    await page.waitForSelector('.style-scope.ytmusic-dropdown-renderer.iron-selected')
    await page.click('.style-scope.ytmusic-dropdown-renderer')
    await page.screenshot({ path: './reports/playlistpage-edit.png', fullPage: true })
    await page.click('.submit-button.style-scope.ytmusic-playlist-form')
    console.log('Mengubah playlist, berhasil!')
}

const remove = async (page) => {
    console.log('Menghapus playlist, berhasil!')
    await page.waitForTimeout(2000)
    await page.click('.detail-page-menu.style-scope.ytmusic-detail-header-renderer .dropdown-trigger.style-scope.ytmusic-menu-renderer')
    await page.click('.style-scope.ytmusic-menu-popup-renderer a[href="#"]')
    await page.screenshot({ path: './reports/playlistpage-delete.png', fullPage: true })
    await page.click('.buttons.style-scope.yt-confirm-dialog-renderer #confirm-button')
    console.log('Menghapus playlist, berhasil!')
}

const addToPlaylist = async (page) => {
    console.log("Tambah lagu ini ke playlist");
    await page.waitForSelector('.queue.scroller.scroller-on-hover.style-scope.ytmusic-tab-renderer #contents.style-scope.ytmusic-player-queue ytmusic-player-queue-item')
    await page.screenshot({ path: './reports/playingpage.png', fullPage: true })
    const playedSong = await page.$$('.queue.scroller.scroller-on-hover.style-scope.ytmusic-tab-renderer #contents.style-scope.ytmusic-player-queue ytmusic-player-queue-item');
    await playedSong[0].click({ button: 'right' })
    await page.waitForSelector('ytmusic-menu-navigation-item-renderer.style-scope.ytmusic-menu-popup-renderer')
    const optionsSong = await page.$$('ytmusic-menu-navigation-item-renderer.style-scope.ytmusic-menu-popup-renderer');
    await optionsSong[1].click()
    await page.waitForSelector('#playlists ytmusic-playlist-add-to-option-renderer')
    const listPlaylists = await page.$$('#playlists ytmusic-playlist-add-to-option-renderer');
    await listPlaylists[0].click()
    console.log("Tambah lagu ini ke playlist, berhasil!");
}

module.exports = { openPage, create, edit, remove, addToPlaylist }