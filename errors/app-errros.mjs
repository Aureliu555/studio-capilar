function nonExistentEmail() {
    return {
        desc: "nonExistentEmail",
        message: `O email inserido ainda não está registrado`
    }
}

function invalidCredentials() {
    return {
        desc: "invalidCredentials",
        message: `Credenciais inválidas`
    }
}

function existentEmail(message) {
    return {
        desc: "existentEmail",
        message: `O email inserido já está registrado`
    }
}

function notAuthorized() {
    return {
        desc: "notAuthorized",
        error: `You are not authorized to access this resource`
    }
}

const errors = {
    NON_EXISTENT_EMAIL: nonExistentEmail,
    INVALID_CREDENTIALS: invalidCredentials,
    EXISTENT_EMAIL: existentEmail,
    NOT_AUTHORIZED: notAuthorized
}

export default errors