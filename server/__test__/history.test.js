import supertest from 'supertest';
import app from '../app.js';
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

describe('history quotes', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority');
    });

    afterAll(async () =>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get history quotes route", () =>{

        describe('given the history quotes for the user DOES NOT exist', () => {
            it("should return a 501", async () => {
                const quoteID = "unitTest@me.com"
                // there will not be any quotes with that particular email.
                // It doesnt check if user with email exists due to structure of databases for history quotes.
                // just checks if quotes exist with that email
                await supertest(app).get('/history/:' + {quoteID}).expect(501);
            });
        });

        describe('given the history quotes for the user DOES exist', () => {
            it("should return a 201", async () => {
                const quoteID = "unitTest22@me.com"
                const quote  = await supertest(app).post("/server/quotes/quoteForm").send({
                    gallonsRequested: 20,
                    address: "912 lake street",
                    suggPrice: 233,
                    deliveryDate: "10/15/2024",
                    realPrice: 1000,
                    email: quoteID
                })
                // makes sure that there is at least one quote with this email identification
                await supertest(app).get('/history/:' + {quoteID}).expect(201);
            });
        });

    });

});



