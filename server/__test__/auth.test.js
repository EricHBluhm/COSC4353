import { login,register, accInfo } from "../controller/auth";
import {jest} from '@jest/globals'
import supertest from "supertest"
import app from "../app.js"
import User from "../models/User.js"
import UserInfo from "../models/UserInfo.js"
import {hashPassword,comparePassword} from "../utils/helpers.js"
import mongoose from "mongoose"
import express from "express"
import MongoClient from "mongodb"
import {MongoMemoryServer} from "mongodb-memory-server";

const correctRegister ={
    email:"test2@test.com",
    password:"Test!1",
    confirmPassword:"Test!1",
    hasAccInfo:false
}

const incorrectRegister ={
    email:"Billy@bob.com",
    password:"Test!1",
    confirmPassword:"Test!1",
    hasAccInfo:false
}


// describe('insert', () => {
//     let connection;
//     let db;
  
//     beforeAll(async () => {
//       connection = await MongoClient.connect(global.__MONGO_URI__, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       db = await connection.db();
//     });
  
//     afterAll(async () => {
//       await connection.close();
//     });


//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');
  
//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);
  
//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });

// });


const userId = new mongoose.Types.ObjectId().toString();

// //super test way
describe('register', () =>{

    // beforeAll(async () => {
    //     await mongoose.connect('mongodb://127.0.0.1:27017/fuelQuotes');
    // });

    // afterAll( async () => {
    //     await mongoose.disconnect();
    // });


    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect('mongodb://127.0.0.1:27017/fuelQuotes')
    });

    afterAll( async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it('returns status code 400 if user already found', async () =>{
        const res = await supertest(app).post('/server/auth/register').send({
            _id:userId,
            email:"test@test.com",
            password:"Test!1",
            confirmPassword:"Test!1",
            hasAccInfo:true
        });
        expect(res.statusCode).toEqual(400)
    
    });


    it('returns status code 201 if new user created', async () =>{
        const res = await supertest(app).post('/server/auth/register').send({
            _id:userId,
            email:"jest6@test.com",
            password:"Test!1",
            confirmPassword:"Test!1",
            hasAccInfo: "false"
        });
        expect(res.statusCode).toBe(201)
    
    });
})

describe('login', () =>{

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect('mongodb://127.0.0.1:27017/fuelQuotes')
    });

    afterAll( async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });


    it('returns status code 500 if user does not exist', async () =>{
        const res = await supertest(app).post('/server/auth/login').send({
            email:"ImnotReal@bob.com",
            password:"Test!1",
        });
        expect(res.statusCode).toEqual(500)
    
    });

    it('returns status code 500 if password does not match', async () =>{
        const res = await supertest(app).post('/server/auth/login').send({
            email:"Billy@bob.com",
            password:"Test!2",
        });
        expect(res.statusCode).toEqual(500)
    
    });

    it('returns status code 200 if token is created and user logged in', async () =>{
        const res = await supertest(app).post('/server/auth/login').send({
            email:"Billy@bob.com",
            password:"Test!1",
        });
        expect(res.statusCode).toEqual(201)
    
    });
})

describe('accInfo', () =>{

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect('mongodb://127.0.0.1:27017/fuelQuotes')
    });

    afterAll( async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });


    it('returns status code 500 if user not found', async () =>{
        const res = await supertest(app).post('/server/auth/accInfo').send({
            fullName:"Hunter",
            address1:"Test!1",
            address2:"Test!1",
            city:"Test!1",
            zipcode:"47383",
            states: "TX",
            curUser: "Billy2@bob.com"

        });
        expect(res.statusCode).toEqual(500)
    
    });

    it('returns status code 201 if account info added', async () =>{
        const res = await supertest(app).post('/server/auth/accInfo').send({
            _id:userId,
            fullName:"Hunter",
            address1:"Test!1",
            address2:"Test!1",
            city:"Test!1",
            zipcode:"47383",
            states: "TX",
            email: "test@test.com"
        });
        expect(res.statusCode).toEqual(201)
    
    });
})


///////////////////////////////////////////////////////


// jest.mock('../models/User', () => jest.fn); 

// const requestUserExist ={
//     body: {
//         email:"test2@test.com",
//         password:"Test!1",
//         confirmPassword:"Test!1",
//         hasAccinfo: 'false',
//     },
// };


// const response = { //fake response object
//     status: jest.fn((x)=> x),
//     send: jest.fn((x)=>x),
// }

// it('should send a status code of 400 when user already exists', async () =>{
//     User.findOne.mockImplementationOnce(()=> ({ //mocking the findOne query
//         email: 'test@test.com',
//         password: 'Test!',
//         hasAccinfo: 'false'
//     }));
//     await register(requestUserExist,response);
//     //expect(response.status).toHaveBeenCalledWith(200);
// });