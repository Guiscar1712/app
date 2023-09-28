const cheerio = require('cheerio')

function htmlExtractItem (htmlText) {
  if (!htmlText) return htmlText

  const $ = cheerio.load(htmlText)

  $('p').each(function () {
    const pContent = $(this).text()
    $(this).replaceWith(pContent + ' \n')
  })

  $('li').each(function () {
    $('br').each(function () {
      const pContent = $(this).text()
      $(this).replaceWith(pContent + ' ')
    })
    const liContent = $(this).text().replace('.', '').trim()
    $(this).replaceWith(liContent + ' \n')
  })

  const plainText = $.text().replace(/R\$/g, 'R\\$').trim()

  return plainText
}

module.exports = htmlExtractItem
