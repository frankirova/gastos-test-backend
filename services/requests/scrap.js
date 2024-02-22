const axios = require("axios");
const xpath = require("xpath");
const { DOMParser } = require("xmldom");

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url);
        const xmlDoc = new DOMParser().parseFromString(response.data);

        // Define el XPath que deseas apuntar
        const xpathExpression =
            '//*[@id="home_0"]/div[2]/section/div/div/div/div[1]/div/div[2]/div[1]/div/div[2]/div[2]';

        // Utiliza xpath para evaluar la expresión XPath y obtener el elemento
        const element = xpath.select(xpathExpression, xmlDoc)[0];

        // Imprime el elemento encontrado
        if (element) {
            const elementValue = element.textContent.trim();
            console.log("Elemento encontrado:", elementValue);
            return {price_usd :elementValue};
        } else {
            console.log("Elemento no encontrado.");
        }
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
}

// Llama a la función de scraping con la URL del sitio web que deseas analizar
// scrapeWebsite("https://dolarhoy.com");
module.exports = scrapeWebsite;
