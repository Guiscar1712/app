const SimpleQuery = require('../database/simpleQuery')
const table = 'User'

module.exports = class UserRepository {
    static async findBy(query, transaction) {
        const row = await SimpleQuery.findBy(query, table, transaction);
        return format(row);
    }

    static async filterBy(query, transaction) {
        const rows = await SimpleQuery.filterBy(query, table, transaction);
        const items = [];
        for (const row of rows) {
            items.push(format(row))
        }
        return items;
    }

    static async findById(id, transaction) {
        return await this.findBy({ Id: id }, transaction);
    }

    static async list(transaction) {
        return await this.filterBy({}, transaction);
    }

    static async insert(entity, transaction) {
        return format(await SimpleQuery.insert(entity, table, transaction))
    }

    static async update(id, entity, transaction) {
        return format(await SimpleQuery.update({ Id: id }, entity, table, transaction))
    }
}

function format(row) {
    if(!row){
        return null;
    }
    return {
        id: row.Id,
        createdAt: row.CreatedAt,
        name: row.Name,
        email: row.Email,
        cpf: row.CPF,
        phone: row.Phone,
        gender: row.Gender,
        birthday: row.Birthday
    }
}
