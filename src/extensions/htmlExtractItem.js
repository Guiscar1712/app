const cheerio = require('cheerio')

module.exports = function htmlExtractItem (html, tag) {
  if (!html) return ''
  const $ = cheerio.load(html)
  return $(tag).text() || html
}
