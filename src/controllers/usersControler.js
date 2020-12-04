const userSchemas = require("../schemas/userSchemas");
const usersRepository = require("../repositories/usersRepository");

async function postSignUp(req, res) {
    const userParams = req.body;
    
    const { error } = userSchemas.signUp.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const isEmailUnique = await usersRepository.isEmailUnique(userParams.email);
    if (!isEmailUnique) {
        return res.status(409).json({ error: "Email is already in use" });
    }

    const user = await usersRepository.create(userParams);
    const userData = getUserData(user);
  
    return res.status(201).send(userData);
}
  
async function postSignIn(req, res) {
    const userParams = req.body;
    
    const { error } = userSchemas.signIn.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const user = await usersRepository.findByEmailAndPassword(
        userParams.email,
        userParams.password
    );
    if (!user) return res.status(401).send({ error: "Wrong email or password" });

    const userData = getUserData(user);

    return res.status(201).send(userData);
}

function getUserData(user) {
    const { id, name, email } = user;  
    return { id, name, email };
}

module.exports = {
    postSignUp,
    postSignIn
};

