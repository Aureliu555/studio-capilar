function invalidGroupId(id) {
    return {
        desc: "invalidGroupId",
        error: `( ${id.toString()} ) is not a valid id`
    }
}

function invalidRange(num, min, max) {
    return {
        desc: "invalidRange",
        error: `${num.toString()} is not within the expected range ( ${min.toString()} - ${max.toString()} )`
    }
}

function invalidMovieName(movieName) {
    return {
        desc: "invalidMovieName",
        error: `${movieName.toString()} does not exist in the intended group`
    }
}

function invalidMovieId(id) {
    return {
        desc: "invalidMovieName",
        error: `Movie Id ( ${id.toString()} ) does not exist `
    }
}

function notFound() {
    return {
        desc: "notFound",
        error: `resource not found`
    }
}

function notAuthorized(token) {
    return {
        desc: "notAuthorized",
        error: `user with token  ( ${token.toString()} )  does not exist`
    }
}

function invalidGroupInfo(param) {
    return {
        desc: "invalidGroupInfo",
        error: `( ${param.toString()} )  is not a valid parameter`
    }
}

function invalidCredentials() {
    return {
        desc: "invalidCredentials",
        error: `invalid credentials`
    }
}

function existingEmail() {
    return {
        desc: "existingEmail",
        error: `Inserted email already exists`
    }
}


export const errors = {
    INVALID_GROUP_ID: invalidGroupId,
    INVALID_RANGE: invalidRange,
    INVALID_MOVIE_NAME: invalidMovieName,
    INVALID_GROUP_INFO: invalidGroupInfo,
    INVALID_MOVIE_ID: invalidMovieId,
    NOT_FOUND: notFound,
    NOT_AUTHORIZED: notAuthorized,
    INVALID_CREDENTIALS: invalidCredentials,
    EXISTING_EMAIL: existingEmail
}