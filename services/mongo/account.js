const { MongoClient } = require("mongodb");

const account = {
    add: async (account) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const accountsCollection = db.collection("accounts");

            const result = await accountsCollection.insertOne(account);
            console.log(account);
            client.close();

            console.log("New movement added to MongoDB:", result.insertedId);
        } catch (error) {
            console.error("Error al agregar la cuenta a MongoDB:", error);
            throw new Error("Error al agregar la cuenta a MongoDB");
        }
    },
    delete: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const accountsCollection = db.collection("accounts");

            const result = await accountsCollection.deleteOne({
                _id: new ObjectId(id),
            });

            client.close();

            if (result.deletedCount === 1) {
                console.log("Cuenta eliminado de MongoDB");
            } else {
                throw new Error("No se pudo eliminar la cuenta");
            }
        } catch (error) {
            console.error("Error al eliminar la cuenta de MongoDB:", error);
            throw new Error("Error al eliminar la cuenta de MongoDB");
        }
    },
    update: async (id, updatedAccount) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const accountsCollection = db.collection("accounts");

            const result = await accountsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedAccount }
            );

            client.close();

            if (result.modifiedCount === 1) {
                console.log("Cuenta actualizado en MongoDB");
            } else {
                throw new Error("No se pudo actualizar la cuenta");
            }
        } catch (error) {
            console.error("Error al editar la cuenta en MongoDB:", error);
            throw new Error("Error al editar la cuenta en MongoDB");
        }
    },
    get: async () => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const accountsCollection = db.collection("accounts");

            const accounts = await accountsCollection.find().toArray();

            client.close();

            return accounts;
        } catch (error) {
            console.error("Error al obtener la cuenta de MongoDB:", error);
            throw new Error("Error al obtener la cuenta de MongoDB");
        }
    },
    getById: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const accountsCollection = db.collection("accounts");

            const account = await accountsCollection.findOne({
                _id: new ObjectId(id),
            });

            client.close();

            return account;
        } catch (error) {
            console.error("Error al obtener la cuenta de MongoDB:", error);
            throw new Error("Error al obtener la cuenta de MongoDB");
        }
    },
};
module.exports = account;
