let accounts = require("../../accounts");
const Account = require("../../models/Account");
exports.accountCreate = async (req, res) => {
  //const id = accounts[accounts.length - 1].id + 1;
  // const newAccount = { ...req.body, funds: 0, id };
  // accounts.push(newAccount);
  try {
    const creating = await Account.create(req.body);
    return res.status(201).json(creating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error}` });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    accounts = accounts.filter((account) => account.id !== +accountId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountUpdate = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    //getting data from the db
    const getAllAccounts = await Account.find();
    res.status(200).json(getAllAccounts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Account not found" });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  try {
    const foundAccount = Account.findById({ username: username });
    if (req.query.currency === "usd") {
      const accountInUsd = {
        ...foundAccount,
        funds: foundAccount.funds * 3.31,
      };
      res.status(201).json(accountInUsd);
    }
    res.status(201).json(foundAccount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "not found" });
  }
};
