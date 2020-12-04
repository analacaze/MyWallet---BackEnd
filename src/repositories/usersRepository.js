const bd = require('../database');

async function create(userParams) {
    const { name, email, password} = userParams;

    const newUser = await bd.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *`,
                                    [name, email, password]);
    return newUser.rows[0];
}

async function findByEmailAndPassword(email, password) {
    const user = await bd.query('SELECT * FROM users WHERE email = $1 and password = $2', [email,password]);
    return user.rows[0];
}

async function isEmailUnique(email) {
    const user = await bd.query('SELECT * FROM users WHERE email = $1', [email]);
    return !user.rows[0];
}

module.exports = { create, findByEmailAndPassword, isEmailUnique };