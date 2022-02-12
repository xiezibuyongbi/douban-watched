'use strict'

const request = require('sync-request')
const cheerio = require('cheerio')

let $ = null

function getChineseTitle(wholeTitles) {
    let slashIndex = wholeTitles.lastIndexOf('/')
    if (slashIndex < 0) {
        return wholeTitles
    }
    return wholeTitles.substring(0, slashIndex)
}

function turnPage(startOffset) {
    let url = baseUrl + "&start=" + startOffset
    let response = request('GET', url).getBody()
    $ = cheerio.load(response)
    return $(".title a:first-child").length != 0
}

const userId = ""
const baseUrl = "https://movie.douban.com/people/" + userId + "/collect?sort=time&rating=all&filter=all&mode=list"
let offset = 0
let watchedList = []
while (turnPage(offset)) {
    $(".title a:first-child").each(function () {
        watchedList.push(getChineseTitle($(this).text().trim()))
    })
    offset += 30
}
watchedList.reverse().forEach((x) => { console.log(x.trim()) })