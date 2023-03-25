import request from 'supertest'
import app from '../app.js'

describe("Post to /quotes/quotform", () =>{
    describe("given form data", () =>{
        //should respond with 200, success
        test("should respond with 200", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: "45",
                address: "123 Wallaby Way",
                suggPrice: "435",
                deliveryDate: "03/15/2023",
                realPrice: "100"
            })
            expect(response.statusCode).toBe(200)
        })
        test("should specify that it is json content", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: "45",
                address: "123 Wallaby Way",
                suggPrice: "435",
                deliveryDate: "03/15/2023",
                realPrice: "100"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has formId", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: "45",
                address: "123 Wallaby Way",
                suggPrice: "435",
                deliveryDate: "03/15/2023",
                realPrice: "100"
            })
            expect(response.body.formID).toBeDefined()
        })
    })
})

    describe("when quote is empty", () => {
        test("should return 400, user error", async () => {
            const response = await request(app).post("/server/quotes/quoteForm").send({
                gallonsRequested: "45",
                address: "123 Wallaby Way",
                //suggPrice is missing
                deliveryDate: "03/15/2023",
                realPrice: "100"
            })
            expect(response.statusCode).toBe(400)
    })

}) 
