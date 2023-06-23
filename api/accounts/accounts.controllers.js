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

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const x = await Account.findById(accountId);
    //const found = await Account.findByIdAndDelete(accountId);
    if (!x) {
      return res.status(404).json({ msg: "not found" });
    }
    const found = await Account.findByIdAndDelete(accountId);
    console.log(x);
    return res.status(204);
    //.json({ msg: `Account by id ${x} has been deleted` });
  } catch (error) {
    return res.status(500).json(error);
  }
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   accounts = accounts.filter((account) => account.id !== +accountId);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    //const foundAccount = await Account.findById(accountId);
    const foundAccount = await Account.findByIdAndUpdate(accountId, req.body);

    return res.status(204).json(foundAccount);
  } catch (error) {
    res.status(404).json({ error: "Account not found" });
    console.log(error);
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

exports.getAccountByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const foundAccount = await Account.findOne({ username: username });
    if (req.query.currency === "usd") {
      foundAccount.funds = foundAccount.funds * 3.31;
      console.log(foundAccount);
      // return res.status(201).json(foundAccount);
    }
    res.status(201).json(foundAccount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "not found" });
  }
};
