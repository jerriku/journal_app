import { Request, Response } from 'express';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
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

type SESSION = {
    id: number,
    exp: number,
    iat: number,
}

type JOURNAL = {
    id: number,
    entry: string,
    date: string,
    time: string,
    destroy(): Function
}

const app = express();
const { PORT, JWT_KEY } = process.env;
const jsonMiddleware = express.json();

function verifySession(session: string): number {
    try {
        const decodedData: SESSION = jwt.verify(session, JWT_KEY);
        return decodedData.id;
    } catch {
        return -1;
    }
}

app.use(cors({
    origin: "http://localhost:7764",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(jsonMiddleware);

app.get("/account", async (req: Request, res: Response): Promise<void> => {
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const id: number = verifySession(session);
    
    const account: ACCOUNT = await Account.findByPk(id);
    
    if (!account) {
        res.status(400).json({ Error: "InvalidSession" });
        return;
    }

    res.json(account);
});

app.post("/account/login", async (req: Request, res: Response): Promise<void> => {
    const { email, password }: any = req.body;

    if (!email || !password) {
        res.sendStatus(400);
        return;
    }

    const accounts: ACCOUNT[] = await Account.findAll({where: { email }});
    const account: ACCOUNT = accounts[0];
    
    if (!account) {
        res.status(401).json({ Error: "InvalidCredentails" });
        return;
    }

    if (account.password !== password) {
        res.status(401).json({ Error: "InvalidCredentails" });
    }

    const id: number = account.id;
    const exp: number = Math.floor(Date.now() / 1000) + 60 * 60;
    const session: string = jwt.sign({ id, exp }, JWT_KEY);

    res.status(200).json({ session });
    return;
});

app.post("/account/register", async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.sendStatus(400);
        return;
    }

    const accounts: ACCOUNT[] = await Account.findAll({where: { email }});
    const account: ACCOUNT = accounts[0];
    
    if (account) {
        res.status(400).json({ Error: "Account already exists" });
        return;
    }

    await Account.create({
        name,
        email,
        password
    });

    res.sendStatus(201);
});

app.patch("/account", async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const id: number = verifySession(session);

    if (!await Account.findByPk(id)) {
        res.sendStatus(400).json({ Error: "InvalidSession" });;
        return;
    }

    if (!name && !email && !password) {
        res.status(400).json({ Error: "ChangeNotFound" });
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
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const id: number = verifySession(session);
    const account: ACCOUNT = await Account.findByPk(id);

    if (!account) {
        res.status(400).json({ Error: "InvalidSession" });
        return;
    }

    account.destroy();
    res.sendStatus(200);
});

app.get("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id }: any = req.query;
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const account_id: number = verifySession(session);
    
    if (account_id < 0) {
        res.status(400).json({ Error: "InvalidSession" });
        return;
    }

    if (id) {
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }

        const journal: JOURNAL = await Journal.findByPk(id, { where: { account_id } });
    
        if (!journal) {
            res.sendStatus(400);
            return;
        }
    
        res.json(journal);
        return;
    }
    
    const entries: JOURNAL[] = await Journal.findAll({ where: { account_id } });

    res.json(entries);
});

app.post("/journal", async (req: Request, res: Response): Promise<void> => {
    const { entry }: any = req.body;
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const account_id: number = verifySession(session);

    if (!entry || account_id < 0) {
        res.sendStatus(400);
        return;
    }
    
    await Journal.create({
        entry,
        account_id
    });
    
    res.sendStatus(201);
});

app.put("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id, entry } = req.body;
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (!id) {
        res.status(400).json({ Error: "No id was provided" });
        return;
    }

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const account_id: number = verifySession(session);

    if (account_id < 0) {
        res.status(400).json({ Error: "InvalidSession" });
        return;
    }

    if (!entry) {
        res.status(400).json({ Error: "ChangeNotFound" });
        return;
    }

    if (!await Journal.findByPk(id)) {
        res.sendStatus(400);
        return;
    }

    await Journal.update(
        { entry },
        { where: { id, account_id } }
    );

    res.sendStatus(201);
});

app.delete("/journal", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    const [type, session]: string[] = req.get("Authorization")!.split(" ");

    if (!id || isNaN(id)) {
        res.status(400).json({ Error: "No id was provided" });
        return;
    }

    if (type !== "Bearer" || !session) {
        res.status(400).json({ Error: "SessionNotFound" });
        return;
    }

    const account_id: number = verifySession(session);

    if (account_id < 0) {
        res.status(400).json({ Error: "InvalidSession" });
        return;
    }
    
    const journal: JOURNAL = await Journal.findByPk(id, { where: { account_id } });

    if (!journal) {
        res.sendStatus(400);
        return;
    }

    journal.destroy();

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to.. http://localhost:${PORT}`));