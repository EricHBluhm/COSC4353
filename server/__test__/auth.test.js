import { login,register } from "../controller/auth";
import {jest} from '@jest/globals';
import request from "supertest"
import app from "../app.js"


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


//super test way
describe('register', () =>{
    it('returns status code 400 if user already found', async () =>{
        const res = await request(app).post('/server/auth/register').send({
            email:"Billy@bob.com",
            password:"Test!1",
            confirmPassword:"Test!1",
            hasAccInfo:false
        });
        expect(res.statusCode).toEqual(400)
    
    });

    it('returns status code 201 if new user created', async () =>{
        const res = await request(app).post('/server/auth/register').send({
            email:"test@test.com",
            password:"Test!1",
            confirmPassword:"Test!1",
            hasAccInfo:false
        });
        expect(res.statusCode).toEqual(201)
    
    });
})

describe('login', () =>{
    it('returns status code 500 if user does not exist', async () =>{
        const res = await request(app).post('/server/auth/login').send({
            email:"ImnotReal@bob.com",
            password:"Test!1",
        });
        expect(res.statusCode).toEqual(500)
    
    });

    it('returns status code 500 if password does not match', async () =>{
        const res = await request(app).post('/server/auth/login').send({
            email:"Billy@bob.com",
            password:"Test!2",
        });
        expect(res.statusCode).toEqual(500)
    
    });

    it('returns status code 200 if token is created and user logged in', async () =>{
        const res = await request(app).post('/server/auth/login').send({
            email:"Billy@bob.com",
            password:"Test!1",
        });
        expect(res.statusCode).toEqual(201)
    
    });
})

describe('accInfo', () =>{
    it('returns status code 500 if user not found', async () =>{
        const res = await request(app).post('/server/auth/accInfo').send({
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
        const res = await request(app).post('/server/auth/accInfo').send({
            fullName:"Hunter",
            address1:"Test!1",
            address2:"Test!1",
            city:"Test!1",
            zipcode:"47383",
            states: "TX",
            curUser: "Billy@bob.com"
        });
        expect(res.statusCode).toEqual(201)
    
    });
})




// const correctRegister ={
//     email:"test2@test.com",
//     password:"Test!1",
//     confirmPassword:"Test!1",
//     hasAccInfo:false
// }

// const incorrectRegister ={
//     email:"Billy@bob.com",
//     password:"Test!1",
//     confirmPassword:"Test!1",
//     hasAccInfo:false
// }

// const response = {
//     status: jest.fn((x)=> x),
//     send: jest.fn((x)=>x)
// }


// it('should send a status code of 400 when user exists', async () =>{
//     await register(correctRegister,response);
//     expect(response.status).toHaveBeenCalledWith(200);
// });