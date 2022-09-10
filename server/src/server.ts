import { Request, Response } from 'express';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const Account = require('../dist/classes/Account');
const Journal = require('../dist/classes/Journal');
const { sequelize } = require('../dist/sequelize_index');

sequelize.sync({ force: true });

type ACCOUNT = {
    id: number,
    name: string,
    email: string,
    password: string,
    destroy(): Function
}

type JOURNAL = {
    id: number,
    entry: string,
    date: string,
    time: string,
    destroy(): Function
}

const app = express();
const { PORT } = process.env;
const jsonMiddleware = express.json();

app.use(cors({
    origin: "http://localhost:7764",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(jsonMiddleware);

app.get("/account", async (req: Request, res: Response): Promise<void> => {
    const { id }: any = req.body;
    
    const account: ACCOUNT = await Account.findByPk(id);
    
    if (!account) {
        res.sendStatus(400);
        return;
    }

    res.json(account);
});

app.post("/account/login", async (req: Request, res: Response): Promise<void> => {
    const {email, password}: any = req.body;

    if (!email || !password) {
        res.sendStatus(400);
        return;
    }

    const accounts: ACCOUNT[] = await Account.findAll({where: { email }});
    const account: ACCOUNT = accounts[0];
    
    if (!account) {
        res.status(401).json({Error: "InvalidCredentails"});
        return;
    }

    if (account.password === password) {
        res.sendStatus(200);
        return;
    }

    res.status(401).json({Error: "InvalidCredentails"});
});

app.post("/account/register", async (req: Request, res: Response): Promise<void> => {
    const account: any = req.body;

    if (!account.name || !account.email || !account.password) {
        res.sendStatus(400);
        return;
    }

    await Account.create(account);

    res.sendStatus(201);
});

app.patch("/account", async (req: Request, res: Response): Promise<void> => {
    const { id, name, email, password } = req.body;

    if (!id) {
        res.status(400).json({error: "No id was provided"});
        return;
    }

    if (!await Account.findByPk(id)) {
        res.sendStatus(400);
        return;
    }

    if (!name && !email && !password) {
        res.status(400).json({error: "No change was provided"});
        return;
    }

    if (name) {
        await Account.update(
            { name },
            { where: { id } }
        );
    }

    if (email) {
        await Account.update(
            { email },
            { where: { id } }
        );
    }

    if (password) {
        await Account.update(
            { password },
            { where: { id } }
        );
    }

    res.sendStatus(201);
});

app.delete("/account", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    
    if (!id) {
        res.status(400).json({error: "No id was provided"});
        return;
    }

    if (isNaN(id)) {
        res.sendStatus(400);
        return;
    }

    if (!await Account.findByPk(id)) {
        res.sendStatus(400);
        return;
    }

    const account: ACCOUNT = await Account.findByPk(id);

    account.destroy();

    res.sendStatus(200);
});

app.get("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id }: any = req.body;

    if (id) {
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }

        const journal: JOURNAL = await Journal.findByPk(id);
    
        if (!journal) {
            res.sendStatus(400);
            return;
        }
    
        res.json(journal);
        return;
    }
    
    const entries: JOURNAL[] = await Journal.findAll();

    res.json(entries);
});

app.post("/journal", async (req: Request, res: Response): Promise<void> => {
    const journal: any = req.body;

    if (!journal.entry || !journal.account_id) {
        res.sendStatus(400);
        return;
    }
    
    await Journal.create(journal);
    
    res.sendStatus(201);
});

app.put("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id, entry } = req.body;

    if (!id) {
        res.status(400).json({error: "No id was provided"});
        return;
    }

    if (!entry) {
        res.sendStatus(400);
        return;
    }

    if (!await Journal.findByPk(id)) {
        res.sendStatus(400);
        return;
    }

    await Journal.update(
        { entry },
        { where: { id } }
    );

    res.sendStatus(201);
});

app.delete("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({error: "No id was provided"});
        return;
    }

    if (isNaN(id)) {
        res.sendStatus(400);
        return;
    }

    if (!await Account.findByPk(id)) {
        res.sendStatus(400);
        return;
    }

    const journal: JOURNAL = await Journal.findByPk(id);

    journal.destroy();

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to.. http://localhost:${PORT}`));