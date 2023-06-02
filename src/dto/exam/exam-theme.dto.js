const { htmlExtractItem } = require('../../extensions')

function toDto (item) {
  const theme = item.tema

  if (!theme) {
    return {}
  }

  return {
    id: theme.id,
    description: htmlExtractItem(theme.descricao, 'p')
  }
}

module.exports = (item) => {
  return toDto(item)
}
