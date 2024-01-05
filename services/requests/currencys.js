// const currencyapi = import("@everapi/currencyapi-js");
// require("dotenv").config();

// async function getRate() {
//     const client = new currencyapi(process.env.CURRENCY_API_KEY);
//     client
//         .latest({
//             base_currency: "ARS",
//             currencies: "EUR",
//         })
//         .then((response) => {
//             console.log(response);
//         });
// }
// module.exports = getRate;

require("dotenv").config();

async function getRate(base_currency) {
    try {
        // Utiliza import como una función y espera a que se resuelva la promesa
        const currencyapiModule = await import("@everapi/currencyapi-js");

        // Crea una instancia del objeto currencyapi
        const currencyapi = new currencyapiModule.default(
            process.env.CURRENCY_API_KEY
        );

        // Realiza la llamada a la API
        const response = await currencyapi.latest({
            base_currency: base_currency,
            currencies: "ARS",
        });

        return response;
    } catch (error) {
        console.error("Error al obtener la tasa:", error.message);
    }
}

module.exports = getRate;
