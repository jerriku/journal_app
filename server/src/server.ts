import { Request, Response } from 'express';
require('dotenv').config();
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

app.post("/account", async (req: Request, res: Response): Promise<void> => {
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

    const journal: JOURNAL = await Journal.findByPk(id);
    
    if (!journal) {
        res.sendStatus(400);
        return;
    }

    res.json(journal);
});

app.post("/journal", async (req: Request, res: Response): Promise<void> => {
    await sequelize.sync({ force: true });
    const journal: any = req.body;

    if (!journal.entry || !journal.date || !journal.time) {
        res.sendStatus(400);
        return;
    }

    await Journal.create(journal);

    res.sendStatus(201);
});

app.patch("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id, entry, date, time } = req.body;

    if (!entry && !date && !time) {
        res.sendStatus(400);
        return;
    }

    if (entry) {
        await Journal.update(
            { entry },
            { where: { id } }
        );
    }

    if (date) {
        await Journal.update(
            { date },
            { where: { id } }
        );
    }

    if (time) {
        await Journal.update(
            { time },
            { where: { id } }
        );
    }

    res.sendStatus(201);
});

app.delete("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    if (isNaN(id)) {
        res.sendStatus(400);
        return;
    }

    const journal: JOURNAL = await Journal.findByPk(id);

    journal.destroy();

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to.. http://localhost:${PORT}`));