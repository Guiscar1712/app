const cheerio = require('cheerio')

function htmlExtractMarketDescription(htmlText) {
  if (!htmlText) return htmlText

  const $ = cheerio.load(htmlText)

  $('*:not(p, br, li)').remove()

  return $.text()
}

module.exports = htmlExtractMarketDescription
