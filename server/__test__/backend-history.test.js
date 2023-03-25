import request from 'supertest'
import app from './app.js'

 describe("Post /history", () => {

    describe("test given json data", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/history").send({
                ID: "ID"
            })
            expect(response.statusCode).toBe(200)
        })
        test("should specify json in the contenct type header", async () => {
            const response = await request(app).post("/history").send({
                ID: "ID"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

    })

    describe(" ", () =>{

    })

 })