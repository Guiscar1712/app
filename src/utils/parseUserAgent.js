module.exports = class UserAgentReques {
  get = (userAgent) => {
    const platforms = [
      { name: 'Windows', regex: /Windows NT (\d+\.\d+)/ },
      { name: 'Linux', regex: /Linux/ },
      { name: 'Mac OS', regex: /Mac OS X (\d+([._]\d+)?)/ },
      { name: 'iOS', regex: /iPhone OS (\d+([._]\d+)?)/ },
      { name: 'Android', regex: /Android (\d+([._]\d+)?)/ }
    ]

    for (const platform of platforms) {
      const match = userAgent.match(platform.regex)
      if (match) {
        return `${platform.name} ${match[1] || ''}`
      }
    }

    return 'Desconhecido'
  }
}
