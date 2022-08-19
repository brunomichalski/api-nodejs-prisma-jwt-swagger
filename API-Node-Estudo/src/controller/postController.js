//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
//const prisma = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    async createPost(req, res) {
        const { content } = req.body;
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user) {
                return res.json({
                    error: "User doesn't exists",
                });
            }

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id,
                },
                include: {
                    author: true,
                },
            });

            return res.status(200).json(post);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    async findAllPosts(req, res) {
        try {
            const posts = await prisma.post.findMany({
                select: {
                    content: true,
                    created_at: true,
                    author: true,
                },
            });

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(400).json({ message: "Error" });
        }
    },

    async updatePost(req, res) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const post = await prisma.post.findUnique({
                where: { id: Number(id) },
            });

            if (!post) {
                return res.json({
                    error: "Post doesn't exist",
                });
            }

            await prisma.post.update({
                where: { id: Number(id) },
                data: { content },
            });

            return res.json({
                message: "Post Updated",
            });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
};
