import MongoClient from "mongodb"

let dbConnection


   export async function connectToDb(cb) {
        await MongoClient.connect('mongodb://localhost:27017')
        .then((client) => {
            dbConnection = client.db('quoteHistory')
            console.log("Success connecting to the History database")
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    }

    export function getDb(){ 
        console.log("Success obtaining the History database object")
        dbConnection.collection('quotes')
        .find()
        .sort({ deliveryDate: 1})
        .forEach(quote => quotes.push(quote))
        return dbConnection
    }


