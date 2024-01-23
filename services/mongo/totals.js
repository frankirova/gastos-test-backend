const account = require("./account");
const movements = require("./movements");
const resetExpenses = require("./movements/resetExpenses");
const saveMonthlyExpenses = require("./movements/saveMothlyExpenses");

// const getTotals = async (id) => {
//     const movement_list = await movements.get(id);

//     const totalIncome = movement_list
//         .filter((movement) => movement.group === "income")
//         .reduce((total, movement) => total + Number(movement.amount), 0);

//     const totalExpense = movement_list
//         .filter((movement) => movement.group === "expense")
//         .reduce((total, movement) => total + Number(movement.amount), 0);

//     const saldo = totalIncome - totalExpense;
//     const currentDate = new Date();

//     const lastDayOfMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() + 1,
//         0
//     ).getDate();
//     if (currentDate.getDate() === lastDayOfMonth) {
//         await saveMonthlyExpenses(totalExpense);
//         await resetExpenses();
//     }
//     return {
//         totalIncome,
//         totalExpense,
//         saldo,
//     };
// };

const getTotals = async () => {
    const account_list = await account.get();
    console.log(account_list);
    const account_total_list = account_list.map((total_accounts) => ({
        id_account: total_accounts._id,
        total: total_accounts.total,
    }));
    const saldo_total = account_total_list.reduce(
        (accumulator, currentAccount) => {
            return accumulator + currentAccount.total;
        },
        0
    );
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(saldo_total);
};
module.exports = getTotals;
