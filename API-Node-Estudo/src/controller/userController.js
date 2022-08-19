//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//const prisma = require("@prisma/client");
const prisma = new PrismaClient();
const config = require("../../config/auth");
module.exports = {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            let user = await prisma.user.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: "deu erro createUser" });
        }
    },

    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ messagem: "Error" });
        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params;

            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                return res.json({
                    error: "Não foi possível encontrar esse usuário!",
                });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            let user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                return res.json({
                    error: "Não foi possível encontrar esse usuário!",
                });
            }

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email, password },
            });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ messagem: "Error" });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                return res.json({
                    error: "Não foi possível encontrar esse usuário!",
                });
            }
            await prisma.user.delete({ where: { id: Number(id) } });

            return res.status(200).json({ message: "User deleted!", user });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findFirst({
                where: { email, password },
                //where: { password },
            });
            if (user) {
                const token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: config.expireIn,
                });
                return res.status(200).json({ auth: true, token, user });
            } else {
                return res
                    .status(401)
                    .json({ message: "User doesn't exist", error: true });
            }
        } catch (error) {
            return res.status(401).json({ message: error });
        }
    },
};
