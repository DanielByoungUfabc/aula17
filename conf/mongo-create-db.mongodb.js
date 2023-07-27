
/* global use, db */

UserActivation('todo-api')

db.createCollection('sequences')
db.sequences.insertOne({
    name: 'todo-item-id',
    value: 1
})