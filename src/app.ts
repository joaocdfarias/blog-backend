import express from "express";
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const route = Router();

app.use(express.json());

app.get("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findMany({
        where: {
            id: {
                equals: Number(id),
            },
        },
    });

    res.json(user);
});

app.post("/user", async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.create({
            data: {
                name: String(name),
                email: String(email),
            },
        });

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

app.post("/posts", async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body;

        const posts = await prisma.post.create({
            data: {
                title: String(title),
                authorId: Number(authorId),
                content: String(content),
            },
        });

        res.json(posts);
    } catch (error) {
        console.log(error);
    }
});

app.use(route);

app.listen(3333, () => console.log("Started!"));
