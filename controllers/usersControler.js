const userSchemas = require("../schemas/userSchemas");

async function postSignUp(req, res) {
    const userParams = req.body;
    console.log(userParams);
  
    return res.status(201).send("sign-up");
}
  
async function postSignIn(req, res) {
    const userParams = req.body;
    console.log(userParams);

    return res.status(201).send("sign-in");
}

module.exports = {
    postSignUp,
    postSignIn
};

