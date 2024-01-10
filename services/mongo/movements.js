const { MongoClient } = require("mongodb");

const movements = {
    add: async (movement) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const movementsCollection = db.collection("movements");

            const result = await movementsCollection.insertOne(movement);

            client.close();

            console.log("New movement added to MongoDB:", result.insertedId);
        } catch (error) {
            console.error("Error al agregar el movimiento a MongoDB:", error);
            throw new Error("Error al agregar el movimiento a MongoDB");
        }
    },
    delete: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const movementsCollection = db.collection("movements");

            const result = await movementsCollection.deleteOne({
                _id: new ObjectId(id),
            });

            client.close();

            if (result.deletedCount === 1) {
                console.log("Movimiento eliminado de MongoDB");
            } else {
                throw new Error("No se pudo eliminar el movimiento");
            }
        } catch (error) {
            console.error("Error al eliminar el movimiento de MongoDB:", error);
            throw new Error("Error al eliminar el movimiento de MongoDB");
        }
    },
    update: async (id, updatedMovement) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const movementsCollection = db.collection("movements");

            const result = await movementsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedMovement }
            );

            client.close();

            if (result.modifiedCount === 1) {
                console.log("Movimiento actualizado en MongoDB");
            } else {
                throw new Error("No se pudo actualizar el movimiento");
            }
        } catch (error) {
            console.error("Error al editar el movimiento en MongoDB:", error);
            throw new Error("Error al editar el movimiento en MongoDB");
        }
    },
    get: async () => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);

            await client.connect();

            const db = client.db("MisGastos");
            const movementsCollection = db.collection("movements");

            // Query the collection for movements
            const movements = await movementsCollection.find().toArray();

            // Close the connection when done
            await client.close();

            return movements;
        } catch (error) {
            console.error(
                "Error al obtener los movimientos de MongoDB:",
                error
            );
            throw new Error("Error al obtener los movimientos de MongoDB");
        }
    },
    getById: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const movementsCollection = db.collection("movements");

            const movement = await movementsCollection.findOne({
                _id: new ObjectId(id),
            });

            client.close();

            return movement;
        } catch (error) {
            console.error("Error al obtener el movimiento de MongoDB:", error);
            throw new Error("Error al obtener el movimiento de MongoDB");
        }
    },
};
module.exports = movements;
