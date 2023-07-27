import { Database } from "./database"
import { ToDoItem, ToDoItemDao } from "./model";
import { strict as assert } from "assert"

// const database = new Database();

// database.connect().then(() => {
//     const dao = new ToDoItemDao(database)

//     dao.insert(new ToDoItem('testeA')).then(id => {
//         console.log(id)
//     })

//     database.disconnect().then();
// });


describe("Test DAO", () => {
    const database = new Database()
    const dao = new ToDoItemDao(database)

    before(async () => await database.connect())
    after(async () => await database.disconnect())

    it("insert should be successfull", async () => {
        const item = new ToDoItem('Do something')
        try {
            await dao.insert(item)
        } catch(error) {
            assert.fail("Insert should not throw new error")
        }
    })
})