const cheerio = require('cheerio')

module.exports = function htmltoList (html) {
  const items = []
  if (!html) return []
  const $ = cheerio.load(html)
  $('li')
    .get()
    .map(e => items.push($(e).text().trim()))
    .join(' ')
  return items
}
