const movements = require("./movements");
const resetExpenses = require("./movements/resetExpenses");
const saveMonthlyExpenses = require("./movements/saveMothlyExpenses");

const getTotals = async (id) => {
    const movement_list = await movements.get(id);
    console.log(movement_list);
    console.log(id);

    const totalIncome = movement_list
        .filter((movement) => movement.group === "income")
        .reduce((total, movement) => total + Number(movement.amount), 0);

    const totalExpense = movement_list
        .filter((movement) => movement.group === "expense")
        .reduce((total, movement) => total + Number(movement.amount), 0);

    const saldo = totalIncome - totalExpense;
    const currentDate = new Date();

    const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    if (currentDate.getDate() === lastDayOfMonth) {
        await saveMonthlyExpenses(totalExpense);
        await resetExpenses();
    }
    return {
        totalIncome,
        totalExpense,
        saldo,
    };
};
module.exports = getTotals;
