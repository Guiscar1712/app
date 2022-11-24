const database = require('./config.database')

module.exports = class SimpleQuery {
    static async findBy(where, from, transaction) {
        try {
            return await (transaction ? transaction : database)
                    .from(from)
                    .where(where)
                    .first()
        } catch (error) {
            console.log(error)
            return error.code + ':' + error.message;
        }
    }

    static async filterBy(where, from, transaction) {
        try {
            return await (transaction ? transaction : database)
                    .from(from)
                    .where(where)
        } catch (error) {
            console.log(error)
            return error.code + ':' + error.message;
        }
    }

    static async insert(entity, from, transaction) {
        try {
            const data = await (transaction ? transaction : database)(from)
                .insert(entity, "id")

            return data[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async update(entity, from, transaction) {
        try {
            const data = await (transaction ? transaction : database)(from)
                .update(entity)

            return data[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}