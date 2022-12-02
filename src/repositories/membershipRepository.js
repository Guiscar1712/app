
const SimpleQuery = require('../database/simpleQuery')
const table = 'Membership'

module.exports = class MembershipRepository {
    static async findBy (query, transaction) {
        const row = await SimpleQuery.findBy(query, table, transaction);
        return format(row);
    }

    static async deleteBy (query, transaction) {
        return await SimpleQuery.deleteBy(query, table, transaction);
    }

    static async filterBy (query, transaction) {
        const rows = await SimpleQuery.filterBy(query, table, transaction);
        const items = [];
        for (const row of rows) {
            items.push(format(row))
        }
        return items;
    }

    static async findById (id, transaction) {
        return await this.findBy({Id: id}, table, transaction);
    }

    static async list (transaction) {
        return await this.filterBy({}, table, transaction);
    }

    static async insert (entity, transaction) {
        return format(await SimpleQuery.insert(entity, table, transaction))
    }

    static async update(id, entity, transaction) {
        return await SimpleQuery.update({ id }, entity, table, transaction)
    }
}

function format(row) {
    if(!row){
        return null;
    }
    return {
        id: row.Id,
        createdAt: row.CreatedAt,
        userId: row.UserId,
        password: row.Password,
        recoveryKey: row.RecoveryKey
    }
}