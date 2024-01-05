const { MongoClient } = require("mongodb");

export const category = {
    add: async (category) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const categoriesCollection = db.collection("categories");

            const result = await categoriesCollection.insertOne(category);
            console.log("New category added to MongoDB:" + result.insertedId);

            client.close();
        } catch (error) {
            console.error("Error adding category to MongoDB:", error);
            throw new Error("Error al agregar la categoría a MongoDB");
        }
    },
    delete: async (id) => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const expensesCollection = db.collection("categories");

            const result = await expensesCollection.deleteOne({
                _id: new ObjectId(id),
            });

            client.close();

            if (result.deletedCount === 1) {
                console.log("Categoria eliminado de MongoDB");
            } else {
                throw new Error("No se pudo eliminar la categoria");
            }
        } catch (error) {
            console.error("Error al eliminar la categoria de MongoDB:", error);
            throw new Error("Error al eliminar la categoria de MongoDB");
        }
    },
    get: async () => {
        try {
            const uri =
                "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
            const client = new MongoClient(uri);
            await client.connect();

            const db = client.db("MisGastos");
            const categoriesCollection = db.collection("categories");

            const categories = await categoriesCollection.find().toArray();

            client.close();

            return categories;
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías de MongoDB");
        }
    },
};
