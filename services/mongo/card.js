const { MongoClient } = require("mongodb");

export const card = {
    add: async (card) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const cardsCollection = db.collection("cards");

            const result = await cardsCollection.insertOne(card);

            client.close();

            console.log("New card added to MongoDB:", result.insertedId);
        } catch (error) {
            console.error("Error al agregar la tarjeta a MongoDB:", error);
            throw new Error("Error al agregar la tarjeta a MongoDB");
        }
    },
    delete: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const cardCollection = db.collection("cards");

            const result = await cardCollection.deleteOne({
                _id: new ObjectId(id),
            });

            client.close();

            if (result.deletedCount === 1) {
                console.log("tarjeta eliminado de MongoDB");
            } else {
                throw new Error("No se pudo eliminar la tarjeta");
            }
        } catch (error) {
            console.error("Error al eliminar la tarjeta de MongoDB:", error);
            throw new Error("Error al eliminar la tarjeta de MongoDB");
        }
    },
    update: async (id, updatedCard) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const cardCollection = db.collection("cards");

            const result = await cardCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedCard }
            );

            client.close();

            if (result.modifiedCount === 1) {
                console.log("Tarjeta actualizado en MongoDB");
            } else {
                throw new Error("No se pudo actualizar la tarjeta");
            }
        } catch (error) {
            console.error("Error al editar la tarjeta en MongoDB:", error);
            throw new Error("Error al editar la tarjeta en MongoDB");
        }
    },
    get: async () => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const cardCollection = db.collection("cards");

            const cards = await cardCollection.find().toArray();

            client.close();

            return cards;
        } catch (error) {
            console.error("Error al obtener la tarjeta de MongoDB:", error);
            throw new Error("Error al obtener la tarjeta de MongoDB");
        }
    },
    getById: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const cardCollection = db.collection("cards");

            const card = await cardCollection.findOne({
                _id: new ObjectId(id),
            });

            client.close();

            return card;
        } catch (error) {
            console.error("Error al obtener la tarjeta de MongoDB:", error);
            throw new Error("Error al obtener la tarjeta de MongoDB");
        }
    },
};
