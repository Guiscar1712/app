const database = require('./config.database')

module.exports = class SimpleQuery {
    static async findBy(query, from, transaction) {
        try {
            return await (transaction ? transaction : database)
                .from(from)
                .where(query)
                .first()
        } catch (error) {
            console.log(error)
            return error.code + ':' + error.message;
        }
    }

    static async filterBy(query, from, transaction) {
        try {
            return await (transaction ? transaction : database)
                .from(from)
                .where(query)
        } catch (error) {
            console.log(error)
            return error.code + ':' + error.message;
        }
    }

    static async insert(entity, from, transaction) {
        try {
            const data = await (transaction ? transaction : database)(from)
                .insert(entity, "*")

            return data[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async update(query, entity, from, transaction) {
        try {
            const data = await (transaction ? transaction : database)(from)
                .update(entity)
                .where(query)

            return { ... query, ... entity};
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}