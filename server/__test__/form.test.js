import request from 'supertest'
import app from '../app.js'
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose"


describe("Post to /quotes/quotform", () =>{
    describe("given form data", () =>{

        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create()
            await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority')
        });
    
        afterAll( async () => {
            await mongoose.disconnect();
            await mongoose.connection.close();
        }); 

        //should respond with 200, success
        test("should respond with 200", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: 150,
                address: "123 Wallaby Way",
                suggPrice: 435,
                deliveryDate: "03/15/2023",
                realPrice: 100,
                email: "unittest@test.com"
            })
            expect(response.statusCode).toBe(200)
        })
        test("should specify that it is json content", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: 150,
                address: "123 Wallaby Way",
                suggPrice: 435,
                deliveryDate: "03/15/2023",
                realPrice: 100,
                email: "unittest@test.com"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response declares quote was saved", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: 150,
                address: "123 Wallaby Way",
                suggPrice: 435,
                deliveryDate: "03/15/2023",
                realPrice: 100,
                email: "unittest@test.com"
            })
            expect(response.body.response).toBe('Quote Saved.')
        })
    })
})

describe("when form data is wrong", () => {
        
        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create()
            await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority')
        });
    
        afterAll( async () => {
            await mongoose.disconnect();
            await mongoose.connection.close();
        }); 
        
        test("should return 400, user error", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: -45, //gallonsRequested CANNOT be negative
                address: "123 Wallaby Way",
                suggPrice: 435,
                deliveryDate: "03/15/2023",
                realPrice: 100,
                email: "unittest@test.com"
            })
            expect(response.statusCode).toBe(400)
    })

}) 

describe("Get to /quotes/getUserInfo", () =>{
    describe("On Render", () =>{

        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create()
            await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority')
        });
    
        afterAll( async () => {
            await mongoose.disconnect();
            await mongoose.connection.close();
        });

        test("If email exists in mongo, should return 201, user was found", async () => {
            const response = await request(app).get("/server/quotes/getUserInfo/123@321.com")
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("If email does NOT exist in mongo, should return 501, user was NOT found", async () => {
            const response = await request(app).get("/server/quotes/getUserInfo/123@789.com")
            expect(response.statusCode).toBe(501)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

    })
})

describe("Get to /quotes/checkHistory", () =>{
    describe("On Render", () =>{

        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create()
            await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority')
        });
    
        afterAll( async () => {
            await mongoose.disconnect();
            await mongoose.connection.close();
        });

        test("If email exists in mongo, should return 201, user was found", async () => {
            const response = await request(app).get("/server/quotes/checkHistory/123@321.com")
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("If email does NOT exist in mongo, should return 501, user was NOT found", async () => {
            const response = await request(app).get("/server/quotes/checkHistory/123@789.com")
            expect(response.statusCode).toBe(501)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })


    })
})