require('dotenv').config();
const request = require('supertest');

const { PORT } = process.env;
const baseURL: string = `http://localhost:${PORT}`;

describe("API", (): void => {
    test("can POST account endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL).post("/account").send({
            name: "J0hn Wick",
            email: "john_wick@gmail.com",
            password: "encrypted_password123"
        });

        expect(response.status).toBe(201);
    });

    test("can GET account endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL).get("/account").send({ id: 1 });
        expect(response.status).toBe(200);

        const data: any = JSON.parse(response.text);
        expect(data.name).toBe("J0hn Wick");
    });

    test("can PATCH name on account endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).patch("/account").send({ id: 1, name: "John Wick" });
        expect(response.status).toBe(201);
    });

    test("can PATCH email on account endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).patch("/account").send({ id: 1, email: "j0hn_w1ck@gmail.com" });
        expect(response.status).toBe(201);
    });

    test("can PATCH password on account endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).patch("/account").send({ id: 1, password: "3nCrypt3d-p@ssw0rd123" });
        expect(response.status).toBe(201);
    });

    test("can POST journal endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL).post("/journal").send({
            entry: "Hello World!",
            account_id: 1
        });

        expect(response.status).toBe(201);
    });

    test("can GET journal endpoint", async (): Promise<void> => {
        const response: any = await request(baseURL).get("/journal").send({ id: 1 });
        expect(response.status).toBe(200);

        const data: any = JSON.parse(response.text);
        expect(data.entry).toBe("Hello World!");
    });

    test("can PUT entry on journal endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).put("/journal").send({ id: 1, entry: "H3ll0 W0rld!" });
        expect(response.status).toBe(201);
    });

    test("can DELETE on journal endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).delete("/journal").send({ id: "1" });
        expect(response.status).toBe(200);
    });

    test("can DELETE on account endpoint", async(): Promise<void> => {
        const response: any = await request(baseURL).delete("/account").send({ id: "1" });
        expect(response.status).toBe(200);
    });
});