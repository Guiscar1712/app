const fs = require('fs')
const path = require('path')

module.exports = class TemplateEmail {
    static get(templateName, params) {
        let data = fs.readFileSync(path.resolve(__dirname, '../templates/emails/' + templateName), 'utf8')
        for (const item of params) {
            data = data.replace(new RegExp(item.name, 'g'), item.value)
        }
        return data
    }
}