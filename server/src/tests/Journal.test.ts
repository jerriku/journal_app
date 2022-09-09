const { sequelize: seq } = require('../sequelize_index');
//@ts-ignore
const Journal = require('../classes/Journal');
//@ts-ignore
type JOURNAL = {
    id: number,
    entry: string,
    date: string,
    time: string,
    destroy(): Function
}

describe("Journal", (): void => {
    let journal: JOURNAL;
    beforeAll(async (): Promise<void> => {
        await seq.sync({ force: true });
    });

    test("can create a new journal", async (): Promise<void> => {
        journal = await Journal.create({
            entry: "Hello World!",
        });

        expect(journal.id).toBeTruthy();
    });

    test("can access entry", async (): Promise<void> => {
        expect(journal.entry).toBe("Hello World!");
    });

    test("can edit journal", async (): Promise<void> => {
        await Journal.update(
            { entry: "H3ll0 W0rld!" },
            { where: { id: journal.id } }
        );

        journal = await Journal.findByPk(journal.id);

        expect(journal.entry).toBe("H3ll0 W0rld!");
    });

    test("can delete journal", async (): Promise<void> => {
        journal.destroy();

        journal = await Journal.findByPk(1);

        expect(journal).toBe(null);
    });
});