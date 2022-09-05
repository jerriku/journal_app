const { sequelize: seq } = require('../sequelize_index');
const Journal = require('../classes/Journal');

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
            date: "Sept 04 2022",
            time: "16:12:53",
        });

        expect(journal.id).toBeTruthy();
    });

    test("can access entry", async (): Promise<void> => {
        expect(journal.entry).toBe("Hello World!");
    });

    test("can access date", async (): Promise<void> => {
        expect(journal.date).toBe("Sept 04 2022");
    });

    test("can access time", async (): Promise<void> => {
        expect(journal.time).toBe("16:12:53");
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