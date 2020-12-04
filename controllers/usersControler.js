const userSchemas = require("../schemas/userSchemas");

async function postSignUp(req, res) {
    const userParams = req.body;
    
    const { error } = userSchemas.signUp.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });
  
    return res.status(201).send("sign-up");
}
  
async function postSignIn(req, res) {
    const userParams = req.body;
    
    const { error } = userSchemas.signIn.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    return res.status(201).send("sign-in");
}

module.exports = {
    postSignUp,
    postSignIn
};

