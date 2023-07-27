import { config } from "../conf/config";
import { Database } from "./database";

export class ToDoItem {
    id: number
    description: string
    tags: string[]
    deadline: string

    constructor(description: string) {
        this.id = 0
        this.description = description
        this.tags = []
        this.deadline = ''
    }
}

export class ToDoItemDao {
    private database: Database

    constructor(db: Database) {
        this.database = db
    }

    private async newId(): Promise<number> {
        try {
            const seqColl = this.database.getDb()
                .collection(config.db.collections.sequences);

            const result = await seqColl.findOneAndUpdate(
                {name: 'todo-item-id'},
                {$inc: {value: 1}}
            )

            if (result.ok) {
                return result.value?.value
            }
            
            throw new Error('Invalid value during id generation')
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
    async insert(item: ToDoItem): Promise<number> {
        try {
            item.id = await this.newId();

            const response = await this.database
                .getItemCollection().insertOne(item);

            if (response.acknowledged) {
                return item.id;
            }

            throw new Error('Invalid result while inserting an element')
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    async list():Promise<ToDoItem[]> {
        try {
            const result = await this.database.getItemCollection().find().toArray()
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    findById(id: number) {}

    update(item:ToDoItem) {}

    deleteById(id:number) {}
}