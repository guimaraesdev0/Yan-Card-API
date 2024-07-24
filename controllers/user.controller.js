const { body, validationResult } = require('express-validator');
const UserModel = require('../services/user.service');
const bcrypt = require('bcrypt');
const md5 = require('md5')

async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserById(req, res) {
    try {
        const user = await UserModel.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login(req, res) {
    await body('telefone').isMobilePhone().run(req);
    await body('senha').isString().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await UserModel.verifyExistingUserbyMobileNumber(req.body.telefone);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'Number not found' });
        }

        const user = existingUser[0];
        const isPasswordValid = md5(req.body.senha) === user.senha;

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const userData = await UserModel.getUserById(user.id);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createUser(req, res) {
    await body('nome').isString().isLength({ min: 3 }).trim().escape().run(req);
    await body('email').isEmail().normalizeEmail().run(req);
    await body('senha').isLength({ min: 6 }).trim().escape().run(req); 
    await body('telefone').isMobilePhone().run(req);
    await body('nascimento').isString().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await UserModel.verifyExistingUserbyEmail(req.body.email, req.body.telefone);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email or Number already exists', existingUser });
        }

        // Encripta a senha com md5
        const hashedPassword = md5(req.body.senha);

        const newUser = {
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedPassword,
            telefone: req.body.telefone,
            nascimento: req.body.nascimento
        };

        const createdUser = await UserModel.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getCupons(req, res) {
    try {
        const newUser = await UserModel.getCupons();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getCupons,
    login
};
