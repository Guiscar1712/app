const cheerio = require('cheerio')

function htmlExtractItem (htmlText) {
  if (!htmlText) return htmlText

  const $ = cheerio.load(htmlText)

  $('li').each(function () {
    const liContent = $(this).text().replace('.', '').trim()
    $(this).replaceWith(liContent + '; ')
  })

  const plainText = $.text().trim()
  return plainText
}

module.exports = htmlExtractItem
