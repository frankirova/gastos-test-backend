const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const getRate = require("./services/requests/currencys");
const account = require("./services/mongo/account");
const category = require("./services/mongo/categories");
const movements = require("./services/mongo/movements");
const getTotals = require("./services/mongo/totals");
const scrapeWebsite = require("./services/requests/scrap");

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

app.get("/dolar", async (req, res) => {
    try {
        const url = "https://dolarhoy.com";
        const dolar_price = await scrapeWebsite(url);
        console.log(dolar_price)
        res.json(dolar_price);
    } catch (error) {
        console.error(error);
        return error;
    }
});

app.put("/account/:id", async (req, res) => {
    try {
        const updated_account = req.body;
        const account_id = req.params.id;
        console.log({ account_date: updated_account, id_account: account_id });
        await account.update(account_id, updated_account);
        res.send("Cuenta actualizada correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
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
        console.log(movement);
        await movements.add(movement);
        res.send({ message: "Ok" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error });
    }
});

app.get("/totals", async (req, res) => {
    try {
        // const account_id = req.params.id;
        const totals = await getTotals();
        if (totals) {
            res.json(totals);
        } else {
            res.status(404).send("Total no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener total: ", error);
    }
});

app.listen("3000", () => {
    console.log("runing on port 3000");
});
