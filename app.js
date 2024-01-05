const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const account = require("./services/mongo/account");
const getRate = require("./services/requests/currencys");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// Middleware para habilitar CORS
const origins = [
    "http://localhost:5173",
    "https://gastos-app-client.vercel.app",
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
            res.status(404).send("rate no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener la rate:", error);
        res.status(500).send("Error al obtener la rate");
    }
});

app.listen("3000", () => {
    console.log("runing on port 3000");
});
