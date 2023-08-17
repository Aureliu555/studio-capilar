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

function existentEmail() {
    return {
        desc: "existentEmail",
        message: `O email inserido já está registrado`
    }
}

function invalidPassword() {
    return {
        desc: "invalidPassword",
        message: `A palavra-passe precisa ter no mínimo 8 caracteres`
    }
}

function notAuthorized() {
    return {
        desc: "notAuthorized",
        message: `You are not authorized to access this resource`
    }
}

const errors = {
    NON_EXISTENT_EMAIL: nonExistentEmail,
    INVALID_CREDENTIALS: invalidCredentials,
    EXISTENT_EMAIL: existentEmail,
    NOT_AUTHORIZED: notAuthorized,
    INVALID_PASSWORD: invalidPassword
}

export default errors