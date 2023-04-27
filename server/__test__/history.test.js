import supertest from 'supertest';
import app from '../app.js';
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

describe('history quotes testing of fetching', () => {
    describe("get history quotes route", () =>{
        
        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create();
            await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority');
        });
    
        afterAll(async () =>{
            await mongoose.disconnect();
            await mongoose.connection.close();
        });

        /// shoudl respond wiht 501 success
        test('given the history quotes for the user DOES NOT exist', async () => {
                // there will not be any quotes with that particular email.
                // It doesnt check if user with email exists due to structure of databases for history quotes.
                // just checks if quotes exist with that email
            const quoteID = "unitTest14776@me.com";
            const response = await supertest(app).get('/history/:' + {quoteID});
            expect(response.statusCode).toBe(501);
        });

     
        test('given the history quotes for the user DOES exist', async () => {
            const quoteID = "unittest@test.com";
            await supertest(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: 20,
                address: "912 lake street",
                suggPrice: 233,
                deliveryDate: "10/15/2024",
                realPrice: 1000,
                email: quoteID
            })
             // makes sure that there is at least one quote with this email identification
             const response = await supertest(app).get('/history/:' + {quoteID});
            expect(response.statusCode).toBe(501);
            });
        });
});


