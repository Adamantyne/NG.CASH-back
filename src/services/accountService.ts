import accountRepository from "../repositories/accountRepository.js";

async function getBalance(userId:number) {
    const balance = await accountRepository.getAccountById(userId);
    delete balance.id;
    return balance
}

const accountService = {getBalance};
export default accountService;