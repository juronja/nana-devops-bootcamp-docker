import { expect, test } from 'vitest'
import { isInvalidEmail, isEmptyObject } from "../validator.js/index.js"

// This is a Unit test. Checks if email is valid.
test("valid email", function() {
    const testPayload = {
        userName: "test name",
        userEmail: "test.email@example.com",
        userInterests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false) // Jest test functions and methods
})

// This is a Unit test. Checks if email is not valid.
test("invalid email", function() {
    const testPayload = {
        userName: "test name",
        userEmail: "test.email",
        userInterests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})


test("empty payload", function() {
    const testPayload = {}
    const result = isEmptyObject(testPayload)
    expect(result).toBe(true)
})


test("non-empty payload", function() {
    const testPayload = {
        userName: "test name",
        userEmail: "test.email",
        userInterests: "testing"
    }
    const result = isEmptyObject(testPayload)
    expect(result).toBe(false)
})