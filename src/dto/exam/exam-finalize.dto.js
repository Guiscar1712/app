const { htmlExtractItem } = require('../../extensions')

function toDto(item) {
  if (!item) {
    return {}
  }

  return {
    titulo: item.title,
    texto: item.text,
  }
}

module.exports = (item) => {
  return toDto(item)
}
