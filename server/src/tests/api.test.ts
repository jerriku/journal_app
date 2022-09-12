require('dotenv').config();
const request = require('supertest');

const { PORT } = process.env;
const baseURL: string = `http://localhost:${PORT}`;

describe("API", (): void => {
    let session: string;

    test("can POST account endpoint", async (): Promise<void> => {
        await request(baseURL)
        .post("/account/register")
        .send({
            name: "J0hn Wick",
            email: "john_wick@gmail.com",
            password: "encrypted_password123"
        })
        expect(201);
    });

    test("can deny register if email already exist with POST account endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL)
        .post("/account/register")
        .send({
            name: "J0hn Wick",
            email: "john_wick@gmail.com",
            password: "encrypted_password123"
        })
        .expect(400);
        
        const error: string = response._body.Error;
        expect(error).toBe("Account already exists");
    });

    test("can login with POST account endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL)
        .post("/account/login")
        .send({
            email: "john_wick@gmail.com",
            password: "encrypted_password123"
        })
        .expect(200);

        session = response._body.session;
        expect(session).toBeTruthy();
    });

    test("can GET account endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL)
        .get("/account")
        .set("Authorization", `Bearer ${session}`)
        .expect(200);

        const name: string = response._body.name;
        expect(name).toBe("J0hn Wick");
    });

    test("can PATCH name on account endpoint", async(): Promise<void> => {
        await request(baseURL)
        .patch("/account")
        .set("Authorization", `Bearer ${session}`)
        .send({ name: "John Wick" })
        .expect(201);
    });

    test("can PATCH email on account endpoint", async(): Promise<void> => {
        await request(baseURL)
        .patch("/account")
        .set("Authorization", `Bearer ${session}`)
        .send({ email: "j0hn_w1ck@gmail.com" })
        .expect(201);
    });

    test("can PATCH password on account endpoint", async(): Promise<void> => {
        await request(baseURL)
        .patch("/account")
        .set("Authorization", `Bearer ${session}`)
        .send({ password: "3nCrypt3d-p@ssw0rd123" })
        .expect(201);
    });

    test("can POST journal endpoint", async (): Promise<void> => {
        await request(baseURL)
        .post("/journal")
        .set("Authorization", `Bearer ${session}`)
        .send({ entry: "Hello World!" })
        .expect(201);
    });

    test("can GET journal endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL)
        .get("/journal")
        .set("Authorization", `Bearer ${session}`)
        .query({ id: 1 })
        .expect(200);

        const entry: string = response._body.entry;
        expect(entry).toBe("Hello World!");
    });

    test("can PUT entry on journal endpoint", async(): Promise<void> => {
        await request(baseURL)
        .put("/journal")
        .set("Authorization", `Bearer ${session}`)
        .send({ id: 1, entry: "H3ll0 W0rld!" })
        .expect(201);
    });

    test("can DELETE on journal endpoint", async(): Promise<void> => {
        await request(baseURL)
        .delete("/journal")
        .set("Authorization", `Bearer ${session}`)
        .send({ id: "1" })
        .expect(200);
    });

    test("can DELETE on account endpoint", async(): Promise<void> => {
        await request(baseURL)
        .delete("/account")
        .set("Authorization", `Bearer ${session}`)
        .expect(200);
    });
});