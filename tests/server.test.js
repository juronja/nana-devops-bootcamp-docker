import { expect, test } from "vitest"
import { app, server } from "../server.js/index.js" 
import request from "supertest"

test("test request with valid payload", async function() {
    const testPayload = {
        userName: "test name",
        userEmail: "test2@email.com",
        userInterests: "testing"
    }
    const response = await request(app) // You can put methods on a new line
        .post("/update-profile-data")
        .send(testPayload)

    expect(response.status).toBe(200)
    expect(response.body).toBe("Success")

    server.close() // Stops the app after test
})

test("test request with invalid payload", async function() {
    const testPayload = {
        userName: "test name",
        userEmail: "test2.email.com",
        userInterests: "testing"
    }
    const response = await request(app) // You can put methods on a new line
        .post("/update-profile-data")
        .send(testPayload)

    expect(response.status).toBe(400)
    expect(response.body).toBe("Object is empty or the email is not a valid format.")

    server.close() // Stops the app after test
})

