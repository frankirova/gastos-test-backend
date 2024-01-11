const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const getRate = require("./services/requests/currencys");
const account = require("./services/mongo/account");
const category = require("./services/mongo/categories");
const movements = require("./services/mongo/movements");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// Middleware para habilitar CORS
const origins = [
    "http://localhost:5173",
    "https://gastos-app-client.vercel.app",
    "https://gastos-test-iota.vercel.app",
    "https://gastos-app-server.onrender.com",
];
app.use(
    cors({
        origin: origins,
    })
);

//routes

app.get("/accounts", async (req, res) => {
    try {
        const accounts = await account.get();

        if (accounts) {
            res.json(accounts);
        } else {
            res.status(404).send("cuenta no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener la cuenta:", error);
        res.status(500).send("Error al obtener la cuenta");
    }
});
app.post("/account", async (req, res) => {
    try {
        const accountData = req.body; // Suponiendo que los datos de la cuenta están en el cuerpo de la solicitud
        await account.add(accountData);
        res.send({ message: "ok", data: accountData });
    } catch (error) {
        console.error("Error al agregar la cuenta:", error);
        res.status(500).send("Error al agregar la cuenta");
    }
});

app.get("/rate/:base_currency", async (req, res) => {
    try {
        const base_currency = req.params.base_currency;
        const rate = await getRate(base_currency);
        console.log(rate);
        if (rate) {
            res.json(rate);
        } else {
            res.status(404).send({ message: "rate no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener la rate:", error);
        res.status(500).send({ message: "Error al obtener la rate" });
    }
});

//categories

app.get("/categories", async (req, res) => {
    try {
        const categories = await category.get();
        res.json(categories);
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        res.status(500).send("Error al obtener las categorías");
    }
});

app.post("category", async (req, res) => {
    try {
        const category = req.body;
        await category.add(category);
        res.status(200).send({ message: "Ok" });
    } catch (error) {
        console.error("Error al agregar categoria:" + error);
        res.status(500).send({ message: "Error al agregar categoria" });
    }
});
app.delete("/category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        await deleteCategory(categoryId);
        res.send("Categoria eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el categoria:", error);
        res.status(500).send("Error al eliminar el categoria");
    }
});

// movements

app.get("/movements", async (req, res) => {
    try {
        const movement_list = await movements.get();
        res.json(movement_list);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/movements", async (req, res) => {
    try {
        const movement = req.body;
        await movements.add(movement);
        res.send({ message: "Ok" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error });
    }
});

app.listen("3000", () => {
    console.log("runing on port 3000");
});
