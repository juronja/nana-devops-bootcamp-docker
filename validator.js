// check if string has @
function isInvalidEmail(payload) {
    return !payload.userEmail.includes("@")
}

function isEmptyObject(payload) {
    return Object.keys(payload).length === 0
}

export {
    isInvalidEmail,
    isEmptyObject
}